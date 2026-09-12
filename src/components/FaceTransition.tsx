import { useEffect, useRef } from "react";

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function getViewportRect(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();

  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export default function FaceTransition() {
  const faceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const revealStartTimeRef = useRef<number | null>(null);
  const previousProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const face = faceRef.current;
    const image = imageRef.current;

    const sourceContainer = document.querySelector(
      ".face-container"
    ) as HTMLElement | null;

    const sourceImage = sourceContainer?.querySelector(
      "img"
    ) as HTMLImageElement | null;

    const targetFrame = document.querySelector(
      ".book-face-frame"
    ) as HTMLElement | null;

    const targetImage = document.querySelector(
      ".book-face-frame img"
    ) as HTMLImageElement | null;

    const landingPage = document.querySelector(
      ".landing-page"
    ) as HTMLElement | null;

    const bookPage = document.querySelector(
      ".book-of-history-page"
    ) as HTMLElement | null;

    if (
      !face ||
      !image ||
      !sourceContainer ||
      !sourceImage ||
      !targetFrame ||
      !targetImage ||
      !landingPage ||
      !bookPage
    ) {
      return;
    }

    /*
     * =====================================================
     * TIMING
     * =====================================================
     */

    const ARRIVAL_DELAY = 10;
    const REVEAL_DURATION = 10;

    /*
     * =====================================================
     * MAIN UPDATE
     * =====================================================
     */

    const update = () => {
      const scrollY = window.scrollY;

      /*
       * -----------------------------------------------------
       * 1. PAGE 1 → PAGE 2 PROGRESS
       * -----------------------------------------------------
       *
       * Progress:
       *
       * 0 = top of Page 1
       * 1 = top of Page 2
       */

      const landingRect =
        landingPage.getBoundingClientRect();

      const bookRect =
        bookPage.getBoundingClientRect();

      const pageDistance =
        bookRect.top - landingRect.top;

      if (pageDistance <= 0) {
        return;
      }

      const progress = Math.max(
        0,
        Math.min(
          1,
          scrollY / pageDistance
        )
      );

      /*
       * -----------------------------------------------------
       * 2. GET CURRENT ELEMENT POSITIONS
       * -----------------------------------------------------
       */

      const sourceRect =
        getViewportRect(sourceContainer);

      const targetFrameRect =
        getViewportRect(targetFrame);

      const targetImageRect =
        getViewportRect(targetImage);

      /*
       * -----------------------------------------------------
       * 3. FACE TRANSITION
       * -----------------------------------------------------
       *
       * The transition clone moves:
       *
       * Page 1 face
       *       ↓
       * Page 2 face
       */

      const startLeft =
        sourceRect.left;

      const startTop =
        sourceRect.top;

      const endLeft =
        targetImageRect.left;

      const endTop =
        targetImageRect.top;

      /*
       * Smooth movement.
       *
       * This keeps the face movement natural rather than
       * simply jumping between the two positions.
       */

      const movementProgress =
        easeInOutCubic(progress);

      const faceLeft =
        lerp(
          startLeft,
          endLeft,
          movementProgress
        );

      const faceTop =
        lerp(
          startTop,
          endTop,
          movementProgress
        );

      /*
       * -----------------------------------------------------
       * 4. SCALE
       * -----------------------------------------------------
       */

      const finalScale =
        targetImageRect.width /
        sourceRect.width;

      const faceScale =
        lerp(
          1,
          finalScale,
          movementProgress
        );

      const faceWidth =
        sourceRect.width *
        faceScale;

      const faceHeight =
        sourceRect.height *
        faceScale;

      face.style.left =
        `${faceLeft}px`;

      face.style.top =
        `${faceTop}px`;

      face.style.width =
        `${faceWidth}px`;

      face.style.height =
        `${faceHeight}px`;

      image.style.left =
        "0px";

      image.style.top =
        "0px";

      image.style.width =
        `${faceWidth}px`;

      image.style.height =
        `${faceHeight}px`;

      /*
       * -----------------------------------------------------
       * 5. ARRIVAL
       * -----------------------------------------------------
       *
       * When the face reaches Page 2:
       *
       * face arrives
       * ↓
       * wait 10ms
       * ↓
       * red frame reveals
       */

      const justReachedEnd =
        previousProgressRef.current < 1 &&
        progress >= 1;

      if (justReachedEnd) {
        revealStartTimeRef.current =
          performance.now() +
          ARRIVAL_DELAY;
      }

      /*
       * If user scrolls back to Page 1,
       * cancel the reveal.
       */

      if (
        progress < 1 &&
        previousProgressRef.current >= 1
      ) {
        revealStartTimeRef.current =
          null;
      }

      previousProgressRef.current =
        progress;

      /*
       * -----------------------------------------------------
       * 6. RED FRAME REVEAL PROGRESS
       * -----------------------------------------------------
       */

      let revealProgress = 0;

      if (
        progress >= 1 &&
        revealStartTimeRef.current !== null
      ) {
        const elapsed =
          performance.now() -
          revealStartTimeRef.current;

        if (elapsed > 0) {
          revealProgress =
            Math.max(
              0,
              Math.min(
                1,
                elapsed /
                  REVEAL_DURATION
              )
            );
        }
      }

      const easedReveal =
        easeOutCubic(
          revealProgress
        );

      /*
       * -----------------------------------------------------
       * 7. FIND CENTER OF FACE
       * -----------------------------------------------------
       */

      const faceCenterX =
        targetImageRect.left +
        targetImageRect.width / 2;

      const faceCenterY =
        targetImageRect.top +
        targetImageRect.height / 2;

      const frameCenterX =
        faceCenterX -
        targetFrameRect.left;

      const frameCenterY =
        faceCenterY -
        targetFrameRect.top;

      /*
       * -----------------------------------------------------
       * 8. INITIAL CLIP
       * -----------------------------------------------------
       *
       * The red frame begins as a tiny rectangle
       * at the center of the face.
       */

      const clipStartTop =
        frameCenterY;

      const clipStartRight =
        targetFrameRect.width -
        frameCenterX;

      const clipStartBottom =
        targetFrameRect.height -
        frameCenterY;

      const clipStartLeft =
        frameCenterX;

      /*
       * -----------------------------------------------------
       * 9. EXPAND RED FRAME FROM CENTER
       * ----------------------------------------------------- */

      const clipTop =
        lerp(
          clipStartTop,
          0,
          easedReveal
        );

      const clipRight =
        lerp(
          clipStartRight,
          0,
          easedReveal
        );

      const clipBottom =
        lerp(
          clipStartBottom,
          0,
          easedReveal
        );

      const clipLeft =
        lerp(
          clipStartLeft,
          0,
          easedReveal
        );

      /*
       * -----------------------------------------------------
       * 10. BEFORE ARRIVAL
       * -----------------------------------------------------
       *
       * IMPORTANT:
       *
       * We do NOT modify sourceImage.opacity.
       *
       * This means:
       *
       * .face-container
       * ├── face SVG
       * ├── scroll
       * └── down
       *
       * remains completely untouched.
       */

      if (progress < 1) {
        face.style.visibility =
          "visible";

        targetFrame.style.opacity =
          "1";

        targetImage.style.opacity =
          "0";

        targetFrame.style.clipPath =
          `inset(
            ${clipStartTop}px
            ${clipStartRight}px
            ${clipStartBottom}px
            ${clipStartLeft}px
            round 15px
          )`;

        revealStartTimeRef.current =
          null;

        /*
         * Keep transition clone synchronized
         * with the original face.
         */

        face.style.display =
          "block";
      }

      /*
       * -----------------------------------------------------
       * 11. PAGE 2 REVEAL
       * ----------------------------------------------------- */

      if (progress >= 1) {
        face.style.visibility =
          "visible";

        targetFrame.style.opacity =
          "1";

        targetImage.style.opacity =
          "0";

        targetFrame.style.clipPath =
          `inset(
            ${clipTop}px
            ${clipRight}px
            ${clipBottom}px
            ${clipLeft}px
            round 15px
          )`;
      }

      /*
       * -----------------------------------------------------
       * 12. REVEAL FINISHED
       * ----------------------------------------------------- */

      if (
        progress >= 1 &&
        revealProgress >= 1
      ) {
        targetFrame.style.clipPath =
          "inset(0px 0px 0px 0px round 15px)";

        targetImage.style.opacity =
          "1";

        face.style.visibility =
          "hidden";

        revealStartTimeRef.current =
          null;

        return;
      }

      /*
       * -----------------------------------------------------
       * 13. CONTINUE REVEAL ANIMATION
       * ----------------------------------------------------- */

      if (
        progress >= 1 &&
        revealStartTimeRef.current !== null
      ) {
        animationFrameRef.current =
          requestAnimationFrame(update);
      }
    };

    /*
     * =====================================================
     * SCROLL / RESIZE
     * =====================================================
     */

    const requestUpdate = () => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      animationFrameRef.current =
        requestAnimationFrame(update);
    };

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    /*
     * Initial state
     */

    update();

    /*
     * =====================================================
     * CLEANUP
     * ===================================================== */

    return () => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      /*
       * Restore Page 2.
       */

      targetFrame.style.opacity =
        "";

      targetFrame.style.clipPath =
        "";

      targetImage.style.opacity =
        "";

      /*
       * IMPORTANT:
       * We never changed sourceImage.opacity,
       * so there is nothing to restore.
       */
    };
  }, []);

  return (
    <div
      ref={faceRef}
      className="face-transition"
      aria-hidden="true"
    >
      <img
        ref={imageRef}
        src="/noah_s_portfolio/images/mặt.svg"
        alt=""
      />
    </div>
  );
}