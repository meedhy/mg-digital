import { ReactNode } from "react";

type ButtonVariant = "primary" | "whatsapp" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

const baseClasses =
  "relative inline-flex items-center justify-center font-body font-medium rounded-md transition-all duration-200 cursor-pointer";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-night text-white overflow-hidden isolate before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:bg-[length:200%_100%] before:bg-[position:0%_50%] before:opacity-0 hover:before:opacity-100 hover:before:[animation:shimmer_1.2s_linear_infinite] before:-z-10",
  whatsapp:
    "bg-whatsapp text-white hover:[animation:shake_400ms_ease-in-out]",
  ghost:
    "text-blue-night bg-transparent relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-blue-night after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100",
};

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.45 5.12L2 22l5.13-1.5a9.9 9.9 0 0 0 4.91 1.3h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.07c-.24.68-1.42 1.3-1.95 1.34-.5.05-.97.24-3.27-.68-2.77-1.1-4.55-3.9-4.7-4.08-.13-.18-1.13-1.5-1.13-2.86 0-1.35.71-2.01.96-2.29.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.81 2 .88 2.15.07.15.12.32.02.5-.1.18-.16.3-.31.46-.16.16-.32.36-.46.49-.15.14-.31.29-.13.6.18.31.8 1.32 1.72 2.14 1.18 1.06 2.17 1.39 2.49 1.55.32.15.5.13.69-.07.18-.21.79-.91 1-1.22.21-.31.42-.26.7-.16.27.1 1.74.82 2.04.97.3.15.5.23.57.36.08.13.08.74-.16 1.42Z" />
    </svg>
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  onClick,
  children,
  className = "",
}: ButtonProps) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {variant === "whatsapp" && <WhatsAppIcon />}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
