import Link from 'next/link';
import { IconQr, IconScan, IconShield, IconSparkles } from '@/components/Icons';

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-slate-900 text-white shadow-lg shadow-brand-500/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-brand-500/40 group-hover:scale-105">
            <IconQr className="h-5 w-5" />
            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 shadow-sm">
              <IconSparkles className="h-2.5 w-2.5 text-amber-900" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 tracking-tight">GrayVally</span>
            <span className="text-[11px] font-medium text-slate-500">QR Studio</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-50 to-brand-100/50 border border-brand-200/50 px-3.5 py-2 text-xs font-semibold text-brand-700 transition-all duration-200 hover:shadow-md hover:shadow-brand-500/10"
          >
            <IconSparkles className="h-4 w-4 text-brand-600 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Generator</span>
          </Link>
          <Link
            href="/scan"
            className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-md"
          >
            <IconScan className="h-4 w-4 text-slate-500 transition-transform group-hover:scale-110 group-hover:text-brand-600" />
            <span className="hidden sm:inline">Scan</span>
          </Link>
          <Link
            href="/privacy"
            className="group hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-md sm:flex"
          >
            <IconShield className="h-4 w-4 text-emerald-500 transition-transform group-hover:scale-110" />
            <span>Privacy</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
