import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { exploreItems } from "./BookofHistory1";

type Language = "VN" | "EN";

type StartMenuProps = {
  language: Language;
  setLanguage: (value: Language) => void;
  active: boolean;
  onOpenHistory: () => void;
  onOpenDate: () => void;
};

type MenuOption = {
  id: string;
  label: string;
  sourceLabel: string;
  description: ReactNode;
  color: string;
  recommended?: boolean;
};

const menuOptions: MenuOption[] = [
  {
    id: "wandering",
    label: "Wandering area",
    sourceLabel: "Wandering idea",
    description: <>
      This is where you can see everything: recent updates from me, my readings,
      writings and even more. <strong>Just in case you haven’t got your mind on where to be yet.</strong>
    </>,
    color: "#6CE9C4",
    recommended: true,
  },
  {
    id: "date",
    label: "A date with me",
    sourceLabel: "A date with me",
    description: <>
      Catching some information about <strong>me</strong> &amp; let’s plan a date together, shall we?
    </>,
    color: "#FFAD52",
  },
  {
    id: "history",
    label: "Book of history",
    sourceLabel: "Book of history",
    description: <>
      My past? Nahh. More of a glance about my true-self through what I’ve done
      <strong> (a.k.a. My Portfolio).</strong>
    </>,
    color: "#C3A3F3",
  },
  {
    id: "yapping",
    label: "Yapping sessions",
    sourceLabel: "Yapping sessions",
    description: <>
      You can find me write, talk, draw about everything I’ve met in life. Come &amp; loot any
      <strong> interesting thoughts, books, articles, webs...</strong> you might find useful.
    </>,
    color: "#FC7D8D",
  },
];

const BASE_PATH = "/noah_s/";
const asset = (name: string) => `${BASE_PATH}images/start-menu/${name}`;

const armPoses = [
  { handX: 0, handY: 0, handAngle: 0, elbowX: 0, elbowY: 0, elbowAngle: 0, upperAngle: 0, upperStretch: 1 },
  { handX: -54, handY: 14, handAngle: -10, elbowX: -19, elbowY: -7, elbowAngle: -10, upperAngle: 4, upperStretch: 1 },
  { handX: -16, handY: 44, handAngle: -20, elbowX: 25, elbowY: 18, elbowAngle: -12, upperAngle: -5, upperStretch: 1.05 },
  { handX: -29, handY: 90, handAngle: -30, elbowX: 54, elbowY: 20, elbowAngle: -27, upperAngle: -11, upperStretch: 1.05 },
];

export default function StartMenu({ language, setLanguage, active, onOpenHistory, onOpenDate }: StartMenuProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const pose = armPoses[hoveredIndex] ?? armPoses[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    if (!active || !isPlaying) {
      audio.pause();
      return;
    }

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
      if (waitingForInteraction) window.removeEventListener("pointerdown", retryPlay);
    };
  }, [active, isPlaying]);

  useEffect(() => {
    if (!comingSoonOpen) return;
    const timer = window.setTimeout(() => setComingSoonOpen(false), 1000);
    return () => window.clearTimeout(timer);
  }, [comingSoonOpen]);

  const toggleOption = (option: MenuOption) => {
    setOpenId((current) => (current === option.id ? null : option.id));
  };

  return (
    <section className="start-menu" aria-label="Start menu">
      <audio
        ref={audioRef}
        src={`${BASE_PATH}audio/Avanti-Time.mp3`}
        loop
        preload={active ? "auto" : "none"}
      />

      <div className="start-menu-language" aria-label="Language">
        <button
          type="button"
          className={language === "VN" ? "active" : ""}
          onClick={() => setLanguage("VN")}
        >
          VN
        </button>
        <button
          type="button"
          className={language === "EN" ? "active" : ""}
          onClick={() => setLanguage("EN")}
        >
          EN
        </button>
      </div>

      <div className="start-menu-player" data-playing={isPlaying}>
        <img className="start-menu-record" src={asset("dia_nhac.svg")} alt="" />
        <img className="start-menu-axis" src={asset("truc_chi.svg")} alt="" />
        <img className="start-menu-tonearm" src={asset("can_chi.svg")} alt="" />
        <button
          type="button"
          className="start-menu-audio-toggle"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((playing) => !playing)}
        >
          <img
            src={asset(isPlaying ? "pause_icon.svg" : "play_icon.svg")}
            alt=""
          />
        </button>
      </div>

      <div className="start-menu-card">
        <div className="start-menu-card-glass" aria-hidden="true" />
        <div className="start-menu-card-content">
          <h1>Choose where you want to land in first.</h1>

          <div className="start-menu-options">
            {menuOptions.map((option, index) => {
              const icon = exploreItems.find(
                (item) => item.label === option.sourceLabel,
              )?.icon as ReactNode;
              const isOpen = openId === option.id;

              return (
                <article
                  className={`start-menu-option ${isOpen ? "is-open" : ""}`}
                  key={option.id}
                  style={{ "--option-color": option.color } as CSSProperties}
                  onPointerEnter={() => setHoveredIndex(index)}
                  onFocusCapture={() => setHoveredIndex(index)}
                >
                  <button
                    type="button"
                    className="start-menu-option-button"
                    aria-expanded={isOpen}
                    aria-controls={`start-menu-${option.id}`}
                    onClick={() => toggleOption(option)}
                  >
                    <span className="start-menu-option-icon">{icon}</span>
                    <span className="start-menu-option-label">{option.label}</span>
                    {option.recommended && (
                      <em className="start-menu-recommended">(recommend)</em>
                    )}
                  </button>

                  <div className="start-menu-details-reveal">
                    <div>
                      <div
                        id={`start-menu-${option.id}`}
                        className="start-menu-details"
                      >
                        <p>{option.description}</p>
                        <button
                          type="button"
                          className="start-menu-go"
                          tabIndex={isOpen ? 0 : -1}
                          aria-label={`Open ${option.label}`}
                          onClick={option.id === "history" ? onOpenHistory : option.id === "date" ? onOpenDate : () => setComingSoonOpen(true)}
                        >
                          <span className="start-menu-go-icon" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {comingSoonOpen && (
        <div className="coming-soon-overlay" onClick={() => setComingSoonOpen(false)}>
          <div className="coming-soon-popup" onClick={(event) => event.stopPropagation()}>
            Coming soon
          </div>
        </div>
      )}

      <div
        className="start-menu-character"
        aria-hidden="true"
        style={
          {
            "--upper-rotate": `${pose.upperAngle}deg`,
            "--upper-stretch": pose.upperStretch,
            "--elbow-x": `${pose.elbowX}px`,
            "--elbow-y": `${pose.elbowY}px`,
            "--elbow-rotate": `${pose.elbowAngle}deg`,
            "--hand-x": `${pose.handX}px`,
            "--hand-y": `${pose.handY}px`,
            "--hand-rotate": `${pose.handAngle}deg`,
          } as CSSProperties
        }
      >
        <img className="start-menu-character-body" src={asset("char_pointing_fixatedbody.svg")} alt="" />
        <img className="start-menu-upper-arm" src={asset("char_pointing_movingpart_baptay.svg")} alt="" />
        <img className="start-menu-elbow" src={asset("char_pointing_movingpart_khuyutayphai.svg")} alt="" />
        <img className="start-menu-hand" src={asset("char_pointing_movingpart_bantayphai.svg")} alt="" />
      </div>
    </section>
  );
}
