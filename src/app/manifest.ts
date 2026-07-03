import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GrayVally QR Studio — Free QR Code Generator',
    short_name: 'QR Studio',
    description:
      'Create free custom QR codes with logos, gradients, colors, and frames. Export PNG, SVG, or PDF — 100% private, in your browser.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#f8fafc',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  };
}
