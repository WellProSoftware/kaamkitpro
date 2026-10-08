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
      className="group inline-flex shrink-0 items-center"
    >
      <Image
        src="/kaamkitpro-logo.svg"
        alt="KaamKitPro - Har Digital Kaam, Ek Jagah."
        width={compact ? 180 : 225}
        height={compact ? 48 : 60}
        priority
        className={
          compact
            ? "h-auto w-[150px] sm:w-[180px]"
            : "h-auto w-[190px] sm:w-[225px]"
        }
      />
    </Link>
  );
}
