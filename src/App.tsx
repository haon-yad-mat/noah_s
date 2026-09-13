import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import BookofHistory1 from "./pages/BookofHistory1";
import BookofHistory2 from "./pages/BookofHistory2";
import FaceTransition from "./components/FaceTransition";

type Language = "VN" | "EN";

export default function App() {
  const [language, setLanguage] = useState<Language>("EN");

  return (
    <>
      <LandingPage language={language} setLanguage={setLanguage} />
      <BookofHistory1 language={language} setLanguage={setLanguage} />
      <BookofHistory2 language={language} setLanguage={setLanguage} />
      <FaceTransition />
    </>
  );
}