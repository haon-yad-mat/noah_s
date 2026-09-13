import { useEffect, useRef, useState, type CSSProperties } from "react";

const bubbles = [
  { label: "Product Marketing", level: 1, color: "mint" },
  { label: "Marketing Planner", level: 1, color: "pink" },
  { label: "Market Research", level: 1, color: "lavender" },
  { label: "Project Management", level: 2, color: "mint-soft" },
  { label: "Psychology", level: 2, color: "peach" },
  { label: "Operating Systems", level: 2, color: "mint-soft" },
  { label: "Designing", level: 3, color: "pink" },
  { label: "Cognitive Science", level: 3, color: "yellow" },
  { label: "Coffee Dates", level: 3, color: "peach" },
  { label: "Cats", level: 3, color: "lavender" },
  { label: "Astrology", level: 3, color: "pink" },
];

const TARGET_HEIGHT = 504;
const COPY_GAP = 80;
const COPY_WIDTH = 523;
const SIDEBAR_HALF_WIDTH = 144;

export default function BookofHistory2() {
  const [progress, setProgress] = useState(0);
  const [frameStyle, setFrameStyle] = useState<CSSProperties>({});
  const [contentStyle, setContentStyle] = useState<CSSProperties>({});
  const [quoteStyle, setQuoteStyle] = useState<CSSProperties>({});

  const reverseRequestedRef = useRef(false);
  const lockedScrollYRef = useRef<number | null>(null);

  useEffect(() => {
    const handleProgress = (event: Event) => {
      const customEvent = event as CustomEvent<{ progress: number }>;
      const next = Math.max(0, Math.min(1, customEvent.detail?.progress ?? 0));

      setProgress(next);

      if (next <= 0.001) {
        reverseRequestedRef.current = false;
      }
    };

    window.addEventListener("book-history-2-progress", handleProgress);

    return () => {
      window.removeEventListener("book-history-2-progress", handleProgress);
    };
  }, []);

  useEffect(() => {
    if (progress <= 0) return;

    const bookPage = document.querySelector(
      ".book-of-history-page",
    ) as HTMLElement | null;

    const source = document.querySelector(
      ".book-face-frame",
    ) as HTMLElement | null;

    const quote = document.querySelector(
      ".book-quote",
    ) as HTMLElement | null;

    if (!bookPage || !source || !quote) return;

    const sourceRect = source.getBoundingClientRect();
    const quoteRect = quote.getBoundingClientRect();

    /*
     * All Page 3 geometry is measured from Page 2.
     * If the sidebar is already open, remove its +144px visual offset
     * from the baseline; CSS adds it back consistently.
     */
    const sidebarOffset = bookPage.classList.contains("sidebar-open")
      ? SIDEBAR_HALF_WIDTH
      : 0;

    const targetLeft = sourceRect.left - sidebarOffset;
    const targetWidth = sourceRect.width;
    const sourceCenterY = sourceRect.top + sourceRect.height / 2;
    const targetTop = sourceCenterY - TARGET_HEIGHT / 2;

    const lerp = (from: number, to: number) =>
      from + (to - from) * progress;

    setFrameStyle({
      left: targetLeft,
      top: lerp(sourceRect.top, targetTop),
      width: targetWidth,
      height: lerp(sourceRect.height, TARGET_HEIGHT),
    });

    setContentStyle({
      left: targetLeft,
      top: targetTop,
      width: targetWidth + COPY_GAP + COPY_WIDTH,
      height: TARGET_HEIGHT,
    });

    setQuoteStyle({
      left: quoteRect.left - sidebarOffset,
      top: quoteRect.top,
      width: quoteRect.width,
      height: quoteRect.height,
    });
  }, [progress]);

  /*
   * HARD SCROLL LOCK:
   * While Page 3 exists, the document is pinned to Page 2's scroll position.
   * Therefore an upward wheel from Page 3 cannot accidentally continue to Page 1.
   * Only after the reverse animation reaches progress=0 is normal scrolling restored.
   */
  useEffect(() => {
    if (progress <= 0) {
      document.body.classList.remove("page3-transition-active");
      lockedScrollYRef.current = null;
      reverseRequestedRef.current = false;
      return;
    }

    document.body.classList.add("page3-transition-active");

    /*
     * Lock the document where the user currently is.
     * Do NOT jump to Page 2's exact top — that was causing visible jumps/races.
     */
    if (lockedScrollYRef.current === null) {
      lockedScrollYRef.current = window.scrollY;
    }

    const lockedY = lockedScrollYRef.current;

    const keepPinned = () => {
      if (Math.abs(window.scrollY - lockedY) > 1) {
        window.scrollTo(0, lockedY);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (
        progress >= 0.999 &&
        event.deltaY < 0 &&
        !reverseRequestedRef.current
      ) {
        reverseRequestedRef.current = true;
        window.dispatchEvent(new CustomEvent("book-history-2-reverse"));
      }
    };

    window.addEventListener("scroll", keepPinned, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", keepPinned);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [progress]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("page3-transition-active");
    };
  }, []);

  const mounted = progress > 0;
  const revealProgress = Math.max(0, Math.min(1, (progress - 0.18) / 0.82));

  return (
    <div
      className={`book-history-2 ${mounted ? "is-mounted" : ""}`}
      aria-hidden={!mounted}
      style={
        {
          "--page3-progress": progress,
          "--page3-reveal-progress": revealProgress,
        } as CSSProperties
      }
    >
      <div className="book-history-2-content" style={contentStyle}>
        <div className="book-history-2-portrait-target" />

        <div className="book-history-2-copy-stage">
          <div className="book-history-2-copy">
            <h2>
              I&rsquo;m <span>Noah</span>
            </h2>

            <div className="book-history-2-intro">
              <p>
                I can do a lot of stuff.
                <br />
                But I don&rsquo;t talk much about what I do.
              </p>

              <p className="book-history-2-red">
                My actions talk for themselves.
              </p>
            </div>

            <div className="book-history-2-keywords">
              <p>
                Below are some keywords you may find about me,
                <br />
                or you can keep{" "}
                <strong className="book-history-2-scrolling">scrolling</strong>
                {" "}to hear my actions talk
              </p>

              <div className="book-history-2-bubbles">
                {bubbles.map((bubble) => (
                  <span
                    key={bubble.label}
                    className={`history-bubble level-${bubble.level} ${bubble.color}`}
                  >
                    {bubble.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted && (
        <>
          <div className="book-history-2-morph" style={frameStyle}>
            <img
              className="book-history-2-morph-portrait"
              src="/noah_s_portfolio/images/portrait1.svg"
              alt=""
            />
          </div>

          {/*
            This is a transition clone of the Page 2 quote.
            It sits ABOVE Page 3 copy, splits away, and disappears.
            The incoming Page 3 text is revealed UNDER it.
          */}
          <div className="book-history-2-outgoing-quote" style={quoteStyle}>
            <span className="book-history-2-outgoing-line outgoing-top">
              <span>Actions</span> speak
            </span>

            <span className="book-history-2-outgoing-line outgoing-bottom">
              louder than words
            </span>
          </div>
        </>
      )}
    </div>
  );
}
