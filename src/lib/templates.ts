import type { QrStyle } from '@/types/qr';

export type Template = {
  id: string;
  name: string;
  description: string;
  style: Partial<QrStyle>;
};

export const TEMPLATES: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Crisp black-on-white QR for maximum compatibility.',
    style: {
      fgColor: '#111827',
      bgColor: '#ffffff',
      rounded: false,
      dotsStyle: 'square',
      cornersSquareStyle: 'square',
      cornersDotStyle: 'square',
      gradient: { enabled: false, color1: '#111827', color2: '#111827', rotation: 0 }
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'High contrast light dots on dark slate.',
    style: {
      fgColor: '#f8fafc',
      bgColor: '#0f172a',
      rounded: false,
      dotsStyle: 'square',
      cornersSquareStyle: 'square',
      cornersDotStyle: 'square',
      gradient: { enabled: false, color1: '#f8fafc', color2: '#f8fafc', rotation: 0 }
    }
  },
  {
    id: 'brand-blue',
    name: 'Brand Blue',
    description: 'GrayVally inspired blue with medium contrast.',
    style: {
      fgColor: '#1d4ed8',
      bgColor: '#f8fafc',
      rounded: false,
      dotsStyle: 'square',
      cornersSquareStyle: 'square',
      cornersDotStyle: 'square',
      gradient: { enabled: false, color1: '#1d4ed8', color2: '#1d4ed8', rotation: 0 }
    }
  },
  {
    id: 'gradient-neon',
    name: 'Gradient Neon',
    description: 'Bold linear gradient for digital showcases.',
    style: {
      ecc: 'H',
      margin: 12,
      fgColor: '#0f766e',
      bgColor: '#ffffff',
      rounded: true,
      dotsStyle: 'rounded',
      cornersSquareStyle: 'extra-rounded',
      cornersDotStyle: 'dot',
      gradient: { enabled: true, color1: '#00f5a0', color2: '#00d9f5', rotation: 45 }
    }
  },
  {
    id: 'rounded-soft',
    name: 'Rounded Soft',
    description: 'Rounded modules with calm steel tones.',
    style: {
      fgColor: '#334155',
      bgColor: '#f8fafc',
      rounded: true,
      dotsStyle: 'rounded',
      cornersSquareStyle: 'extra-rounded',
      cornersDotStyle: 'dot',
      gradient: { enabled: false, color1: '#334155', color2: '#334155', rotation: 0 }
    }
  },
  {
    id: 'logo-ready',
    name: 'Logo Ready',
    description: 'Higher ECC and margin for logo overlays.',
    style: {
      ecc: 'H',
      margin: 12,
      rounded: true,
      dotsStyle: 'rounded',
      cornersSquareStyle: 'extra-rounded',
      cornersDotStyle: 'dot',
      logo: {
        enabled: true,
        dataUrl: null,
        paddedDataUrl: null,
        sizeRatio: 0.22,
        padding: 12,
        paddingEnabled: true,
        color: '#111827',
        presetId: null
      }
    }
  }
];
