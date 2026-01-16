type LogoPreset = {
  id: string;
  name: string;
  svg: string;
};

const encodeSvg = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg.replace(/\s+/g, ' '))}`;

const applyColor = (svg: string, color: string) => svg.replace(/\{\{color\}\}/g, color);

export const getLogoPresetDataUrl = (presetId: string, color: string) => {
  const preset = LOGO_PRESETS.find((item) => item.id === presetId);
  if (!preset) return null;
  return encodeSvg(applyColor(preset.svg, color));
};

const globe = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="{{color}}" stroke-width="5">
    <circle cx="32" cy="32" r="22"/>
    <path d="M10 32h44M32 10c7 8 7 36 0 44M32 10c-7 8-7 36 0 44"/>
  </svg>`;

const bolt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="{{color}}">
    <path d="M36 4L14 34h14l-4 26 24-32H34l2-24z"/>
  </svg>`;

const scan = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="{{color}}" stroke-width="6">
    <path d="M12 24v-8h8M44 16h8v8M20 48h-8v-8M52 40v8h-8"/>
  </svg>`;

const ring = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="{{color}}" stroke-width="6">
    <circle cx="32" cy="32" r="18"/>
    <circle cx="32" cy="32" r="6" fill="{{color}}" stroke="none"/>
  </svg>`;

const idCard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="{{color}}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="16" width="48" height="32" rx="6"/>
    <circle cx="24" cy="32" r="6"/>
    <path d="M14 42c2.5-6 17.5-6 20 0"/>
    <path d="M38 28h12"/>
    <path d="M38 36h12"/>
  </svg>`;

export const LOGO_PRESETS: LogoPreset[] = [
  { id: 'globe', name: 'Globe', svg: globe },
  { id: 'scan', name: 'Scan', svg: scan },
  { id: 'bolt', name: 'Bolt', svg: bolt },
  { id: 'ring', name: 'Ring', svg: ring },
  { id: 'id-card', name: 'ID Card', svg: idCard }
];
