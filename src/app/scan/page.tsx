import type { Metadata } from 'next';
import { IconScan, IconCheckCircle } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'How to Scan QR Codes',
  description:
    'Learn how to scan QR codes on iPhone and Android with your camera app, plus tips for lighting, distance, and print quality for reliable scans.',
  alternates: {
    canonical: '/scan'
  }
};

const TIPS = [
  { text: 'Ensure the code fills 30-50% of the screen for easy focus', icon: '📐' },
  { text: 'Use good lighting and avoid glare', icon: '💡' },
  { text: 'Keep a safe quiet zone around the code when printing', icon: '📄' },
  { text: 'Hold steady for a clean capture', icon: '📱' }
];

export default function ScanPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <section className="card-glow px-4 py-6 sm:px-6 sm:py-8">
        <div className="section-header">
          <div className="section-icon bg-gradient-to-br from-brand-500 to-brand-600 text-white">
            <IconScan className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">How to Scan QR Codes</h1>
            <p className="text-sm text-slate-500">Fast scanning on any device</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-600 leading-relaxed">
          Most smartphones can scan QR codes directly from the camera app. Simply open your camera,
          point it at the code, and tap the prompt that appears.
        </p>
        
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {TIPS.map((tip) => (
            <div 
              key={tip.text} 
              className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 p-4 transition-all duration-200 hover:shadow-md hover:border-slate-200"
            >
              <span className="text-xl">{tip.icon}</span>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200/50 px-4 py-3">
          <IconCheckCircle className="h-5 w-5 text-emerald-600" />
          <p className="text-sm text-emerald-700 font-medium">Pro tip: Use the QR codes generated here for best compatibility!</p>
        </div>
      </section>
    </div>
  );
}
