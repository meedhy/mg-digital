import { ElementType, ReactNode } from "react";

type Color =
  | "default"
  | "white"
  | "accent"
  | "sky"
  | "gray"
  | "white/60"
  | "white/50";
type Align = "left" | "center" | "right";

const colorClasses: Record<Color, string> = {
  default: "text-soft-black",
  white: "text-white",
  accent: "text-sky-blue",
  sky: "text-sky-blue",
  gray: "text-gray",
  "white/60": "text-white/60",
  "white/50": "text-white/50",
};

const alignClasses: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

interface TypographyProps {
  children: ReactNode;
  color?: Color;
  align?: Align;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Display({
  children,
  color = "default",
  align = "left",
  size = "lg",
  className = "",
}: TypographyProps) {
  const sizeClasses =
    size === "sm"
      ? "text-display-sm"
      : size === "md"
        ? "text-display-md"
        : "text-display-lg";
  return (
    <h1
      className={`font-display font-extrabold leading-[1.05] ${sizeClasses} ${colorClasses[color]} ${alignClasses[align]} ${className}`}
    >
      {children}
    </h1>
  );
}

export function Heading({
  children,
  color = "default",
  align = "left",
  className = "",
  as: As = "h2",
}: TypographyProps & { as?: ElementType }) {
  return (
    <As
      className={`font-display font-bold leading-tight text-3xl md:text-4xl lg:text-5xl ${colorClasses[color]} ${alignClasses[align]} ${className}`}
    >
      {children}
    </As>
  );
}

export function Handwriting({
  children,
  color = "accent",
  className = "",
}: TypographyProps) {
  return (
    <span className={`font-handwriting ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  );
}

export function Body({
  children,
  color = "default",
  align = "left",
  className = "",
}: TypographyProps) {
  return (
    <p
      className={`font-body text-base leading-[1.65] ${colorClasses[color]} ${alignClasses[align]} ${className}`}
    >
      {children}
    </p>
  );
}

export function Eyebrow({
  children,
  color = "accent",
  className = "",
}: TypographyProps) {
  return (
    <span
      className={`font-body text-xs font-semibold uppercase ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
