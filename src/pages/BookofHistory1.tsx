import { useEffect, useRef, useState, type CSSProperties } from "react";

const BOOK_PROGRESS_STORAGE_KEY = "noah-book-history-progress";

const readStoredBookProgress = () => {
  const stored = Number(window.sessionStorage.getItem(BOOK_PROGRESS_STORAGE_KEY));
  return Number.isFinite(stored) ? Math.max(0, Math.min(1, stored)) : 0;
};

const InfoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="8.33"
      stroke="#3A2F47"
      strokeWidth="2"
    />
    <path
      d="M12 11V16M12 8H12.01"
      stroke="#3A2F47"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SocialIcons = () => (
  <div className="book-sidebar-social-area">
    <div className="book-sidebar-social-row">
      <a href="https://www.linkedin.com/in/this-is-noah" className="book-sidebar-social" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <img src="/noah_s_portfolio/images/LinkedinLogo.svg" alt="LinkedIn" />
      </a>

      <a href="https://www.instagram.com/it3ju5t_noah/" className="book-sidebar-social" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <img src="/noah_s_portfolio/images/IGLogo.svg" alt="Instagram" />
      </a>

      <a href="mailto:luutmtam@gmail.com" className="book-sidebar-social" aria-label="Gmail">
        <img src="/noah_s_portfolio/images/GmailLogo.svg" alt="Gmail" />
      </a>

      <a href="https://www.tiktok.com/@noah.overthinker?lang=en" className="book-sidebar-social" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
        <img src="/noah_s_portfolio/images/TiktokLogo.svg" alt="TikTok" />
      </a>

      <a href="https://www.facebook.com/just.lemme.name.myself.noah/" className="book-sidebar-social" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <img src="/noah_s_portfolio/images/FbLogo.svg" alt="Facebook" />
      </a>
    </div>
  </div>
);

export const exploreItems = [
  {
    label: "Wandering idea",
    info: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10.8333 13.3334C11.3162 13.3328 11.7889 13.472 12.1944 13.7343C12.5998 13.9965 12.9207 14.3706 13.1181 14.8113C13.3155 15.252 13.3811 15.7404 13.3069 16.2176C13.2327 16.6947 13.0219 17.1402 12.7 17.5001M15 10.0001H15.0083M15 17.5H8.33331C7.44926 17.5 6.60141 17.1488 5.97629 16.5237C5.35117 15.8986 4.99998 15.0507 4.99998 14.1667C4.99998 12.6196 5.61456 11.1359 6.70852 10.0419C7.80249 8.94793 9.28622 8.33335 10.8333 8.33335H11L7.99998 5.33335C7.84677 5.18014 7.72524 4.99825 7.64232 4.79808C7.55941 4.5979 7.51673 4.38335 7.51673 4.16668C7.51673 3.7291 7.69056 3.30943 7.99998 3.00001C8.3094 2.69059 8.72906 2.51676 9.16665 2.51676C9.38332 2.51676 9.59786 2.55944 9.79804 2.64236C9.99822 2.72527 10.1801 2.8468 10.3333 3.00001L13.1666 5.83335H13.3333M13.3333 5.83335C16.0833 5.83335 18.3333 8.08335 18.3333 10.8333V11.6667C18.3333 12.1087 18.1577 12.5326 17.8452 12.8452C17.5326 13.1578 17.1087 13.3333 16.6666 13.3333H15.8333C15.1703 13.3333 14.5344 13.5967 14.0655 14.0656C13.5967 14.5344 13.3333 15.1703 13.3333 15.8333M13.3333 5.83335V3.33341C13.3333 2.89139 13.5089 2.46746 13.8215 2.1549C14.134 1.84234 14.558 1.66675 15 1.66675C15.442 1.66675 15.8659 1.84234 16.1785 2.1549C16.4911 2.46746 16.6666 2.89139 16.6666 3.33341V7.11675M6.34333 10.4367C6.109 10.022 5.76107 9.68285 5.34049 9.45921C4.91991 9.23557 4.44419 9.13674 3.96934 9.17435C3.49449 9.21197 3.04026 9.38446 2.66014 9.67152C2.28001 9.95859 1.98981 10.3483 1.82369 10.7947C1.65758 11.2411 1.62246 11.7258 1.72248 12.1915C1.8225 12.6572 2.05349 13.0847 2.38825 13.4235C2.72302 13.7624 3.14763 13.9986 3.6121 14.1042C4.07657 14.2099 4.56157 14.1807 5.00999 14.02"
          stroke="black"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "A date with me",
    info: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M8.33333 1.66675V3.33341M11.6667 1.66675V3.33341M13.3333 6.66675C13.5543 6.66675 13.7663 6.75455 13.9226 6.91083C14.0789 7.06711 14.1667 7.27907 14.1667 7.50008V14.1667C14.1667 15.0508 13.8155 15.8986 13.1904 16.5238C12.5652 17.1489 11.7174 17.5001 10.8333 17.5001H5.83333C4.94928 17.5001 4.10143 17.1489 3.47631 16.5238C2.85119 15.8986 2.5 15.0508 2.5 14.1667V7.50008C2.5 7.27907 2.5878 7.06711 2.74408 6.91083C2.90036 6.75455 3.11232 6.66675 3.33333 6.66675H15C15.8841 6.66675 16.7319 7.01794 17.357 7.64306C17.9821 8.26818 18.3333 9.11603 18.3333 10.0001C18.3333 10.8841 17.9821 11.732 17.357 12.3571C16.7319 12.9822 15.8841 13.3334 15 13.3334H14.1667M5 1.66675V3.33341"
          stroke="black"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Book of history",
    info: true,
    active: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M4.33325 5.16654L5.49992 6.33321M1.66663 10.8333H3.33329M16.6666 10.8333H18.3333M14.4999 6.33321L15.6665 5.16654M18.3333 14.1666H1.66663M18.3333 17.4999H1.66663M13.3333 10.8333C13.3333 9.9492 12.9821 9.10135 12.357 8.47623C11.7319 7.85111 10.884 7.49992 9.99996 7.49992C9.1159 7.49992 8.26806 7.85111 7.64294 8.47623C7.01782 9.10135 6.66663 9.9492 6.66663 10.8333M9.99996 4.16659V2.08325"
          stroke="black"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Yapping sessions",
    info: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M13.1665 7.66658C12.7771 7.28486 12.2535 7.07104 11.7082 7.07104C11.1629 7.07104 10.6393 7.28486 10.2499 7.66658L9.99987 7.99991L9.7082 7.74991C9.51716 7.54314 9.28494 7.37865 9.02649 7.26703C8.76804 7.15542 8.48908 7.09915 8.20758 7.10186C7.92607 7.10456 7.64824 7.16618 7.39198 7.28274C7.13573 7.3993 6.90671 7.56822 6.71968 7.77863C6.53264 7.98904 6.39174 8.23628 6.30603 8.50444C6.22031 8.7726 6.1917 9.05573 6.22201 9.33561C6.25233 9.6155 6.34092 9.88593 6.48206 10.1295C6.62321 10.3731 6.81379 10.5844 7.04154 10.7499L10.0415 13.6666L13.0415 10.7499C14.0415 9.74991 13.9582 8.49991 13.2082 7.66658M6.58329 16.6666C8.17377 17.4825 10.0034 17.7035 11.7424 17.2898C13.4814 16.876 15.0154 15.8548 16.0681 14.4101C17.1208 12.9654 17.6228 11.1922 17.4838 9.41009C17.3447 7.62797 16.5738 5.9541 15.3098 4.69012C14.0458 3.42614 12.3719 2.65517 10.5898 2.51614C8.8077 2.37711 7.03452 2.87916 5.58981 3.93183C4.1451 4.9845 3.12387 6.51855 2.71014 8.25755C2.29642 9.99655 2.51741 11.8261 3.33329 13.4166L1.66663 18.3333L6.58329 16.6666Z"
          stroke="black"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const quickStopItems = [
  {
    label: "Anything new?",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M9.60416 1.91249C9.64068 1.83871 9.6971 1.7766 9.76704 1.73318C9.83698 1.68976 9.91767 1.66675 9.99999 1.66675C10.0823 1.66675 10.163 1.68976 10.233 1.73318C10.3029 1.7766 10.3593 1.83871 10.3958 1.91249L12.3208 5.81166C12.4476 6.0683 12.6348 6.29033 12.8663 6.4587C13.0979 6.62707 13.3668 6.73675 13.65 6.77833L17.955 7.40833C18.0366 7.42014 18.1132 7.45455 18.1762 7.50766C18.2393 7.56076 18.2862 7.63045 18.3117 7.70883C18.3372 7.78721 18.3402 7.87116 18.3205 7.95119C18.3007 8.03121 18.259 8.10412 18.2 8.16166L15.0867 11.1933C14.8813 11.3934 14.7277 11.6404 14.639 11.913C14.5503 12.1856 14.5292 12.4757 14.5775 12.7583L15.3125 17.0417C15.3269 17.1232 15.3181 17.2071 15.2871 17.2839C15.2561 17.3607 15.2041 17.4272 15.1371 17.4758C15.0701 17.5245 14.9908 17.5533 14.9082 17.5591C14.8256 17.5648 14.7431 17.5472 14.67 17.5083L10.8217 15.485C10.5681 15.3518 10.286 15.2823 9.99958 15.2823C9.71318 15.2823 9.43106 15.3518 9.17749 15.485L5.32999 17.5083C5.25694 17.547 5.17449 17.5644 5.09204 17.5585C5.00958 17.5527 4.93043 17.5238 4.86357 17.4752C4.79672 17.4266 4.74485 17.3601 4.71387 17.2835C4.68289 17.2069 4.67404 17.1231 4.68833 17.0417L5.42249 12.7592C5.47099 12.4764 5.44998 12.1862 5.36128 11.9134C5.27257 11.6406 5.11883 11.3935 4.91333 11.1933L1.79999 8.16249C1.74049 8.10502 1.69832 8.03199 1.6783 7.95172C1.65827 7.87145 1.66119 7.78717 1.68673 7.70848C1.71226 7.6298 1.75938 7.55986 1.82272 7.50665C1.88607 7.45343 1.96308 7.41907 2.04499 7.40749L6.34916 6.77833C6.63271 6.73708 6.90199 6.62754 7.13381 6.45915C7.36564 6.29076 7.55308 6.06855 7.67999 5.81166L9.60416 1.91249Z"
          stroke="#09090B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Design Desk",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M11.6667 4.16675L9.16667 6.66675M11.6667 4.16675L17.5 5.83341L10.8333 12.5001L9.16667 6.66675M11.6667 4.16675L9.16667 1.66675L6.66667 4.16675L9.16667 6.66675M7.91667 5.41675L3.33333 10.0001L5.83333 15.0001M2.5 18.3334V16.6667C2.5 15.7501 3.25 15.0001 4.16667 15.0001H7.5C7.94203 15.0001 8.36595 15.1757 8.67851 15.4882C8.99107 15.8008 9.16667 16.2247 9.16667 16.6667V18.3334H2.5Z"
          stroke="#09090B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Book-shelf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3.33337 16.2501V3.75008C3.33337 3.19755 3.55287 2.66764 3.94357 2.27694C4.33427 1.88624 4.86417 1.66675 5.41671 1.66675H15.8334C16.0544 1.66675 16.2663 1.75455 16.4226 1.91083C16.5789 2.06711 16.6667 2.27907 16.6667 2.50008V17.5001C16.6667 17.7211 16.5789 17.9331 16.4226 18.0893C16.2663 18.2456 16.0544 18.3334 15.8334 18.3334H5.41671C4.86417 18.3334 4.33427 18.1139 3.94357 17.7232C3.55287 17.3325 3.33337 16.8026 3.33337 16.2501ZM3.33337 16.2501C3.33337 15.6975 3.55287 15.1676 3.94357 14.7769C4.33427 14.3862 4.86417 14.1667 5.41671 14.1667H16.6667M7.50004 7.91675L9.16671 9.58341L12.5 6.25008"
          stroke="#09090B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Resume/ Porfolio",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 3.77778C11.35 2.44444 12.466 2 14.05 2C15.3628 2 16.6219 2.51508 17.5502 3.43192C18.4785 4.34877 19 5.59228 19 6.88889C19 8.92444 17.641 10.48 16.3 11.7778L10 18L3.7 11.7778C2.35 10.4889 1 8.93333 1 6.88889C1 5.59228 1.52152 4.34877 2.44982 3.43192C3.37813 2.51508 4.63718 2 5.95 2C7.534 2 8.65 2.44444 10 3.77778ZM10 3.77778L7.33609 6.40889C7.15323 6.58818 7.0081 6.80144 6.90906 7.03638C6.81002 7.27132 6.75903 7.52329 6.75903 7.77778C6.75903 8.03227 6.81002 8.28424 6.90906 8.51918C7.0081 8.75411 7.15323 8.96737 7.33609 9.14667C8.07409 9.87556 9.25309 9.90222 10.0361 9.20889L11.8991 7.52C12.3661 7.10151 12.974 6.86968 13.6046 6.86968C14.2351 6.86968 14.8431 7.10151 15.3101 7.52L17.9741 9.88444M15.4 12.6667L13.6 10.8889M12.7 15.3333L10.9 13.5556"
          stroke="#09090B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "FAQs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M13.5556 2C13.0841 2 12.6319 2.1873 12.2985 2.5207C11.9651 2.8541 11.7778 3.30628 11.7778 3.77778V9.11111C11.7778 9.58261 11.9651 10.0348 12.2985 10.3682C12.6319 10.7016 13.0841 10.8889 13.5556 10.8889C13.7913 10.8889 14.0174 10.9825 14.1841 11.1492C14.3508 11.3159 14.4444 11.542 14.4444 11.7778V12.6667C14.4444 13.1382 14.2571 13.5903 13.9237 13.9237C13.5903 14.2571 13.1382 14.4444 12.6667 14.4444C12.4309 14.4444 12.2048 14.5381 12.0381 14.7048C11.8714 14.8715 11.7778 15.0976 11.7778 15.3333V17.1111C11.7778 17.3469 11.8714 17.573 12.0381 17.7397C12.2048 17.9064 12.4309 18 12.6667 18C14.0812 18 15.4377 17.4381 16.4379 16.4379C17.4381 15.4377 18 14.0812 18 12.6667V3.77778C18 3.30628 17.8127 2.8541 17.4793 2.5207C17.1459 2.1873 16.6937 2 16.2222 2H13.5556Z"
          stroke="#09090B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.77778 2C3.30628 2 2.8541 2.1873 2.5207 2.5207C2.1873 2.8541 2 3.30628 2 3.77778V9.11111C2 9.58261 2.1873 10.0348 2.5207 10.3682C2.8541 10.7016 3.30628 10.8889 3.77778 10.8889C4.01353 10.8889 4.23962 10.9825 4.40632 11.1492C4.57302 11.3159 4.66667 11.542 4.66667 11.7778V12.6667C4.66667 13.1382 4.47937 13.5903 4.14597 13.9237C3.81257 14.2571 3.36038 14.4444 2.88889 14.4444C2.65314 14.4444 2.42705 14.5381 2.26035 14.7048C2.09365 14.8715 2 15.0976 2 15.3333V17.1111C2 17.3469 2.09365 17.573 2.26035 17.7397C2.42705 17.9064 2.65314 18 2.88889 18C4.30338 18 5.65993 17.4381 6.66012 16.4379C7.66032 15.4377 8.22222 14.0812 8.22222 12.6667V3.77778C8.22222 3.30628 8.03492 2.8541 7.70152 2.5207C7.36812 2.1873 6.91594 2 6.44444 2H3.77778Z"
          stroke="#09090B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];
type Language = "VN" | "EN";

type BookofHistory1Props = {
  language: Language;
  setLanguage: (value: Language) => void;
  onOpenResume: () => void;
};

export default function BookofHistory1({
  language,
  setLanguage,
  onOpenResume,
}: BookofHistory1Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [infoTooltip, setInfoTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const page2VisibleRef = useRef(false);
  const hoverCountRef = useRef(0);
  const lastHoverXRef = useRef<number | null>(null);
  const lastHoverCountAtRef = useRef(0);
  const idleTimerRef = useRef<number | null>(null);
  const reverseAnimationRef = useRef<number | null>(null);
  const initialBookProgress = readStoredBookProgress();
  const page3ProgressRef = useRef(initialBookProgress);
  const [page3Progress, setPage3Progress] = useState(initialBookProgress);

  const commitPage3Progress = (nextProgress: number) => {
    const clamped = Math.max(0, Math.min(1, nextProgress));

    page3ProgressRef.current = clamped;
    setPage3Progress(clamped);
    window.sessionStorage.setItem(
      BOOK_PROGRESS_STORAGE_KEY,
      String(clamped),
    );

    window.dispatchEvent(
      new CustomEvent("book-history-2-progress", {
        detail: { progress: clamped },
      }),
    );

    if (clamped >= 1 && idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const clearIdleTimer = () => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const scheduleIdleTransition = () => {
    clearIdleTimer();

    // IMPORTANT:
    // Idle auto-transition only exists while Page 2 is actually on screen.
    if (!page2VisibleRef.current) return;
    if (page3ProgressRef.current >= 1) return;

    idleTimerRef.current = window.setTimeout(() => {
      if (page2VisibleRef.current && page3ProgressRef.current < 1) {
        commitPage3Progress(1);
      }
    }, 3000);
  };

  const registerHoverAction = () => {
    if (page3ProgressRef.current >= 1) return;

    hoverCountRef.current = Math.min(3, hoverCountRef.current + 1);
    commitPage3Progress(hoverCountRef.current / 3);

    if (page2VisibleRef.current) {
      scheduleIdleTransition();
    }
  };

  const handleFaceEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (page3ProgressRef.current >= 1) return;

    lastHoverXRef.current = event.clientX;
    lastHoverCountAtRef.current = performance.now();

    // Entering the frame still counts as one hover action.
    registerHoverAction();
  };

  const handleFaceMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (page3ProgressRef.current >= 1) return;

    const previousX = lastHoverXRef.current;

    if (previousX === null) {
      lastHoverXRef.current = event.clientX;
      return;
    }

    const distance = Math.abs(event.clientX - previousX);
    const now = performance.now();

    /*
     * A meaningful sweep inside the frame counts too.
     * 70px prevents tiny mouse jitter from instantly triggering all 3 steps.
     * 180ms prevents one fast browser mousemove burst from double-counting.
     */
    if (
      distance >= 70 &&
      now - lastHoverCountAtRef.current >= 180
    ) {
      lastHoverXRef.current = event.clientX;
      lastHoverCountAtRef.current = now;
      registerHoverAction();
    }
  };

  const handleFaceLeave = () => {
    lastHoverXRef.current = null;
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Consider Page 2 "active" only when most of it is visible.
        page2VisibleRef.current =
          entry.isIntersecting && entry.intersectionRatio >= 0.65;

        if (page2VisibleRef.current && page3ProgressRef.current < 1) {
          scheduleIdleTransition();
        } else {
          clearIdleTimer();
        }
      },
      {
        threshold: [0, 0.65, 1],
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearIdleTimer();
    };
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      // Do NOT let activity on Page 1 reset/start Page 2's timer.
      if (
        page2VisibleRef.current &&
        page3ProgressRef.current < 1
      ) {
        scheduleIdleTransition();
      }
    };

    const handleReverse = () => {
      if (page3ProgressRef.current <= 0) return;

      clearIdleTimer();

      if (reverseAnimationRef.current !== null) {
        window.cancelAnimationFrame(reverseAnimationRef.current);
      }

      const startProgress = page3ProgressRef.current;
      const startTime = performance.now();
      const duration = 420;

      const animateBack = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);

        const eased =
          t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;

        commitPage3Progress(startProgress * (1 - eased));

        if (t < 1) {
          reverseAnimationRef.current =
            window.requestAnimationFrame(animateBack);
          return;
        }

        reverseAnimationRef.current = null;
        hoverCountRef.current = 0;
        lastHoverXRef.current = null;
        lastHoverCountAtRef.current = 0;
        commitPage3Progress(0);

        if (page2VisibleRef.current) {
          scheduleIdleTransition();
        }
      };

      reverseAnimationRef.current =
        window.requestAnimationFrame(animateBack);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("wheel", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });
    window.addEventListener("book-history-2-reverse", handleReverse);

    return () => {
      clearIdleTimer();

      if (reverseAnimationRef.current !== null) {
        window.cancelAnimationFrame(reverseAnimationRef.current);
      }

      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("wheel", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("book-history-2-reverse", handleReverse);
    };
  }, []);

  useEffect(() => {
    if (!comingSoonOpen) return;

    const timer = window.setTimeout(() => {
      setComingSoonOpen(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [comingSoonOpen]);

  return (
    <section
      ref={sectionRef}
      className={`book-of-history-page ${menuOpen ? "sidebar-open" : ""} ${
        page3Progress > 0 ? "page3-transitioning" : ""
      }`}
      style={
        {
          "--book-progress": page3Progress,
        } as CSSProperties
      }
    >
      {/* Background blobs */}
      <div className="book-blob book-blob-mint" />
      <div className="book-blob book-blob-yellow" />
      <div className="book-blob book-blob-pink" />

      {/* Header */}
      <header className="book-header">
        {!menuOpen && (
  <button
    className="book-menu-button"
    type="button"
    onClick={() => setMenuOpen(true)}
    aria-label="Open menu"
  >
    <svg
      className="book-menu-icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.33313 5.16654L5.4998 6.33321M1.6665 10.8333H3.33317M16.6665 10.8333H18.3332M14.4998 6.33321L15.6664 5.16654M18.3332 14.1666H1.6665M18.3332 17.4999H1.6665M13.3332 10.8333C13.3332 9.9492 12.982 9.10135 12.3569 8.47623C11.7317 7.85111 10.8839 7.49992 9.99984 7.49992C9.11578 7.49992 8.26794 7.85111 7.64281 8.47623C7.01769 9.10135 6.6665 9.9492 6.6665 10.8333M9.99984 4.16659V2.08325"
        stroke="#44418D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span>Book of history</span>

    <span className="book-menu-arrow" aria-hidden="true">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 17L11 12L6 7M13 17L18 12L13 7"
          stroke="#44418D"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </button>
)}

        <div className="book-language" aria-label="Language selector">
          <button
            type="button"
            className={language === "VN" ? "active" : ""}
            aria-pressed={language === "VN"}
            onClick={() => setLanguage("VN")}
          >
            VN
          </button>
          <button
            type="button"
            className={language === "EN" ? "active" : ""}
            aria-pressed={language === "EN"}
            onClick={() => setLanguage("EN")}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="book-main">
        <div
          className="book-face-frame"
          onMouseEnter={handleFaceEnter}
          onMouseMove={handleFaceMove}
          onMouseLeave={handleFaceLeave}
        >
          <img
            src="/noah_s_portfolio/images/portrait1.svg"
            alt="Noah"
          />
        </div>

        <h1 className="book-quote">
          <span className="book-quote-line book-quote-line-top">
            <span>Actions</span> speak
          </span>
          <span className="book-quote-line book-quote-line-bottom">
            louder than words
          </span>
        </h1>
      </main>

      {/* Footer */}
      <footer className="book-footer">
        <p>NOAH&rsquo;s PORTFOLIO</p>
        <span>latest update: Sep 2026</span>
      </footer>

      {/* Sidebar */}
      {menuOpen && (
  <div
    className="book-sidebar-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
  >

    <aside className="book-sidebar">
  <div className="book-sidebar-section">
    <div className="book-sidebar-section-title">
      <span>EXPLORE</span>

      <button
        type="button"
        className="book-sidebar-close"
        onClick={() => setMenuOpen(false)}
        aria-label="Close navigation menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M18 7L13 12L18 17M11 7L6 12L11 17"
            stroke="#44418D"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>

    {exploreItems.map((item) => (
      <button
        key={item.label}
        className={`book-sidebar-nav-row ${
          item.active ? "active" : ""
        }`}
        type="button"
        onClick={() => {
          if (!item.active) {
            setComingSoonOpen(true);
          }
        }}
      >
        <span className="book-sidebar-nav-icon">
          {item.icon}
        </span>

        <span className="book-sidebar-nav-label">
          {item.label}
        </span>

        {item.info && (
          <span
            className="book-sidebar-info"
            onMouseEnter={(event) => {
              const tooltipText =
                item.label === "A date with me"
                  ? "Lorem ipsum 1"
                  : item.label === "Book of history"
                  ? "Lorem ipsum 2"
                  : "Lorem ipsum 3";

              setInfoTooltip({
                text: tooltipText,
                x: event.clientX,
                y: event.clientY,
              });
            }}
            onMouseMove={(event) => {
              setInfoTooltip((current) =>
                current
                  ? {
                      ...current,
                      x: event.clientX,
                      y: event.clientY,
                    }
                  : current,
              );
            }}
            onMouseLeave={() => {
              setInfoTooltip(null);
            }}
          >
            <InfoIcon />
          </span>
        )}
      </button>
    ))}
  </div>

  <div className="book-sidebar-section">
    <div className="book-sidebar-section-title">
      QUICK STOPS
    </div>

    {quickStopItems.map((item) => (
      <button
        key={item.label}
        className="book-sidebar-nav-row"
        type="button"
        onClick={() => {
          if (item.label === "Resume/ Porfolio") {
            setMenuOpen(false);
            onOpenResume();
          } else {
            setComingSoonOpen(true);
          }
        }}
      >
        <span className="book-sidebar-nav-icon">
          {item.icon}
        </span>

        <span className="book-sidebar-nav-label">
          {item.label}
        </span>
      </button>
    ))}
  </div>

  <SocialIcons />
</aside>
  </div>
)}

      {comingSoonOpen && (
        <div
          className="coming-soon-overlay"
          onClick={() => setComingSoonOpen(false)}
        >
          <div
            className="coming-soon-popup"
            onClick={(event) => event.stopPropagation()}
          >
            Coming soon
          </div>
        </div>
      )}

      {infoTooltip && (
        <div
          className="book-info-tooltip"
          style={{
            left: infoTooltip.x,
            top: infoTooltip.y - 12,
          }}
        >
          {infoTooltip.text}
        </div>
      )}
    </section>
  );
}
