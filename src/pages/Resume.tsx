import { useEffect, useState } from "react";
import { SocialIcons, exploreItems, quickStopItems } from "./BookofHistory1";

type Language = "VN" | "EN";

type ResumeProps = {
  language: Language;
  setLanguage: (value: Language) => void;
  onOpenBookOfHistory: () => void;
};

const jobs = [
  ["Project Coordinator/ Business Analyst", "@YITEC", "2025–2026"],
  ["Executive Assistant/ Marketing Executive", "@MOSY AI", "2025–2026"],
  ["Account Intern/ Creative Intern", "@5CORES PRODUCTION HOUSE", "2024–2025"],
  ["Creative Collaborator Team Leader", "@VIETSTARMAX PRODUCTION HOUSE", "2024"],
  ["Marketing Executive", "@DIEM HANG IELTS", "2023–2024"],
  ["Social Media Marketing Leader", "@199S STUDIO", "2023"],
  ["Marketing Intern", "@THE CATALYST FOR ENGLISH", "2023"],
];

const achievements = [
  ["“Best Long-term Strategy”", "The Valient Marketer 12", "by MaC | FTU", "2025"],
  ["TOP 20", "S-MAZE IMC Marketing Competition 2024", "by IMC Club | FTU2", "2024"],
  ["CHAMPION", "Marketing Hive 2024", "by DAV Marketers | DAV", "2024"],
  ["RUNNER-UP", "The Venture Challenge", "by MGC | NEU", "2022"],
  ["8.0", "IELTS", "9.0 Listening · 8.5 Reading · 6.5 Writing · 7.5 Speaking", "2021"],
];

const extracurriculars = [
  ["Member - Event Department", "@Marketing’s Generation Club | NEU", "2022–2024"],
  ["Member - R&D Department", "@NEURON Communication Club | NEU", "2022–2023"],
  ["Co-founder & Head of PR Department", "@The Engwiz Project", "2022"],
  ["Co-founder and Head of Execution Department", "@Meraki Visual Art Club | Luong Van Tuy Gifted Highschool", "2022"],
];

export default function Resume({
  language,
  setLanguage,
  onOpenBookOfHistory,
}: ResumeProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const resumeIcon = quickStopItems.find(
    (item) => item.label === "Resume/ Porfolio",
  )?.icon;

  useEffect(() => {
    if (!comingSoonOpen) return;
    const timer = window.setTimeout(() => setComingSoonOpen(false), 1000);
    return () => window.clearTimeout(timer);
  }, [comingSoonOpen]);

  const handleNavigation = (label: string) => {
    if (label === "Resume/ Porfolio") {
      setMenuOpen(false);
      return;
    }

    if (label === "Book of history") {
      setMenuOpen(false);
      onOpenBookOfHistory();
      return;
    }

    setComingSoonOpen(true);
  };

  return (
    <section className={`resume-page ${menuOpen ? "sidebar-open" : ""}`}>
      <div className="resume-blob resume-blob-mint" />
      <div className="resume-blob resume-blob-yellow" />
      <div className="resume-blob resume-blob-pink" />

      <div className="resume-shell">
        <header className="resume-header">
          {!menuOpen && (
            <button
              className="book-menu-button"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="resume-header-icon" aria-hidden="true">{resumeIcon}</span>
              <span>Resume/ Porfolio</span>
              <span className="book-menu-arrow" aria-hidden="true">»</span>
            </button>
          )}

          {!menuOpen && (
            <div className="book-language" aria-label="Language selector">
              <button type="button" className={language === "VN" ? "active" : ""} aria-pressed={language === "VN"} onClick={() => setLanguage("VN")}>VN</button>
              <button type="button" className={language === "EN" ? "active" : ""} aria-pressed={language === "EN"} onClick={() => setLanguage("EN")}>EN</button>
            </div>
          )}
        </header>

        <main className="resume-main">
          <h1 className="resume-title">Career Brief</h1>

          <section className="resume-glass resume-intro">
            <p>
              My career began in content creation and online marketing, where I built campaigns and social media channels from the ground up. Driven by curiosity, I gradually expanded into client-facing work, project coordination, executive support, business analysis, and product development. Each role revealed another layer of how businesses operate beyond marketing alone. <span>Marketing became my entry point, but understanding products, strategy, and how businesses create value is what continues to drive me.</span>
            </p>
          </section>

          <div className="resume-primary-grid">
            <section className="resume-section">
              <h2>JOBS BRIEF</h2>
              <div className="resume-glass resume-list-card">
                {jobs.map(([title, company, year]) => (
                  <article className="resume-list-item" key={`${title}-${company}`}>
                    <div className="resume-item-copy"><h3>{title}</h3><p>{company}</p></div>
                    <span className="resume-year">{year}</span>
                  </article>
                ))}
              </div>
            </section>

            <aside className="resume-side-column">
              <section className="resume-section">
                <h2>EDUCATION</h2>
                <div className="resume-glass resume-small-card">
                  <div className="resume-education-title">
                    <img src="/noah_s_portfolio/images/bachelorIcon.svg" alt="Bachelor" aria-hidden="true" className="resume-education-icon" />
                    <h3>Bachelor @NEU</h3>
                  </div>
                  <p className="resume-accent">Marketing Management</p>
                  <p><em>Graduate with Distinction</em></p>
                </div>
              </section>

              <section className="resume-section">
                <h2>LANGUAGES</h2>
                <div className="resume-glass resume-language-card" aria-label="Vietnamese, English and Chinese">
                  <img src="/noah_s_portfolio/images/VNflag.svg" alt="Vietnamese" aria-label="Vietnamese" />
                  <img src="/noah_s_portfolio/images/USflag.svg" alt="English" aria-label="English" />
                  <img src="/noah_s_portfolio/images/CNflag.svg" alt="Chinese" aria-label="Chinese" />
                </div>
              </section>

              <section className="resume-section">
                <h2>SKILLSET</h2>
                <div className="resume-glass resume-small-card resume-skills-card">
                  <ul>
                    <li>Project Coordination</li><li>Product Development</li><li>Process Improvement</li>
                    <li>Business Analysis</li><li>Marketing &amp; Branding</li><li>Growth Thinking</li>
                    <li>UI/UX Design</li><li>CRM</li><li>Social Media Strategy</li>
                  </ul>
                </div>
              </section>
            </aside>
          </div>

          <section className="resume-section resume-wide-section">
            <h2>ACHIEVEMENTS</h2>
            <div className="resume-glass resume-list-card">
              {achievements.map(([label, title, detail, year]) => (
                <article className="resume-list-item" key={`${label}-${title}`}>
                  <div className="resume-item-copy"><h3 className={label === "CHAMPION" ? "resume-accent" : ""}>{label}</h3><h3>{title}</h3><p>{detail}</p></div>
                  <span className="resume-year">{year}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-section resume-wide-section">
            <h2>EXTRACURRICULARS</h2>
            <div className="resume-glass resume-list-card resume-extra-card">
              {extracurriculars.map(([title, detail, year]) => (
                <article className="resume-list-item" key={`${title}-${detail}`}>
                  <div className="resume-item-copy"><h3 className={title.startsWith("Co-founder") ? "resume-accent" : ""}>{title}</h3><p>{detail}</p></div>
                  <span className="resume-year">{year}</span>
                </article>
              ))}
            </div>
          </section>

          <div className="resume-actions">
            <a
              href="#portfolio"
              onClick={(event) => {
                event.preventDefault();
                onOpenBookOfHistory();
              }}
            >
              <img src="/noah_s_portfolio/images/arrow-up-right.svg" alt="" aria-hidden="true" />
              <span>{language === "VN" ? "Xem Portfolio" : "Check My Portfolio"}</span>
            </a>
            <a href="mailto:luutmtam@gmail.com">
              <img src="/noah_s_portfolio/images/arrow-up-right.svg" alt="" aria-hidden="true" />
              <span>{language === "VN" ? "Liên hệ để nhận CV chi tiết" : "Contact for more detailed CV"}</span>
            </a>
          </div>
        </main>
      </div>

      {menuOpen && (
        <div className="book-sidebar-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <aside className="book-sidebar">
            <div className="book-sidebar-section">
              <div className="book-sidebar-section-title">
                <span>EXPLORE</span>
                <button type="button" className="book-sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 7L13 12L18 17M11 7L6 12L11 17" stroke="#44418D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              {exploreItems.map((item) => (
                <button key={item.label} className="book-sidebar-nav-row" type="button" onClick={() => handleNavigation(item.label)}><span className="book-sidebar-nav-icon" aria-hidden="true">{item.icon}</span><span className="book-sidebar-nav-label">{item.label}</span></button>
              ))}
            </div>
            <div className="book-sidebar-section">
              <div className="book-sidebar-section-title">QUICK STOPS</div>
              {quickStopItems.map((item) => (
                <button key={item.label} className={`book-sidebar-nav-row ${item.label === "Resume/ Porfolio" ? "active" : ""}`} type="button" onClick={() => handleNavigation(item.label)}><span className="book-sidebar-nav-icon" aria-hidden="true">{item.icon}</span><span className="book-sidebar-nav-label">{item.label}</span></button>
              ))}
            </div>

            <div className="book-language resume-sidebar-language" aria-label="Language selector">
              <button type="button" className={language === "VN" ? "active" : ""} aria-pressed={language === "VN"} onClick={() => setLanguage("VN")}>VN</button>
              <button type="button" className={language === "EN" ? "active" : ""} aria-pressed={language === "EN"} onClick={() => setLanguage("EN")}>EN</button>
            </div>
          </aside>
        </div>
      )}

      {comingSoonOpen && <div className="coming-soon-overlay" onClick={() => setComingSoonOpen(false)}><div className="coming-soon-popup" onClick={(event) => event.stopPropagation()}>Coming soon</div></div>}
    </section>
  );
}
