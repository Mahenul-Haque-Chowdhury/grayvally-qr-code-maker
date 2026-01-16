type LogoPreset = {
  id: string;
  name: string;
  dataUrl: string;
};

const encodeSvg = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg.replace(/\s+/g, ' '))}`;

const globe = encodeSvg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#111827" stroke-width="5">
    <circle cx="32" cy="32" r="22"/>
    <path d="M10 32h44M32 10c7 8 7 36 0 44M32 10c-7 8-7 36 0 44"/>
  </svg>`
);

const bolt = encodeSvg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#111827">
    <path d="M36 4L14 34h14l-4 26 24-32H34l2-24z"/>
  </svg>`
);

const scan = encodeSvg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#111827" stroke-width="6">
    <path d="M12 24v-8h8M44 16h8v8M20 48h-8v-8M52 40v8h-8"/>
  </svg>`
);

const ring = encodeSvg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#111827" stroke-width="6">
    <circle cx="32" cy="32" r="18"/>
    <circle cx="32" cy="32" r="6" fill="#111827" stroke="none"/>
  </svg>`
);

export const LOGO_PRESETS: LogoPreset[] = [
  { id: 'globe', name: 'Globe', dataUrl: globe },
  { id: 'scan', name: 'Scan', dataUrl: scan },
  { id: 'bolt', name: 'Bolt', dataUrl: bolt },
  { id: 'ring', name: 'Ring', dataUrl: ring }
];
