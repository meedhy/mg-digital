import { ReactNode } from "react";

export default function SectionHeading({
  label,
  children,
  text,
  className = "",
  light = false,
}: {
  label: string;
  children: ReactNode;
  text?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={className}>
      <p className={light ? "text-[0.72rem] font-bold uppercase leading-none text-black/42" : "section-label"}>{label}</p>
      <h2 className="section-heading mt-5">{children}</h2>
      {text && <p className={`mt-6 max-w-2xl text-base leading-7 md:text-lg ${light ? "text-black/54" : "text-white/60"}`}>{text}</p>}
    </div>
  );
}
