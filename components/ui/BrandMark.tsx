export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-semibold text-white" aria-label="MG Digital">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-[11px] font-extrabold">
        MG
      </span>
      {!compact && <span className="text-sm">Digital</span>}
    </span>
  );
}
