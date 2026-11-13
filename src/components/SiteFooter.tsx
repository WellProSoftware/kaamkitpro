import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-7 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} KaamKitPro. All rights reserved.
        </p>
        <p className="text-xs font-medium text-slate-600">
          Developed with care by <span className="font-bold text-slate-800">A.K. Dheer</span>
        </p>
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
          <Link href="/about" className="hover:text-blue-700">About</Link>
          <Link href="/contact" className="hover:text-blue-700">Contact</Link>
          <Link href="/privacy-policy" className="hover:text-blue-700">Privacy</Link>
          <Link href="/terms" className="hover:text-blue-700">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
