import { RefObject, useEffect, useState } from "react";

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  ratio: number = 0.3
) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      setOffsetY(window.scrollY * ratio);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ratio]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = `translateY(${offsetY}px)`;
  }, [ref, offsetY]);

  return offsetY;
}
