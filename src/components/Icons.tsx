type IconProps = {
  className?: string;
};

export function IconQr({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 6v-6h6v6h-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M7 7h1.5v1.5H7V7Zm10 0h1.5v1.5H17V7ZM7 17h1.5v1.5H7V17Z" fill="currentColor" />
    </svg>
  );
}

export function IconScan({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheckCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16l-6.4 5.2 2.4-7.2-6-4.8h7.6L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStarFilled({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16l-6.4 5.2 2.4-7.2-6-4.8h7.6L12 2z" fill="currentColor" />
    </svg>
  );
}

export function IconImage({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconFilePng({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 14h.5a1 1 0 011 1v0a1 1 0 01-1 1H8v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 14v4m0-4l1.5 2 1.5-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFileSvg({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 15a1 1 0 011-1h0a1 1 0 011 1v0a1 1 0 01-1 1h0a1 1 0 00-1 1v0a1 1 0 001 1h0a1 1 0 001-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13 14l1 4 1-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFilePdf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 14h1a1 1 0 011 1v0a1 1 0 01-1 1H7v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 14h1a1.5 1.5 0 010 3h0a1.5 1.5 0 010-3H11v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M16 14v4h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconRefresh({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 21v-5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSliders({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconZap({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconEye({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconShare({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGradient({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="7" r="2" fill="currentColor" />
      <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconFrame({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconSparkles({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l1.2 3.6L17 7.8l-3.6 1.2L12 12l-1.2-3-3.6-1.2 3.6-1.2L12 3Z"
        fill="currentColor"
      />
      <path
        d="M18 13l.8 2.4L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.6L18 13Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.4-2.9 8.4-7 10-4.1-1.6-7-5.6-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconDownload({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 4v10m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 16v3h14v-3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconPalette({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4a8 8 0 100 16h3a3 3 0 000-6h-1a2 2 0 01-2-2V8a4 4 0 000-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="10.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="6.5" cy="13.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconHistory({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 12a7 7 0 1112.3 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M5 8v4h4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconTemplate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h14v6H5v-6Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconLink({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M10 14l4-4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7 17a4 4 0 010-6l3-3a4 4 0 016 6l-1 1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function IconCopy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 9h10v10H9V9Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 5h10v10H5V5Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconInfo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 10v6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconWifi({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 9c4.4-4 11.6-4 16 0" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 12c2.7-2.5 7.3-2.5 10 0" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 15c1-.8 3-.8 4 0" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7h16v10H4V7Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 4h4l2 5-2.5 1.5A12 12 0 0014.5 17L16 14l5 2v4c-8 1-16-7-14-16Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 6h14v9H9l-4 4V6Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconContact({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconX({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMinus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
