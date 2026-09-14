import { useEffect, useMemo, useState } from "react";
import { SocialIcons, exploreItems, quickStopItems } from "./BookofHistory1";

type Language = "VN" | "EN";
type Category = "All" | "Academic" | "Career" | "Activities" | "Other";

type BookofHistory3Props = {
  language: Language;
  setLanguage: (value: Language) => void;
  onOpenResume: () => void;
};

const filters: Category[] = ["All", "Academic", "Career", "Activities", "Other"];

const filterIconMap: Record<Category, string> = {
  All: "/noah_s_portfolio/images/BOH-all-icon.svg",
  Academic: "/noah_s_portfolio/images/BOH-academic-icon.svg",
  Career: "/noah_s_portfolio/images/BOH-career-icon.svg",
  Activities: "/noah_s_portfolio/images/BOH-activities-icon.svg",
  Other: "/noah_s_portfolio/images/BOH-other-icon.svg",
};

const storyIconMap: Record<Category, string> = {
  All: "/noah_s_portfolio/images/BOH-all-icon.svg",
  Academic: "/noah_s_portfolio/images/BOH-academic-icon.svg",
  Career: "/noah_s_portfolio/images/BOH-career-icon.svg",
  Activities: "/noah_s_portfolio/images/BOH-activities-icon.svg",
  Other: "/noah_s_portfolio/images/BOH-other-icon.svg",
};

const stories = [
  { cardNumber: 1, category: "Career" as Category, color: "mint", organization: "@YITEC", title: "Connecting Users, AI and Business into real Products", highlight: "5 Projects • Most Dedicated Contributor", hashtags: "#AI-Startup #Cross-functional #Product-owner #International", jobTitles: ["Business Analyst", "Executive Assistant"] },
  { cardNumber: 2, category: "Career" as Category, color: "lavender", organization: "@YITEC", title: "Connecting Users, AI and Business into real Products", highlight: "5 Projects • Most Dedicated Contributor", hashtags: "#AI-Startup #Cross-functional #Product-owner #International", jobTitles: ["Business Analyst", "Executive Assistant"] },
  { cardNumber: 3, category: "Career" as Category, color: "pink", organization: "@YITEC", title: "Connecting Users, AI and Business into real Products", highlight: "5 Projects • Most Dedicated Contributor", hashtags: "#AI-Startup #Cross-functional #Product-owner #International", jobTitles: ["Business Analyst", "Executive Assistant"] },
  { cardNumber: 4, category: "Career" as Category, color: "orange", organization: "@YITEC", title: "Connecting Users, AI and Business into real Products", highlight: "5 Projects • Most Dedicated Contributor", hashtags: "#AI-Startup #Cross-functional #Product-owner #International", jobTitles: ["Business Analyst", "Executive Assistant"] },
  { cardNumber: 5, category: "Academic" as Category, color: "blue", organization: "@YITEC", title: "Connecting Users, AI and Business into real Products", highlight: "5 Projects • Most Dedicated Contributor", hashtags: "#AI-Startup #Cross-functional #Product-owner #International", jobTitles: ["Business Analyst", "Executive Assistant"] },
  { cardNumber: 6, category: "Activities" as Category, color: "lime", organization: "@YITEC", title: "Connecting Users, AI and Business into real Products", highlight: "5 Projects • Most Dedicated Contributor", hashtags: "#AI-Startup #Cross-functional #Product-owner #International", jobTitles: ["Business Analyst", "Executive Assistant"] },
  { cardNumber: 7, category: "Other" as Category, color: "orange", organization: "@YITEC", title: "Connecting Users, AI and Business into real Products", highlight: "5 Projects • Most Dedicated Contributor", hashtags: "#AI-Startup #Cross-functional #Product-owner #International", jobTitles: ["Business Analyst", "Executive Assistant"] },
  { cardNumber: 8, category: "Career" as Category, color: "mint", organization: "@YITEC", title: "Connecting Users, AI and Business into real Products", highlight: "5 Projects • Most Dedicated Contributor", hashtags: "#AI-Startup #Cross-functional #Product-owner #International", jobTitles: ["Business Analyst", "Executive Assistant"] },
];

const achievements = [
  ["🌐", "Worked on International AI Projects"],
  ["🏆", "Champion - Marketing Hive 2024"],
  ["🥈", "Top 20 - S-MAZE IMC 2024"],
  ["🏅", "“Best Long-term Strategy” - BLM12"],
  ["🏅", "Runner-up - The Venture Challenge"],
  ["👥", "Managed a team of 70 members"],
  ["🏢", "Built 2 Organizations"],
  ["📱", "Built 10 Social Media Accounts"],
];

const expertiseAreas = [
  "Marketing",
  "Branding",
  "Content Creation",
  "Creative",
  "Social Media Strategy",
  "Product Development",
  "Business Analyst",
  "Project Management",
  "Executive Assistance / Operations",
  "UI/UX Design",
  "Quality Assurance (QA / Testing)",
  "Client & Stakeholder Management",
];

const toolkit = [
  "Canva",
  "ChatGPT",
  "Excel",
  "Figma",
  "Gemini",
  "Github",
  "Gmail",
  "Google-Antigravity",
  "Google-Calendar",
  "Google-Docs",
  "Google-Drive",
  "Google-Form",
  "Google-Meet",
  "Google-Sheets",
  "jira",
  "Mailchimp",
  "Mattermost",
  "Notion",
  "SPSS",
  "VOOV",
  "VSCode",
  "Word",
];

export default function BookofHistory3({ language, setLanguage, onOpenResume }: BookofHistory3Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  useEffect(() => {
    if (!comingSoonOpen) return;
    const timer = window.setTimeout(() => setComingSoonOpen(false), 1000);
    return () => window.clearTimeout(timer);
  }, [comingSoonOpen]);

  const visibleStories = useMemo(
    () => activeFilter === "All" ? stories : stories.filter((story) => story.category === activeFilter),
    [activeFilter],
  );
  const bookIcon = exploreItems.find((item) => item.label === "Book of history")?.icon;

  const handleNavigation = (label: string) => {
    if (label === "Resume/ Porfolio") {
      setMenuOpen(false);
      onOpenResume();
      return;
    }

    if (label === "Book of history") {
      setMenuOpen(false);
      return;
    }

    setComingSoonOpen(true);
  };

  return (
    <section className={`book-history-3 ${menuOpen ? "sidebar-open" : ""}`}>
      <div className="history-3-blob history-3-blob-mint" />
      <div className="history-3-blob history-3-blob-yellow" />
      <div className="history-3-blob history-3-blob-pink" />

      <div className="book-history-3-shell">
        <header className="history-3-header">
          {!menuOpen && (
            <button className="book-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span className="history-3-header-icon" aria-hidden="true">{bookIcon}</span>
              <span>Book of history</span>
              <span className="book-menu-arrow" aria-hidden="true">»</span>
            </button>
          )}

          <div className="book-language" aria-label="Language selector">
            <button type="button" className={language === "VN" ? "active" : ""} aria-pressed={language === "VN"} onClick={() => setLanguage("VN")}>VN</button>
            <button type="button" className={language === "EN" ? "active" : ""} aria-pressed={language === "EN"} onClick={() => setLanguage("EN")}>EN</button>
          </div>
        </header>

        <main className="history-3-main">
          <nav className="history-3-filters" aria-label="Story categories">
            {filters.map((filter) => (
              <button key={filter} type="button" className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>
                <span className="history-3-filter-icon" aria-hidden="true">
                  <img src={filterIconMap[filter]} alt="" width={24} height={24} />
                </span>
                {filter}
              </button>
            ))}
          </nav>

          <div className="history-3-layout">
            <div className="history-3-card-grid">
              {visibleStories.map((story) => (
                <article className={`history-3-card ${story.color}`} key={story.cardNumber} data-card-number={story.cardNumber}>
                  <div className="history-3-card-meta"><span><b aria-hidden="true"><img src={storyIconMap[story.category]} alt="" width={24} height={24} /></b>{story.category}</span><span>{story.organization}</span></div>
                  <div className="history-3-card-copy">
                    <h2>{story.title}</h2>
                    <p className="history-3-card-subtitle">{story.highlight}</p>
                    <p className="history-3-card-tags">{story.hashtags}</p>
                  </div>
                  <div className="history-3-card-roles">{story.jobTitles.map((jobTitle) => <span key={jobTitle}>{jobTitle}</span>)}</div>
                </article>
              ))}
            </div>

            <aside className="history-3-summary">
              <div className="history-3-stat"><strong>3+</strong><span>years of experience</span></div>
              <button className="history-3-stat history-3-expertise-button" type="button" onClick={() => setExpertiseOpen((open) => !open)} aria-expanded={expertiseOpen}>
                <strong>12</strong>
                <span>areas of expertise</span>
                <img src="/noah_s_portfolio/images/down-arrow.svg" alt="" aria-hidden="true" className="history-3-chevron" />
              </button>
              {expertiseOpen && (
                <div className="history-3-expertise-list">
                  {expertiseAreas.map((area, index) => (
                    <span key={area}>({index + 1}) {area}</span>
                  ))}
                </div>
              )}

              <button className="history-3-summary-link" type="button" onClick={onOpenResume}>
                <span>CLICK TO SEE MY RESUME</span>
                <img src="/noah_s_portfolio/images/arrow-up-right.svg" alt="" aria-hidden="true" className="history-3-arrow" />
              </button>

              <section className="history-3-summary-section">
                <h3>
                  <span>ACHIEVEMENTS</span>
                  <img src="/noah_s_portfolio/images/arrow-up-right.svg" alt="" aria-hidden="true" className="history-3-arrow" />
                </h3>
                <ul>{achievements.map(([icon, text]) => <li key={text}><span aria-hidden="true">{icon}</span><span>{text}</span></li>)}</ul>
              </section>

              <section className="history-3-summary-section">
                <h3>
                  <span>TOOLKIT</span>
                  <img src="/noah_s_portfolio/images/arrow-up-right.svg" alt="" aria-hidden="true" className="history-3-arrow" />
                </h3>
                <div className="history-3-toolkit">
                  {toolkit.map((tool) => (
                    <img
                      key={tool}
                      className="history-3-tool-logo"
                      src={`/noah_s_portfolio/images/${tool}.svg`}
                      alt={tool}
                      title={tool}
                    />
                  ))}
                </div>
              </section>

              <section className="history-3-summary-section history-3-testimonials">
                <h3>
                  <span>WHAT PEOPLE SAY</span>
                  <img src="/noah_s_portfolio/images/arrow-up-right.svg" alt="" aria-hidden="true" className="history-3-arrow" />
                </h3>
                <blockquote>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel odio urna. Sed iaculis, ex in vulputate gravida, urna urna lobortis leo.”<cite>Somebody’s Name</cite></blockquote>
                <blockquote>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel odio urna. Sed iaculis, ex in vulputate gravida, urna urna lobortis leo.”<cite>Somebody’s Name</cite></blockquote>
              </section>

              <section className="history-3-summary-section">
                <h3>CONTACT ME</h3>
                <SocialIcons />
              </section>
            </aside>
          </div>
        </main>
      </div>

      {menuOpen && (
        <div className="book-sidebar-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <aside className="book-sidebar">
            <div className="book-sidebar-section">
              <div className="book-sidebar-section-title"><span>EXPLORE</span><button type="button" className="book-sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 7L13 12L18 17M11 7L6 12L11 17" stroke="#44418D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div>
              {exploreItems.map((item) => <button key={item.label} className={`book-sidebar-nav-row ${item.label === "Book of history" ? "active" : ""}`} type="button" onClick={() => handleNavigation(item.label)}><span className="book-sidebar-nav-icon">{item.icon}</span><span className="book-sidebar-nav-label">{item.label}</span></button>)}
            </div>
            <div className="book-sidebar-section">
              <div className="book-sidebar-section-title">QUICK STOPS</div>
              {quickStopItems.map((item) => <button key={item.label} className="book-sidebar-nav-row" type="button" onClick={() => handleNavigation(item.label)}><span className="book-sidebar-nav-icon">{item.icon}</span><span className="book-sidebar-nav-label">{item.label}</span></button>)}
            </div>
            <SocialIcons />
          </aside>
        </div>
      )}

      {comingSoonOpen && <div className="coming-soon-overlay" onClick={() => setComingSoonOpen(false)}><div className="coming-soon-popup" onClick={(event) => event.stopPropagation()}>Coming soon</div></div>}
    </section>
  );
}
