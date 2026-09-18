import { useEffect, useRef, useState, type FormEvent } from "react";
import { exploreItems, quickStopItems, SocialIcons, SidebarInfo } from "./BookofHistory1";

type DateKind = "coffee" | "moonwatch";
type Props = {
  kind: DateKind;
  onChangeKind: (kind: DateKind) => void;
  onBackToMenu: () => void;
  onOpenHistory: () => void;
  language: "VN" | "EN";
  setLanguage: (language: "VN" | "EN") => void;
};

const root = "/noah_s/images/date/";
const illustration = (name: string) => `${root}${name}.svg`;
const musicRoot = "/noah_s/audio/";
const moonPhaseArtwork = [
  "b0-new moon", "b1-waxing crescent", "b2-first quarter", "b3-waxing gibbous",
  "b4-full", "b5-wanning gibbous", "b6-last quarter", "b7-wanning crescent",
];
const phases = [
  {
    name: "New Moon",
    line: "The sky can be holding something wonderful, even when we can’t see it with our bare eyes.",
    detail: "I think people are like that, too. Everyone carries their own stories, fears, bravery, jealousy and kindness beneath the surface. I've learned that the most interesting parts of someone are the ones they don't show on the first meeting.",
  },
  {
    name: "Waxing Crescent",
    line: "Relationship starts as something incredibly small – a “hello”, a question, an awkward silence shared between two strangers.",
    detail: "I like beginnings. There's something magical about not knowing someone yet, while quietly wondering who they might become in your life. Curiosity has introduced me to some of the best people I've ever met.",
  },
  {
    name: "First Quarter",
    line: "The moon doesn't apologize for being only half-lit. It simply keeps orbiting, trusting that fullness comes with time.",
    detail: "The first quarter has never felt incomplete to me. It's simply a reminder that every full moon once looked exactly like this. I think life works the same way. There are days when it's tempting to focus on everything we haven't achieved yet, and forget how far we've already come.",
  },
  {
    name: "Waxing Gibbous",
    line: "There is always more. More to learn, more to become.",
    detail: "I admire people who stay curious, even when they're already good at what they do. The more I learn, the more I realize how much I don't know – and strangely, that's become one of the most exciting parts of growing up.",
  },
  {
    name: "Full Moon",
    line: "Presence is a quiet kind of love. Sometimes, staying is enough.",
    detail: "I don't know if we'll ever meet outside this little corner of the Internet. But if you've stayed with me until the full moon, thank you. It mattered that you were here, even when you didn't have to say the perfect words.",
  },
  {
    name: "Waning Gibbous",
    line: "Some things become clearer when the light begins to soften.",
    detail: "After a full and busy day, I like making space to notice what stayed with me. Sharing a thought with someone can make it feel lighter.",
  },
  {
    name: "Last Quarter",
    line: "Letting go can be a way of making room.",
    detail: "The moon keeps moving even as its light changes. I am learning that I can leave behind an old idea and still carry what it taught me.",
  },
  {
    name: "Waning Crescent",
    line: "Rest is part of the journey, too.",
    detail: "The quiet before a new beginning has its own beauty. We can pause here for a moment, without needing to know what comes next.",
  },
];

function DateSelector({ kind, onChangeKind }: Pick<Props, "kind" | "onChangeKind">) {
  return (
    <nav className="date-selector" aria-label="Choose a date">
      <button type="button" className={kind === "coffee" ? "active" : ""} aria-current={kind === "coffee" ? "page" : undefined} onClick={() => onChangeKind("coffee")}>
        <span className="date-selector-picture coffee-picture"><img src={illustration("coffe1-back")} alt="" /></span><span className="date-selector-name">Over Coffee</span>
      </button>
      <button type="button" className={kind === "moonwatch" ? "active" : ""} aria-current={kind === "moonwatch" ? "page" : undefined} onClick={() => onChangeKind("moonwatch")}>
        <span className="date-selector-picture moon-picture"><img src={illustration("moonwatch1-back")} alt="" /></span><span className="date-selector-name">Under the Moon</span>
      </button>
    </nav>
  );
}

const coffeeCards = [
  { image: "coffee4-cups", title: "At different coffee shops, I order the same thing", description: "Brown coffee: Sweet enough to enjoy. Honest enough to stay real. And always say something about the whole café.", note: "My coffee order defines me." },
  { image: "coffee4-cat", title: "I’m addicted to coffee", description: "I have iron deficiency. Without caffeine, I'm probably just a cat - two states: sleeping and about to sleep.", note: "Coffee powers me." },
  { image: "coffee4-table", title: "I love exploring new coffee shop", description: "Coffee shops are one of the few places where everyone is busy doing something completely different.", note: "Coffee shops inspire me." },
];

function CoffeeCarousel() {
  const [active, setActive] = useState(1);
  return <section className="date-section coffee-cards" aria-label="Reasons to stay for coffee">
    <div className="coffee-card-row" onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setActive((current) => (current + (event.key === "ArrowRight" ? 1 : 2)) % coffeeCards.length);
      }
    }}>
      {coffeeCards.map((card, index) => {
        const offset = (index - active + coffeeCards.length) % coffeeCards.length;
        const position = offset === 0 ? "center" : offset === 1 ? "right" : "left";
        return <button key={card.image} type="button" className={`coffee-card coffee-card-${position} coffee-card-${card.image}`} aria-pressed={index === active} aria-label={`${card.title}${index === active ? ", selected" : ", show details"}`} onClick={() => setActive(index)}>
          <span className="coffee-card-art"><img src={illustration(card.image)} alt="" /></span>
          <span className="coffee-card-title">{card.title}</span>
          <span className="coffee-card-details" aria-hidden={index !== active}><span>{card.description}</span><em>{card.note}</em></span>
        </button>;
      })}
    </div>
  </section>;
}

function DateHeader({ kind, language, setLanguage, onToggleMenu, menuOpen }: Pick<Props, "kind" | "language" | "setLanguage"> & { onToggleMenu: () => void; menuOpen: boolean }) {
  const coffeeIcon = exploreItems.find((item) => item.label === "A date with me")?.icon;
  return <header className="date-header">
    <button type="button" className="date-breadcrumb" onClick={onToggleMenu} aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="date-navigation"><span className="date-breadcrumb-icon" aria-hidden="true">{coffeeIcon}</span> A date with me <span aria-hidden="true">»</span></button>
    <div className="date-language" aria-label="Language">
      <button type="button" className={language === "VN" ? "active" : ""} onClick={() => setLanguage("VN")}>VN</button>
      <button type="button" className={language === "EN" ? "active" : ""} onClick={() => setLanguage("EN")}>EN</button>
    </div>
    <span className="date-header-kind" aria-hidden="true">{kind === "coffee" ? "Over Coffee" : "Under the Moon"}</span>
  </header>;
}

function DateSidebar({ kind, onClose, onOpenHistory }: Pick<Props, "kind" | "onOpenHistory"> & { onClose: () => void }) {
  const [comingSoon, setComingSoon] = useState(false);
  useEffect(() => {
    if (!comingSoon) return;
    const timeout = window.setTimeout(() => setComingSoon(false), 1000);
    return () => window.clearTimeout(timeout);
  }, [comingSoon]);

  return <><div className="date-sidebar-layer" role="dialog" aria-modal="true" aria-label="Navigation menu" id="date-navigation">
    <div className="date-sidebar-background" aria-hidden="true" style={{ backgroundImage: `url(${illustration(kind === "coffee" ? "coffe1-back" : "moonwatch1-back")})` }} />
    <aside className="book-sidebar date-sidebar">
      <div className="book-sidebar-section">
        <div className="book-sidebar-section-title">
          <span>EXPLORE</span>
          <button type="button" className="book-sidebar-close" onClick={onClose} aria-label="Close navigation menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 7L13 12L18 17M11 7L6 12L11 17" stroke="#44418D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        {exploreItems.map((item) => <button type="button" key={item.label} className={`book-sidebar-nav-row ${item.label === "A date with me" ? "active" : ""}`} onClick={() => {
          if (item.label === "A date with me") onClose();
          else if (item.label === "Book of history") onOpenHistory();
          else setComingSoon(true);
        }}><span className="book-sidebar-nav-icon">{item.icon}</span><span className="book-sidebar-nav-label">{item.label}</span>{item.info && <SidebarInfo label={item.label} />}</button>)}
      </div>
      <div className="book-sidebar-section">
        <div className="book-sidebar-section-title">QUICK STOPS</div>
        {quickStopItems.map((item) => <button type="button" key={item.label} className="book-sidebar-nav-row" onClick={() => item.label === "Resume/ Porfolio" ? onOpenHistory() : setComingSoon(true)}><span className="book-sidebar-nav-icon">{item.icon}</span><span className="book-sidebar-nav-label">{item.label}</span></button>)}
      </div>
      <SocialIcons />
    </aside>
  </div>
    {comingSoon && <div className="coming-soon-overlay" onClick={() => setComingSoon(false)}><div className="coming-soon-popup" onClick={(event) => event.stopPropagation()}>Coming soon</div></div>}
  </>;
}

function DateForm({ kind }: { kind: DateKind }) {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"" | "sending" | "success" | "error">("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setIsSending(true);
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xqpakvkl", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return <>
    <form className="date-form" onSubmit={handleSubmit} onChange={() => { if (!isSending) setStatus(""); }}>
      <p>{kind === "coffee" ? "If this were a real coffee date, what would you tell me? Tell me anything you'd love to. A random thought. A funny story. Or simply, just say hi." : "Some thoughts are too small for a diary, yet too precious to disappear. Tell me anything you'd love to. A random thought. A funny story. Or simply, just say hi."}</p>
      <div className="date-form-two">
        <label>Your Name<input name="name" placeholder="Whatever you'd like me to call you" required /></label>
        <label>Your Pronouns<input name="pronouns" placeholder="Just in case..." /></label>
      </div>
      <label>One thing about you<textarea name="message" placeholder={kind === "coffee" ? "Something you'd tell me over coffee." : "One honest thought for the moon to remember"} rows={2} required /></label>
      <div className="date-form-actions"><span role="status" aria-live="polite">{status === "sending" ? "Sending..." : status === "success" ? "Your message has been sent." : status === "error" ? "Something went wrong. Please try again." : ""}</span><button type="reset" onClick={() => { setIsSending(false); setStatus(""); }}>Cancel</button><button type="submit" disabled={isSending}>{isSending ? "Sending..." : "Send"}</button></div>
    </form>
  </>;
}

function PhaseCarousel() {
  const [selected, setSelected] = useState(0);
  const rotate = (direction: number) => setSelected((current) => (current + direction + phases.length) % phases.length);
  return <section className="date-section moon-carousel-section" aria-label="Moon phases">
    <img className="moon-carousel-stars" src={illustration("moonwatch4-sparkle")} alt="" />
    <div className="moon-carousel-copy" aria-live="polite"><h2>{phases[selected].name}</h2><h3>{phases[selected].line}</h3><div className="moon-divider" /><p>{phases[selected].detail}</p></div>
    <div className="moon-track" aria-label="Choose a moon phase">
      {([-1, 0, 1] as const).map((offset) => {
        const index = (selected + offset + phases.length) % phases.length;
        const phase = phases[index];
        return <button key={phase.name} type="button" className={`moon-orbit-item ${offset === 0 ? "is-center" : offset < 0 ? "is-previous" : "is-next"}`}
          aria-label={`${phase.name}${offset < 0 ? ", previous moon phase" : offset > 0 ? ", next moon phase" : ""}`}
          aria-current={offset === 0 ? "true" : undefined}
          onClick={() => { if (offset !== 0) rotate(offset); }}>
          <img src={illustration(moonPhaseArtwork[index])} alt="" />
          <span>{phase.name}</span>
        </button>;
      })}
    </div>
  </section>;
}

function DateFooter({ kind, onBackToMenu, onOpenHistory }: Pick<Props, "kind" | "onBackToMenu" | "onOpenHistory">) {
  const [comingSoon, setComingSoon] = useState(false);
  return <footer className={`date-footer ${kind}`}>
    <nav className="date-footer-links" aria-label="More from Noah">
      <button type="button" onClick={onBackToMenu}>Back to Menu ↗</button>
      <button type="button" onClick={() => setComingSoon(true)}>{kind === "coffee" ? "Want a cup of coffee with me?" : "Want to go moonwatch with me?"} ↗</button>
      <button type="button" onClick={() => setComingSoon(true)}>Read more from me ↗</button>
      <button type="button" onClick={onOpenHistory}>A peek into my other works ↗</button>
    </nav>
    {comingSoon && <div className="coming-soon-overlay" onClick={() => setComingSoon(false)}><div className="coming-soon-popup" role="dialog" aria-modal="true" aria-label="Coming soon" onClick={(event) => event.stopPropagation()}>Coming soon</div></div>}
  </footer>;
}

export default function DateWithMe(props: Props) {
  const { kind, onChangeKind, language, setLanguage, onBackToMenu, onOpenHistory } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const source = kind === "moonwatch"
      ? `${musicRoot}Aylex-Creamy.mp3`
      : `${musicRoot}Lukrembo-Boba Tea.mp3`;

    audio.pause();
    audio.src = source;
    audio.load();
    audio.currentTime = kind === "coffee" ? 3 : 0;

    let cancelled = false;
    let waitingForInteraction = false;
    const retryPlay = () => {
      if (!cancelled) void audio.play().catch(() => undefined);
    };

    void audio.play().catch(() => {
      if (!cancelled) {
        waitingForInteraction = true;
        window.addEventListener("pointerdown", retryPlay, { once: true });
      }
    });

    return () => {
      cancelled = true;
      audio.pause();
      if (waitingForInteraction) window.removeEventListener("pointerdown", retryPlay);
    };
  }, [kind]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  const moon = kind === "moonwatch";
  return <main className={`date-page ${moon ? "date-moon" : "date-coffee"} ${menuOpen ? "sidebar-open" : ""}`}>
    <audio ref={audioRef} loop preload="auto" aria-hidden="true" />
    <div className="date-topbar">
      <DateHeader kind={kind} language={language} setLanguage={setLanguage} onToggleMenu={() => setMenuOpen((open) => !open)} menuOpen={menuOpen} />
    </div>
    <section className="date-section date-first">
      <img className="date-first-background" src={illustration(moon ? "moonwatch1-back" : "coffe1-back")} alt="" />
      <div className="date-quote"><h1>{moon ? '“Everyone is a moon, and has a dark side which he never shows to anybody.”*' : '“Behind every successful woman is a substantial amount of coffee.”*'}</h1><p>{moon ? "Accepting this as a fact, rather than using it to judge anyone, is my way of respecting people." : "For me, it’ll almost always be a Vietnamese brown coffee with 20% less condensed milk"}</p></div>
      <span className="date-credit">[*] {moon ? "Mark Twain" : "Stephanie Piro"}</span>
      <DateSelector kind={kind} onChangeKind={onChangeKind} />
    </section>
    {moon ? <>
      <section className="date-section moon-scene"><img className="moon-scene-sparkles" src={illustration("moonwatch2-sparkles")} alt="" /><p>We're sitting together on a beach...</p><h2>A soft breeze brushes through our hair.<br />The full moon hangs quietly above us,<br />while wisps of cloud sway like a sheer veil.<br />We simply share the silence...</h2><p>Here’s a <em>picture of me</em> if it may help</p></section>
      <section className="date-section moon-reflection"><img className="moon-reflection-sparkles" src={illustration("moonwatch3-sparkle")} alt="" /><img className="moon-reflection-moon" src={illustration("moonwatch3-moon")} alt="" /><div><h2>Speaking of silence, why do we often link the moon with serene and quiet?</h2><p>If you ask me, I’d say it’s because the moon is simply there to listen.</p><p>The moon leaves room for people. It doesn’t dominate the night – but always stays, softly illuminating everything around it. Just enough light for conversations to unfold, for quiet walks to linger a little longer, for stolen glances to mean something, and for thoughts we’d never dare speak beneath the brightness of day.</p><p><em>I want to be as the moon – not the loudest presence, but let people feel safe enough to have honest conversations.</em></p></div></section>
      <PhaseCarousel />
      <section className="date-section date-contact moon-contact"><span className="moon-contact-glow" aria-hidden="true" /><div><h2>The moon is listening</h2><p>But it has listened to me all night. Maybe it’s your turn now.</p><p>If there’s a thought you’ve been carrying lately,<br />I’d be honored to hold it for a little while.</p></div><DateForm kind={kind} /></section>
    </> : <>
      <section className="date-section coffee-scene"><img src={illustration("coffe2-dots")} alt="" /><div><p>Imagine you’re in a coffee date with me...</p><h2>You’re in your most favourite outfit.<br />I’m in my red mullet and silver earrings.<br />You look gorgeous, I got the smile,<br />And we sit next to each other.</h2><p>Here’s a <em>picture of me</em> if it may help</p></div></section>
      <section className="date-section coffee-why"><img className="coffee-why-art" src={illustration("coffe3-coffecup")} alt="" /><div><h2>You may ask, “Why Noah, why coffee?”</h2><p>Coffee tastes amazing! It can be as simple as that.</p><p>But a cup of coffee never just feels like a drink to me. It’s kind of a tiny ritual everyday that tells my brain, “Aight, it’s time”. Time to be locked in, think deeper, create better, chase bigger ideas, and enjoy every bit of the process along the way.</p><p><em>Coffee wakes up the version of me that already has too much of it.</em></p></div></section>
      <CoffeeCarousel />
      <section className="date-section date-contact coffee-contact"><span className="coffee-contact-glow" aria-hidden="true" /><div><p>I guess that’s quite enough about me.</p><p>Coffee conversations are never supposed to be one-sided.</p><h2>So... What’s on your mind?</h2></div><DateForm kind={kind} /></section>
    </>}
    <DateFooter kind={kind} onBackToMenu={onBackToMenu} onOpenHistory={onOpenHistory} />
    {menuOpen && <DateSidebar kind={kind} onClose={() => setMenuOpen(false)} onOpenHistory={onOpenHistory} />}
  </main>;
}
