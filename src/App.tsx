import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LandingPage from "./pages/LandingPage";
import BookofHistory1 from "./pages/BookofHistory1";
import BookofHistory2 from "./pages/BookofHistory2";
import BookofHistory3 from "./pages/BookofHistory3";
import Resume from "./pages/Resume";
import FaceTransition from "./components/FaceTransition";
import StartMenu from "./pages/StartMenu";

type Language = "VN" | "EN";
type Page = "main" | "resume";

const BOOK_PROGRESS_STORAGE_KEY = "noah-book-history-progress";
const BOOK_SCROLL_STORAGE_KEY = "noah-book-history-scroll-y";
const OPEN_BOOK_FROM_MENU_KEY = "noah-open-book-from-start-menu";

const readStoredBookProgress = () => {
  const stored = Number(window.sessionStorage.getItem(BOOK_PROGRESS_STORAGE_KEY));
  return Number.isFinite(stored) ? Math.max(0, Math.min(1, stored)) : 0;
};

function MainSiteFlow({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (value: Language) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const transitionLockRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicActive, setMusicActive] = useState(false);

  useEffect(() => {
    document.body.classList.add("main-site-flow-active");
    window.scrollTo(0, 0);
    return () => document.body.classList.remove("main-site-flow-active");
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setMusicActive(false);
      return;
    }
    const timer = window.setTimeout(() => setMusicActive(true), 680);
    return () => window.clearTimeout(timer);
  }, [menuOpen]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const movePage = (direction: number) => {
      if (performance.now() < transitionLockRef.current) return;
      if (direction > 0 && !menuOpen) {
        transitionLockRef.current = performance.now() + 760;
        setMenuOpen(true);
      } else if (direction < 0 && menuOpen) {
        transitionLockRef.current = performance.now() + 760;
        setMenuOpen(false);
      }
    };

    const canScrollInsideMenu = (target: EventTarget | null, direction: number) => {
      if (!(target instanceof Element)) return false;
      const content = target.closest(".start-menu-card-content") as HTMLElement | null;
      if (!content || !menuOpen) return false;
      return direction > 0
        ? content.scrollTop + content.clientHeight < content.scrollHeight - 2
        : content.scrollTop > 2;
    };

    const onWheel = (event: WheelEvent) => {
      if (canScrollInsideMenu(event.target, event.deltaY)) return;
      event.preventDefault();
      if (Math.abs(event.deltaY) >= 8) movePage(event.deltaY);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const distance = touchStartYRef.current - (event.changedTouches[0]?.clientY ?? touchStartYRef.current);
      touchStartYRef.current = null;
      if (Math.abs(distance) < 45 || canScrollInsideMenu(event.target, distance)) return;
      event.preventDefault();
      movePage(distance);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest("button, input, textarea, select")) return;
      const direction = ["ArrowDown", "PageDown", " "].includes(event.key)
        ? 1
        : ["ArrowUp", "PageUp"].includes(event.key) ? -1 : 0;
      if (direction) {
        event.preventDefault();
        movePage(direction);
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const openHistory = () => {
    window.sessionStorage.setItem(BOOK_PROGRESS_STORAGE_KEY, "0");
    window.sessionStorage.setItem(BOOK_SCROLL_STORAGE_KEY, "0");
    window.sessionStorage.setItem(OPEN_BOOK_FROM_MENU_KEY, "1");
    window.location.assign("/noah_s/portfolio");
  };

  return (
    <div ref={stageRef} className={`main-site-flow ${menuOpen ? "is-start-menu" : ""}`}>
      <LandingPage language={language} setLanguage={setLanguage} />
      <StartMenu
        language={language}
        setLanguage={setLanguage}
        active={musicActive}
        onOpenHistory={openHistory}
      />
    </div>
  );
}

export default function App() {
  const isPortfolioRoute = /\/portfolio\/?$/.test(window.location.pathname);
  const [language, setLanguage] = useState<Language>("EN");
  const [page, setPage] = useState<Page>("main");
  const [bookHistory3Ready, setBookHistory3Ready] = useState(
    () => readStoredBookProgress() >= 0.999,
  );
  const previousScrollY = useRef(0);

  useLayoutEffect(() => {
    if (!isPortfolioRoute || window.sessionStorage.getItem(OPEN_BOOK_FROM_MENU_KEY) !== "1") return;
    window.sessionStorage.removeItem(OPEN_BOOK_FROM_MENU_KEY);
    const book = document.querySelector(".book-of-history-page");
    if (book) window.scrollTo(0, book.getBoundingClientRect().top + window.scrollY);
  }, [isPortfolioRoute]);

  useEffect(() => {
    const handleBookHistoryProgress = (event: Event) => {
      const customEvent = event as CustomEvent<{ progress: number }>;
      const progress = customEvent.detail?.progress ?? 0;

      setBookHistory3Ready(progress >= 0.999);
    };

    window.addEventListener(
      "book-history-2-progress",
      handleBookHistoryProgress,
    );

    return () => {
      window.removeEventListener(
        "book-history-2-progress",
        handleBookHistoryProgress,
      );
    };
  }, []);

  useEffect(() => {
    if (!isPortfolioRoute) return;

    const restoreScrollY = Number(
      window.sessionStorage.getItem(BOOK_SCROLL_STORAGE_KEY),
    );

    if (readStoredBookProgress() > 0 && Number.isFinite(restoreScrollY)) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => window.scrollTo(0, restoreScrollY));
      });
    }

    const rememberPosition = () => {
      window.sessionStorage.setItem(
        BOOK_SCROLL_STORAGE_KEY,
        String(window.scrollY),
      );
    };

    window.addEventListener("pagehide", rememberPosition);
    window.addEventListener("beforeunload", rememberPosition);

    return () => {
      window.removeEventListener("pagehide", rememberPosition);
      window.removeEventListener("beforeunload", rememberPosition);
    };
  }, []);

  const openResume = () => {
    previousScrollY.current = window.scrollY;
    document.body.classList.remove("page3-transition-active");
    setPage("resume");
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  const openBookOfHistory = () => {
    setPage("main");
    window.requestAnimationFrame(() => {
      window.scrollTo(0, previousScrollY.current);
    });
  };

  if (page === "resume") {
    return (
      <Resume
        language={language}
        setLanguage={setLanguage}
        onOpenBookOfHistory={openBookOfHistory}
      />
    );
  }

  if (!isPortfolioRoute) {
    return (
      <MainSiteFlow language={language} setLanguage={setLanguage} />
    );
  }

  return (
    <>
      <LandingPage language={language} setLanguage={setLanguage} />
      <BookofHistory1
        language={language}
        setLanguage={setLanguage}
        onOpenResume={openResume}
      />
      <BookofHistory2 language={language} setLanguage={setLanguage} />
      {bookHistory3Ready && (
        <BookofHistory3
          language={language}
          setLanguage={setLanguage}
          onOpenResume={openResume}
        />
      )}
      <FaceTransition />
    </>
  );
}
