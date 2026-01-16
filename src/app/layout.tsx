import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display'
});
const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'GrayVally QR Code Generator',
  description: 'Generate beautiful, reliable QR codes with GrayVally Software Solutions.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="relative lg:h-screen lg:flex lg:flex-col lg:overflow-hidden">
          <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.25),_rgba(37,99,235,0))]" />
          <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,116,144,0.18),_rgba(14,116,144,0))]" />
          <Header />
          <main className="relative flex-1 px-4 pb-16 pt-24 sm:px-6 lg:px-10 lg:pb-6 lg:pt-20 lg:overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
