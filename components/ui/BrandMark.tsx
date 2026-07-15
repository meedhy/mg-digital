export default function BrandMark({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold transition-colors duration-300 ${light ? "text-[#111116]" : "text-white"}`} aria-label="MG Digital">
      <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-extrabold transition-colors duration-300 ${light ? "border-black/12 bg-black/[0.045]" : "border-white/15 bg-white/[0.07]"}`}>
        MG
      </span>
      {!compact && <span className="text-sm">Digital</span>}
    </span>
  );
}
