"use client";

import { CSSProperties, MouseEvent, ReactNode, useRef } from "react";

interface CardProps {
  variant?: "default" | "featured";
  badge?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Card({
  variant = "default",
  badge,
  children,
  className = "",
  style,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={style}
      className={`group relative overflow-hidden rounded-lg bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${
        variant === "featured"
          ? "border-2 border-sky-blue shadow-blue-md"
          : "border border-black/5 shadow-blue-sm"
      } ${className}`}
    >
      {badge && (
        <span className="absolute top-4 right-4 rounded-full bg-sky-blue px-3 py-1 text-xs font-medium text-white">
          {badge}
        </span>
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(77,166,255,0.12), transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
