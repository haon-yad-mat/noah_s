import { useRef, useState } from "react";
import LandingPage from "./pages/LandingPage";
import BookofHistory1 from "./pages/BookofHistory1";
import BookofHistory2 from "./pages/BookofHistory2";
import Resume from "./pages/Resume";
import FaceTransition from "./components/FaceTransition";

type Language = "VN" | "EN";
type Page = "main" | "resume";

export default function App() {
  const [language, setLanguage] = useState<Language>("EN");
  const [page, setPage] = useState<Page>("main");
  const previousScrollY = useRef(0);

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
      <FaceTransition />
    </>
  );
}
