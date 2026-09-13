import { useEffect, useRef } from "react";

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (from: number, to: number, t: number) =>
  from + (to - from) * t;

type Geometry = {
  sourceLeft: number;
  sourceTop: number;
  sourceWidth: number;
  sourceHeight: number;
  targetLeft: number;
  targetTop: number;
  targetWidth: number;
  targetHeight: number;
  startScrollY: number;
  endScrollY: number;
};

export default function FaceTransition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sourceFaceRef = useRef<HTMLImageElement>(null);
  const targetPortraitRef = useRef<HTMLImageElement>(null);
  const geometryRef = useRef<Geometry | null>(null);

  useEffect(() => {
    const transition = rootRef.current;
    const transitionSource = sourceFaceRef.current;
    const transitionTarget = targetPortraitRef.current;

    if (!transition || !transitionSource || !transitionTarget) return;

    const sourceImg = document.querySelector(
      ".face-container > img",
    ) as HTMLImageElement | null;

    const sourceContainer = document.querySelector(
      ".face-container",
    ) as HTMLElement | null;

    const landingPage = document.querySelector(
      ".landing-page",
    ) as HTMLElement | null;

    const targetFrame = document.querySelector(
      ".book-face-frame",
    ) as HTMLElement | null;

    const targetImg = document.querySelector(
      ".book-face-frame > img",
    ) as HTMLImageElement | null;

    const bookPage = document.querySelector(
      ".book-of-history-page",
    ) as HTMLElement | null;

    if (
      !sourceImg ||
      !sourceContainer ||
      !landingPage ||
      !targetFrame ||
      !targetImg ||
      !bookPage
    ) {
      return;
    }

    const measure = () => {
      /*
       * Measure both endpoints in DOCUMENT coordinates, then convert each
       * endpoint to the viewport coordinates it has when its page is active.
       * This prevents getBoundingClientRect() from drifting as the user scrolls.
       */
      const currentScrollY = window.scrollY;

      const sourceRect = sourceContainer.getBoundingClientRect();
      const targetRect = targetFrame.getBoundingClientRect();
      const landingRect = landingPage.getBoundingClientRect();
      const bookRect = bookPage.getBoundingClientRect();

      const sourceDocTop = sourceRect.top + currentScrollY;
      const targetDocTop = targetRect.top + currentScrollY;
      const landingDocTop = landingRect.top + currentScrollY;
      const bookDocTop = bookRect.top + currentScrollY;

      geometryRef.current = {
        sourceLeft: sourceRect.left,
        sourceTop: sourceDocTop - landingDocTop,
        sourceWidth: sourceRect.width,
        sourceHeight: sourceRect.height,

        targetLeft: targetRect.left,
        targetTop: targetDocTop - bookDocTop,
        targetWidth: targetRect.width,
        targetHeight: targetRect.height,

        startScrollY: landingDocTop,
        endScrollY: bookDocTop,
      };
    };

    const render = () => {
      const geometry = geometryRef.current;
      if (!geometry) return;

      const distance = Math.max(
        1,
        geometry.endScrollY - geometry.startScrollY,
      );

      const progress = clamp01(
        (window.scrollY - geometry.startScrollY) / distance,
      );

      /*
       * IMPORTANT:
       * progress=0: real landing face is visible.
       * 0<progress<1: fixed clone moves between exact measured boxes.
       * progress=1: real Page 2 portrait/frame is visible.
       */
      if (progress <= 0.001) {
        transition.style.visibility = "hidden";
        sourceImg.style.opacity = "1";
        targetImg.style.opacity = "1";
        return;
      }

      if (progress >= 0.999) {
        transition.style.visibility = "hidden";
        sourceImg.style.opacity = "1";
        targetImg.style.opacity = "1";
        return;
      }

      sourceImg.style.opacity = "0";
      targetImg.style.opacity = "0";
      transition.style.visibility = "visible";

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      transition.style.left = `${lerp(
        geometry.sourceLeft,
        geometry.targetLeft,
        eased,
      )}px`;

      transition.style.top = `${lerp(
        geometry.sourceTop,
        geometry.targetTop,
        eased,
      )}px`;

      transition.style.width = `${lerp(
        geometry.sourceWidth,
        geometry.targetWidth,
        eased,
      )}px`;

      transition.style.height = `${lerp(
        geometry.sourceHeight,
        geometry.targetHeight,
        eased,
      )}px`;

      transition.style.borderRadius = `${lerp(0, 15, eased)}px`;

      /*
       * Use the same center-crop rule for both images.
       * The target portrait gradually replaces the landing face near the end.
       */
      const portraitOpacity = clamp01((progress - 0.62) / 0.30);

      transitionSource.style.opacity = `${1 - portraitOpacity}`;
      transitionTarget.style.opacity = `${portraitOpacity}`;
    };

    const measureAndRender = () => {
      measure();
      render();
    };

    measureAndRender();

    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", measureAndRender);

    return () => {
      window.removeEventListener("scroll", render);
      window.removeEventListener("resize", measureAndRender);

      sourceImg.style.opacity = "1";
      targetImg.style.opacity = "1";
    };
  }, []);

  return (
    <div ref={rootRef} className="face-transition" aria-hidden="true">
      <img
        ref={sourceFaceRef}
        src="/noah_s_portfolio/images/mặt.svg"
        alt=""
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: "100%",
          height: "auto",
          transform: "translateY(-50%)",
          objectFit: "contain",
          opacity: 1,
        }}
      />

      <img
        ref={targetPortraitRef}
        src="/noah_s_portfolio/images/portrait1.svg"
        alt=""
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: "100%",
          height: "auto",
          transform: "translateY(-50%)",
          objectFit: "contain",
          opacity: 0,
        }}
      />
    </div>
  );
}
