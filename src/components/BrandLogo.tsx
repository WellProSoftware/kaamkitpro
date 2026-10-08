import Link from "next/link";

type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="KaamKitPro home"
      className="inline-flex shrink-0 items-center gap-3"
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white ${
          compact
            ? "h-10 w-10 text-2xl"
            : "h-11 w-11 text-3xl sm:h-12 sm:w-12"
        }`}
      >
        K
      </div>

      <div className="flex flex-col leading-none">
        <div
          className={`font-bold tracking-tight ${
            compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
          }`}
        >
          <span className="text-gray-900">KaamKit</span>
          <span className="text-blue-600">Pro</span>
        </div>

        {!compact && (
          <span className="mt-1 hidden text-[10px] text-slate-500 sm:block">
            Har Digital Kaam, Ek Jagah.
          </span>
        )}
      </div>
    </Link>
  );
}
