import { ReactNode } from "react";

export default function SectionHeading({
  label,
  children,
  text,
  className = "",
}: {
  label: string;
  children: ReactNode;
  text?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="section-label">{label}</p>
      <h2 className="section-heading mt-5">{children}</h2>
      {text && <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">{text}</p>}
    </div>
  );
}
