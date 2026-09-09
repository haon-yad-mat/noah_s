import { useState } from "react";

export default function App() {
  const [language, setLanguage] = useState<"VN" | "EN">("EN");

  return (
    <div className="landing-page">
      {/* decorative blurred blobs */}
      <div
        className="blob blob-highlight"
        aria-hidden="true"
      />

      <div
        className="blob blob-supporting"
        aria-hidden="true"
      />

      <div
        className="blob blob-mint"
        aria-hidden="true"
      />

      <div
        className="blob blob-element"
        aria-hidden="true"
      />

      <main className="hero">
        <div className="hero-copy">
          <div className="greeting">
            <p>hi, please call me</p>
          </div>

          <div className="title-lockup">
            <h1>NOAAAAHHHHH</h1>

            <p>
              yea I&rsquo;m probably in a mess when you&rsquo;re reading this
            </p>
          </div>
        </div>

        <div className="face-container">
          <img
            src="/images/mặt.svg"
            alt="mặt"
          />

          <span
            className="eye-scroll-indicator eye-scroll-indicator-left"
          >
            scroll
          </span>

          <span
            className="eye-scroll-indicator eye-scroll-indicator-right"
          >
            down
          </span>
        </div>
      </main>

      <button
  className="help-control"
  type="button"
  aria-label="Help"
>
  <svg
    viewBox="0 0 21 21"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="10.5"
      cy="10.5"
      r="8.335"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M7.90836 7.8334C8.10428 7.27646 8.49098 6.80682 8.99998 6.50768C9.50899 6.20853 10.1074 6.09918 10.6893 6.19899C11.2712 6.29881 11.799 6.60134 12.1793 7.05301C12.5595 7.50468 12.7676 8.07634 12.7667 8.66673C12.7667 10.3334 10.2667 11.1667 10.2667 11.1667M10.3333 14.5H10.3417"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>

      <div
        className="language-switch"
        aria-label="Language selector"
      >
        <div className="language-toggle">
          <button
            type="button"
            className={`language-option ${
              language === "VN"
                ? "language-option-active"
                : ""
            }`}
            aria-label="Switch to Vietnamese"
            aria-pressed={language === "VN"}
            onClick={() => setLanguage("VN")}
          >
            VN
          </button>

          <button
            type="button"
            className={`language-option ${
              language === "EN"
                ? "language-option-active"
                : ""
            }`}
            aria-label="Switch to English"
            aria-pressed={language === "EN"}
            onClick={() => setLanguage("EN")}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}