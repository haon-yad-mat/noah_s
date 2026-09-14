import { useEffect, useRef, useState } from "react";
import LandingPage from "./pages/LandingPage";
import BookofHistory1 from "./pages/BookofHistory1";
import BookofHistory2 from "./pages/BookofHistory2";
import BookofHistory3 from "./pages/BookofHistory3";
import Resume from "./pages/Resume";
import FaceTransition from "./components/FaceTransition";

type Language = "VN" | "EN";
type Page = "main" | "resume";

const BOOK_PROGRESS_STORAGE_KEY = "noah-book-history-progress";
const BOOK_SCROLL_STORAGE_KEY = "noah-book-history-scroll-y";

const readStoredBookProgress = () => {
  const stored = Number(window.sessionStorage.getItem(BOOK_PROGRESS_STORAGE_KEY));
  return Number.isFinite(stored) ? Math.max(0, Math.min(1, stored)) : 0;
};

export default function App() {
  const [language, setLanguage] = useState<Language>("EN");
  const [page, setPage] = useState<Page>("main");
  const [bookHistory3Ready, setBookHistory3Ready] = useState(
    () => readStoredBookProgress() >= 0.999,
  );
  const previousScrollY = useRef(0);

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
