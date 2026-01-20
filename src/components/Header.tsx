"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  IconScan,
  IconShield,
  IconSparkles,
  IconInfo,
  IconLink,
  IconMenu,
  IconX,
} from '@/components/Icons';
import GrayVallyLogo from '@/GrayVally.png';

export default function Header() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-3 py-3 sm:flex-nowrap sm:gap-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-white shadow-lg shadow-brand-500/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-brand-500/30 group-hover:scale-105">
            <Image src={GrayVallyLogo} alt="GrayVally logo" className="h-7 w-7 object-contain" priority />
            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 shadow-sm">
              <IconSparkles className="h-2.5 w-2.5 text-amber-900" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 tracking-tight">GrayVally</span>
            <span className="text-[11px] font-medium text-slate-500">QR Studio</span>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          {/* Mobile: show icons in one row and hamburger */}
          <div className="sm:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setOpen((s) => !s)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
            >
              {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center justify-end gap-1.5 sm:flex sm:gap-2">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-50 to-brand-100/50 border border-brand-200/50 px-3 py-2 text-xs font-semibold text-brand-700 transition-all duration-200 hover:shadow-md hover:shadow-brand-500/10 sm:px-3.5"
            >
              <IconSparkles className="h-4 w-4 text-brand-600 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Generator</span>
            </Link>
            <Link
              href="/scan"
              className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-md sm:px-3.5"
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
            <Link
              href="/terms"
              className="group hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-md sm:flex"
            >
              <IconInfo className="h-4 w-4 text-slate-500 transition-transform group-hover:scale-110" />
              <span>Terms</span>
            </Link>

            <a
              href="https://grayvally.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-md sm:flex"
            >
              <IconLink className="h-4 w-4 text-slate-500 transition-transform group-hover:scale-110" />
              <span>GrayVally Website</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-40 border-b border-slate-200 bg-white shadow-sm sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-50">
              <IconSparkles className="h-5 w-5 text-brand-600" />
              <span className="font-medium text-slate-800">Generator</span>
            </Link>
            <Link href="/scan" onClick={closeMenu} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-50">
              <IconScan className="h-5 w-5 text-slate-600" />
              <span className="font-medium text-slate-800">Scan</span>
            </Link>
            <Link href="/privacy" onClick={closeMenu} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-50">
              <IconShield className="h-5 w-5 text-emerald-500" />
              <span className="font-medium text-slate-800">Privacy</span>
            </Link>
            <Link href="/terms" onClick={closeMenu} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-50">
              <IconInfo className="h-5 w-5 text-slate-600" />
              <span className="font-medium text-slate-800">Terms</span>
            </Link>
            <a href="https://grayvally.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-50">
              <IconLink className="h-5 w-5 text-slate-600" />
              <span className="font-medium text-slate-800">GrayVally Website</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
