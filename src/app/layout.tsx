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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://grayvally.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GrayVally QR Code Generator',
    template: '%s · GrayVally QR Studio'
  },
  description: 'Generate beautiful, reliable QR codes with advanced styling, logos, gradients, and exports. Fully local, privacy-first, no tracking.',
  applicationName: 'GrayVally QR Studio',
  keywords: [
    'QR code generator',
    'GrayVally',
    'QR studio',
    'QR code maker',
    'QR styling',
    'QR with logo',
    'QR gradients',
    'privacy-first QR'
  ],
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
    title: 'GrayVally QR Code Generator',
    description: 'Create stunning, scannable QR codes with advanced styling and exports. 100% local and private.',
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
    title: 'GrayVally QR Code Generator',
    description: 'Create stunning, scannable QR codes with advanced styling and exports. 100% local and private.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
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
