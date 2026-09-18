import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LandingPage from "./pages/LandingPage";
import BookofHistory1 from "./pages/BookofHistory1";
import BookofHistory2 from "./pages/BookofHistory2";
import BookofHistory3 from "./pages/BookofHistory3";
import Resume from "./pages/Resume";
import FaceTransition from "./components/FaceTransition";
import StartMenu from "./pages/StartMenu";
import DateWithMe from "./pages/DateWithMe";

type Language = "VN" | "EN";
type Page = "main" | "resume";

const BOOK_PROGRESS_STORAGE_KEY = "noah-book-history-progress";
const BOOK_SCROLL_STORAGE_KEY = "noah-book-history-scroll-y";
const OPEN_BOOK_FROM_MENU_KEY = "noah-open-book-from-start-menu";
const RESTORE_PORTFOLIO_ROUTE_KEY = "noah-restore-portfolio-route";
const RESTORE_DATE_ROUTE_KEY = "noah-restore-date-route";
const DATE_PATH = "/noah_s/datewithnoah";

// GitHub Pages serves public/404.html for a direct visit to /portfolio.
// That page redirects to the site root and leaves this one-time marker.
if (
  window.location.pathname === "/noah_s/" &&
  window.sessionStorage.getItem(RESTORE_PORTFOLIO_ROUTE_KEY) === "1"
) {
  window.sessionStorage.removeItem(RESTORE_PORTFOLIO_ROUTE_KEY);
  window.history.replaceState(window.history.state, "", "/noah_s/portfolio");
}
if (window.location.pathname === "/noah_s/") {
  const dateRoute = window.sessionStorage.getItem(RESTORE_DATE_ROUTE_KEY);
  if (dateRoute === "coffee" || dateRoute === "moonwatch") {
    window.sessionStorage.removeItem(RESTORE_DATE_ROUTE_KEY);
    window.history.replaceState(window.history.state, "", DATE_PATH + (dateRoute === "moonwatch" ? "?date=moonwatch" : ""));
  }
}

const readStoredBookProgress = () => {
  const stored = Number(window.sessionStorage.getItem(BOOK_PROGRESS_STORAGE_KEY));
  return Number.isFinite(stored) ? Math.max(0, Math.min(1, stored)) : 0;
};

function MainSiteFlow({
  language,
  setLanguage,
  onOpenHistory,
  onOpenDate,
}: {
  language: Language;
  setLanguage: (value: Language) => void;
  onOpenHistory: () => void;
  onOpenDate: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const transitionLockRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(() => window.history.state?.mainPage === "start-menu");
  const [musicActive, setMusicActive] = useState(() => window.history.state?.mainPage === "start-menu");

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

  return (
    <div ref={stageRef} className={`main-site-flow ${menuOpen ? "is-start-menu" : ""}`}>
      <LandingPage language={language} setLanguage={setLanguage} />
      <StartMenu
        language={language}
        setLanguage={setLanguage}
        active={musicActive}
        onOpenHistory={onOpenHistory}
        onOpenDate={onOpenDate}
      />
    </div>
  );
}

export default function App() {
  const [isPortfolioRoute, setIsPortfolioRoute] = useState(
    () => /\/portfolio\/?$/.test(window.location.pathname),
  );
  const [isDateRoute, setIsDateRoute] = useState(() => /\/datewithnoah\/?$/.test(window.location.pathname));
  const [dateKind, setDateKind] = useState<"coffee" | "moonwatch">(() => new URLSearchParams(window.location.search).get("date") === "moonwatch" ? "moonwatch" : "coffee");
  const [language, setLanguage] = useState<Language>("EN");
  const [page, setPage] = useState<Page>("main");
  const [bookHistory3Ready, setBookHistory3Ready] = useState(
    () => readStoredBookProgress() >= 0.999,
  );
  const previousScrollY = useRef(0);

  useEffect(() => {
    const syncRoute = () => {
      setPage("main");
      setIsPortfolioRoute(/\/portfolio\/?$/.test(window.location.pathname));
      setIsDateRoute(/\/datewithnoah\/?$/.test(window.location.pathname));
      setDateKind(new URLSearchParams(window.location.search).get("date") === "moonwatch" ? "moonwatch" : "coffee");
    };
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

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

  const enterBookFromMenu = () => {
    window.sessionStorage.setItem(BOOK_PROGRESS_STORAGE_KEY, "0");
    window.sessionStorage.setItem(BOOK_SCROLL_STORAGE_KEY, "0");
    window.sessionStorage.setItem(OPEN_BOOK_FROM_MENU_KEY, "1");
    if (!isDateRoute && !isPortfolioRoute) {
      window.history.replaceState({ ...window.history.state, mainPage: "start-menu" }, "", window.location.href);
    }
    window.history.pushState({ page: "portfolio" }, "", "/noah_s/portfolio");
    document.body.classList.remove("main-site-flow-active");
    setBookHistory3Ready(false);
    setIsPortfolioRoute(true);
    setIsDateRoute(false);
  };

  const enterDate = () => {
    if (!isPortfolioRoute && !isDateRoute) {
      window.history.replaceState({ ...window.history.state, mainPage: "start-menu" }, "", window.location.href);
    }
    window.history.pushState({ page: "date" }, "", DATE_PATH);
    document.body.classList.remove("main-site-flow-active");
    setPage("main");
    setDateKind("coffee");
    setIsPortfolioRoute(false);
    setIsDateRoute(true);
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  const switchDate = (kind: "coffee" | "moonwatch") => {
    window.history.pushState({ page: "date", kind }, "", DATE_PATH + (kind === "moonwatch" ? "?date=moonwatch" : ""));
    setDateKind(kind);
    window.scrollTo(0, 0);
  };

  const backToMenu = () => {
    window.history.pushState({ mainPage: "start-menu" }, "", "/noah_s/");
    setIsPortfolioRoute(false);
    setIsDateRoute(false);
    setPage("main");
  };

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
  }, [isPortfolioRoute]);

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

  if (isDateRoute) {
    return <DateWithMe kind={dateKind} onChangeKind={switchDate} onBackToMenu={backToMenu} onOpenHistory={enterBookFromMenu} language={language} setLanguage={setLanguage} />;
  }

  if (!isPortfolioRoute) {
    return (
      <MainSiteFlow language={language} setLanguage={setLanguage} onOpenHistory={enterBookFromMenu} onOpenDate={enterDate} />
    );
  }

  return (
    <>
      <LandingPage language={language} setLanguage={setLanguage} />
      <BookofHistory1
        language={language}
        setLanguage={setLanguage}
        onOpenResume={openResume}
        onOpenDate={enterDate}
      />
      <BookofHistory2 language={language} setLanguage={setLanguage} />
      {bookHistory3Ready && (
        <BookofHistory3
          language={language}
          setLanguage={setLanguage}
          onOpenResume={openResume}
          onOpenDate={enterDate}
        />
      )}
      <FaceTransition />
    </>
  );
}
