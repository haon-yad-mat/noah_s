import { useEffect, useRef } from "react";

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function getDocumentRect(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();

  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export default function FaceTransition() {
  const faceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const revealStartTimeRef =
    useRef<number | null>(null);

  const previousProgressRef =
    useRef(0);

  useEffect(() => {
    const face = faceRef.current;
    const image = imageRef.current;

    const sourceImage = document.querySelector(
      ".face-container img"
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
      !sourceImage ||
      !targetFrame ||
      !targetImage ||
      !landingPage ||
      !bookPage
    ) {
      return;
    }

    const update = () => {
      const scrollY = window.scrollY;

      /*
       * ========================================
       * 1. PAGE 1 → PAGE 2 PROGRESS
       * ========================================
       */

      const startY =
        landingPage.getBoundingClientRect().top +
        scrollY;

      const endY =
        bookPage.getBoundingClientRect().top +
        scrollY;

      if (endY <= startY) return;

      const progress = Math.max(
        0,
        Math.min(
          1,
          (scrollY - startY) /
            (endY - startY)
        )
      );

      /*
       * ========================================
       * 2. MEASURE ELEMENTS
       * ========================================
       */

      const sourceRect =
        getDocumentRect(sourceImage);

      const targetFrameRect =
        getDocumentRect(targetFrame);

      const targetImageRect =
        getDocumentRect(targetImage);

      /*
       * ========================================
       * 3. MOVE FACE
       * ========================================
       */

      const startLeft =
        sourceRect.left;

      const startTop =
        sourceRect.top - startY;

      const endLeft =
        targetImageRect.left;

      const endTop =
        targetImageRect.top - endY;

      const faceLeft =
        lerp(
          startLeft,
          endLeft,
          progress
        );

      const faceTop =
        lerp(
          startTop,
          endTop,
          progress
        );

      const finalScale =
        targetImageRect.width /
        sourceRect.width;

      const faceScale =
        lerp(
          1,
          finalScale,
          progress
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

      image.style.left = "0px";
      image.style.top = "0px";

      image.style.width =
        `${faceWidth}px`;

      image.style.height =
        `${faceHeight}px`;

      /*
       * ========================================
       * 4. FACE REACHES FINAL POSITION
       * ========================================
       *
       * Face arrives first.
       * Then waits 10ms.
       */

      const justReachedEnd =
        previousProgressRef.current < 1 &&
        progress >= 1;

      if (justReachedEnd) {
        revealStartTimeRef.current =
          performance.now() + 10;
      }

      /*
       * If user scrolls back up,
       * reset the reveal sequence.
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
       * ========================================
       * 5. CALCULATE RED REVEAL
       * ========================================
       *
       * 10ms wait
       * +
       * 10ms reveal
       */

      let revealProgress = 0;

      if (
        progress >= 1 &&
        revealStartTimeRef.current !== null
      ) {
        const now =
          performance.now();

        const elapsed =
          now -
          revealStartTimeRef.current;

        if (elapsed > 0) {
          revealProgress =
            Math.max(
              0,
              Math.min(
                1,
                elapsed / 10
              )
            );
        }
      }

      const easedReveal =
        easeOutCubic(
          revealProgress
        );

      /*
       * ========================================
       * 6. FIND CENTER
       * ========================================
       *
       * The red frame starts from
       * the center of the face.
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
       * Distances from the center
       * to each edge of the frame.
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
       * ========================================
       * 7. EXPAND CLIP FROM CENTER
       * ========================================
       */

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
       * ========================================
       * 8. PAGE 2 FRAME
       * ========================================
       */

      targetFrame.style.opacity =
        "1";

      targetFrame.style.clipPath =
        `inset(
          ${clipTop}px
          ${clipRight}px
          ${clipBottom}px
          ${clipLeft}px
          round 15px
        )`;

      targetImage.style.opacity =
        "0";

      sourceImage.style.opacity =
        "0";

      /*
       * ========================================
       * 9. BEFORE FINAL POSITION
       * ========================================
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
      }

      /*
       * ========================================
       * 10. REVEAL FINISHED
       * ========================================
       */

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
      }

      /*
       * ========================================
       * 11. KEEP ANIMATING DURING 250ms
       * ========================================
       */

      if (
        progress >= 1 &&
        revealStartTimeRef.current !== null
      ) {
        requestAnimationFrame(update);
      }
    };

    let animationFrame = 0;

    const requestUpdate = () => {
      cancelAnimationFrame(
        animationFrame
      );

      animationFrame =
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

    update();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      sourceImage.style.opacity = "";
      targetFrame.style.opacity = "";
      targetFrame.style.clipPath = "";
      targetImage.style.opacity = "";
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