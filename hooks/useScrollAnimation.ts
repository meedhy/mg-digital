import { RefObject, useEffect, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation(
  ref: RefObject<Element | null>,
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          element.classList.add("animate-in");
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
          element.classList.remove("animate-in");
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return isVisible;
}
