"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.innerWidth > 768;

    if (!isDesktop || prefersReduced) return;

    cursor.style.display = "block";

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) {
        cursor.classList.add("cursor-hover");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) {
        cursor.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 hidden w-3 h-3 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-200 ease-out [&.cursor-hover]:w-8 [&.cursor-hover]:h-8 [&.cursor-hover]:opacity-30"
      style={{ backgroundColor: "#4DA6FF" }}
    />
  );
}
