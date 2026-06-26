import { ReactNode } from "react";

type BadgeVariant = "default" | "accent" | "success";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-black/5 text-soft-black",
  accent: "bg-sky-blue/15 text-blue-night",
  success: "bg-whatsapp/15 text-whatsapp",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium font-body transition-transform duration-150 hover:-translate-y-0.5 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
