import type { Metadata, Viewport } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Link from 'next/link';
import Script from 'next/script';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display'
});
const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qrcode.grayvally.tech';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Free QR Code Generator with Logo — GrayVally QR Studio',
    template: '%s · GrayVally QR Studio'
  },
  description:
    'Create free custom QR codes with logos, gradients, colors, and frames. Export PNG, SVG, or PDF. No sign-up, no expiry, 100% private — everything runs in your browser.',
  applicationName: 'GrayVally QR Studio',
  keywords: [
    'QR code generator',
    'free QR code generator',
    'QR code maker',
    'QR code with logo',
    'custom QR code',
    'WiFi QR code',
    'vCard QR code',
    'QR code SVG download',
    'QR code no expiry',
    'GrayVally'
  ],
  authors: [{ name: 'GrayVally Software Solutions', url: 'https://www.grayvally.tech/' }],
  creator: 'GrayVally Software Solutions',
  publisher: 'GrayVally Software Solutions',
  category: 'technology',
  formatDetection: {
    telephone: false
  },
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }]
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'GrayVally QR Studio',
    title: 'Free QR Code Generator with Logo — GrayVally QR Studio',
    description:
      'Create free custom QR codes with logos, gradients, colors, and frames. Export PNG, SVG, or PDF. No sign-up, no expiry, 100% private.',
    images: [
      {
        url: '/og.png',
        width: 512,
        height: 512,
        alt: 'GrayVally QR Code Generator'
      }
    ]
  },
  twitter: {
    card: 'summary',
    title: 'Free QR Code Generator with Logo — GrayVally QR Studio',
    description:
      'Create free custom QR codes with logos, gradients, colors, and frames. Export PNG, SVG, or PDF. No sign-up, no expiry, 100% private.',
    images: ['/og.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f8fafc'
};

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GrayVally QR Studio',
  url: siteUrl,
  description:
    'Free QR code generator with custom colors, gradients, logos, and frames. Export PNG, SVG, or PDF. Runs 100% locally in your browser.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires a modern web browser with JavaScript enabled',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  publisher: {
    '@type': 'Organization',
    name: 'GrayVally Software Solutions',
    url: 'https://www.grayvally.tech/'
  },
  featureList: [
    'URL, text, WiFi, email, phone, SMS, and vCard QR codes',
    'Custom colors, gradients, dot and corner shapes',
    'Logo embedding with padding control',
    'Scan-me frames and labels',
    'PNG, SVG, and PDF export',
    'Local, privacy-first generation'
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-RVTLVL7KD8" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
gtag('config', 'G-RVTLVL7KD8');`}
        </Script>
        <div className="relative w-full overflow-x-hidden lg:h-screen lg:flex lg:flex-col lg:overflow-hidden" style={{ overflowX: 'clip' as const }}>
          <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.25),_rgba(37,99,235,0))]" />
          <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,116,144,0.18),_rgba(14,116,144,0))]" />
          <Header />
          <main className="relative flex-1 px-4 pb-16 pt-24 sm:px-6 lg:px-10 lg:pb-6 lg:pt-20 lg:overflow-y-auto overflow-x-hidden">
            {children}
          </main>
          <footer className="px-4 pb-8 text-center text-xs text-slate-500 sm:px-6 lg:px-10">
            <nav aria-label="Footer" className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link href="/" className="hover:text-brand-600">
                QR Generator
              </Link>
              <Link href="/scan" className="hover:text-brand-600">
                How to Scan
              </Link>
              <Link href="/privacy" className="hover:text-brand-600">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-brand-600">
                Terms
              </Link>
            </nav>
            <span>© {new Date().getFullYear()} </span>
            <Link href="https://www.grayvally.tech/" className="font-semibold text-slate-600 hover:text-brand-600">
              GrayVally Software Solutions
            </Link>
            <span>. All rights reserved.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
