import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({
  compact = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="KaamKitPro home"
      className="group inline-flex shrink-0 items-center gap-3"
    >
      <Image
        src="/kaamkitpro-icon.svg"
        alt="KaamKitPro"
        width={compact ? 42 : 50}
        height={compact ? 42 : 50}
        priority
        className={
          compact
            ? "h-10 w-10 sm:h-[42px] sm:w-[42px]"
            : "h-11 w-11 sm:h-[50px] sm:w-[50px]"
        }
      />

      <div className="flex flex-col leading-none">
        <span
          className={
            compact
              ? "text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl"
              : "text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
          }
        >
          KaamKit<span className="text-blue-600">Pro</span>
        </span>

        {!compact && (
          <span className="mt-1 hidden text-[10px] font-medium tracking-wide text-slate-500 sm:block">
            Har Digital Kaam, Ek Jagah.
          </span>
        )}
      </div>
    </Link>
  );
}
