type AdSlotProps = {
  label?: string;
  className?: string;
};

export default function AdSlot({
  label = "Advertisement",
  className = "",
}: AdSlotProps) {
  return (
    <div
      className={`my-8 flex min-h-[120px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 ${className}`}
      aria-label={label}
    >
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Ad space
        </p>
      </div>
    </div>
  );
}
