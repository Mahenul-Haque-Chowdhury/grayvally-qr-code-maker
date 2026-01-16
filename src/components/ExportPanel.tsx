import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import type { QrState } from '@/types/qr';
import { applyFrameToPng, buildQrOptions } from '@/lib/qr';
import { downloadBlob } from '@/lib/utils';
import { IconCopy, IconDownload, IconFilePdf, IconFilePng, IconFileSvg, IconShare, IconZap } from '@/components/Icons';

type Props = {
  payload: string;
  state: QrState;
  valid: boolean;
  filename: string;
  shareUrl: string | null;
  onNotify: (message: string) => void;
};

export default function ExportPanel({
  payload,
  state,
  valid,
  filename,
  shareUrl,
  onNotify
}: Props) {
  const [pngScale, setPngScale] = useState(2);

  const canExport = valid && Boolean(payload);

  const handleDownload = async (format: 'png' | 'svg' | 'pdf') => {
    if (!canExport) {
      onNotify('Generate a valid QR before exporting.');
      return;
    }

    const size = format === 'png' ? state.style.size * pngScale : state.style.size;
    const options = buildQrOptions(state, payload, size);

    const { default: QRCodeStyling } = await import('qr-code-styling');
    const qr = new QRCodeStyling(options);

    if (format === 'pdf') {
      const raw = (await (qr as { getRawData: (type?: string) => Promise<Blob> }).getRawData(
        'png',
      )) as Blob;
      const framed = await applyFrameToPng(raw, state);
      const arrayBuffer = await framed.arrayBuffer();

      const pdfDoc = await PDFDocument.create();
      const image = await pdfDoc.embedPng(arrayBuffer);
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });

      const pdfBytes = await pdfDoc.save();
      const pdfBuffer = new ArrayBuffer(pdfBytes.byteLength);
      new Uint8Array(pdfBuffer).set(pdfBytes);
      downloadBlob(new Blob([pdfBuffer], { type: 'application/pdf' }), `${filename}.pdf`);
    } else if (format === 'svg') {
      if (state.style.frame.style !== 'none') {
        onNotify('Frames export in PNG/PDF only. Exporting SVG without frame.');
      }
      const raw = (await (qr as { getRawData: (type?: string) => Promise<Blob> }).getRawData(
        'svg',
      )) as Blob;
      downloadBlob(raw, `${filename}.svg`);
    } else {
      const raw = (await (qr as { getRawData: (type?: string) => Promise<Blob> }).getRawData(
        'png',
      )) as Blob;
      const framed = await applyFrameToPng(raw, state);
      downloadBlob(framed, `${filename}.png`);
    }

    onNotify(`Downloaded ${format.toUpperCase()} file.`);
  };

  const handleCopyPayload = async () => {
    if (!payload) return;
    await navigator.clipboard.writeText(payload);
    onNotify('Payload copied to clipboard.');
  };

  const handleCopyShare = async () => {
    if (!shareUrl) {
      onNotify('Share link too long. Try reducing data.');
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    onNotify('Share link copied.');
  };

  return (
    <section className="card px-5 py-5 lg:px-4 lg:py-3">
      <div className="flex items-center justify-between">
        <div className="section-header">
          <div className="section-icon bg-gradient-to-br from-emerald-500 to-teal-600 text-white lg:h-9 lg:w-9">
            <IconDownload className="h-5 w-5 lg:h-4 lg:w-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 lg:text-base">Export</h2>
            <p className="text-sm text-slate-500 lg:text-xs">Download in multiple formats</p>
          </div>
        </div>
        <span className="badge badge-brand lg:text-[10px] lg:px-2 lg:py-1">
          <IconZap className="h-3 w-3 lg:h-2.5 lg:w-2.5" />
          High Quality
        </span>
      </div>

      <div className="mt-5 space-y-4 lg:mt-2 lg:space-y-2">
        {/* Primary Download */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-2">
          <button
            type="button"
            className="btn btn-primary group lg:px-4 lg:py-2 lg:text-xs"
            onClick={() => handleDownload('png')}
          >
            <IconFilePng className="h-5 w-5 lg:h-4 lg:w-4 transition-transform group-hover:scale-110" />
            Download PNG
          </button>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 lg:px-2 lg:py-1.5">
            <label className="text-xs font-semibold text-slate-600 lg:text-[11px]">Scale</label>
            <select
              className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer lg:text-[11px]"
              value={pngScale}
              onChange={(event) => setPngScale(Number(event.target.value))}
            >
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={3}>3x</option>
            </select>
          </div>
        </div>

        {/* Secondary Downloads */}
        <div className="flex flex-wrap gap-2">
          <button 
            type="button" 
            className="btn btn-ghost group lg:px-3 lg:py-1.5 lg:text-xs" 
            onClick={() => handleDownload('svg')}
          >
            <IconFileSvg className="h-4 w-4 lg:h-3.5 lg:w-3.5 text-purple-600 transition-transform group-hover:scale-110" />
            SVG
          </button>
          <button 
            type="button" 
            className="btn btn-ghost group lg:px-3 lg:py-1.5 lg:text-xs" 
            onClick={() => handleDownload('pdf')}
          >
            <IconFilePdf className="h-4 w-4 lg:h-3.5 lg:w-3.5 text-red-600 transition-transform group-hover:scale-110" />
            PDF
          </button>
        </div>

        <div className="divider my-3 lg:my-1.5" />

        {/* Copy Actions */}
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-ghost group lg:px-3 lg:py-1.5 lg:text-xs" onClick={handleCopyPayload}>
            <IconCopy className="h-4 w-4 lg:h-3.5 lg:w-3.5 text-slate-500 transition-transform group-hover:scale-110" />
            Copy Payload
          </button>
          <button type="button" className="btn btn-ghost group lg:px-3 lg:py-1.5 lg:text-xs" onClick={handleCopyShare}>
            <IconShare className="h-4 w-4 lg:h-3.5 lg:w-3.5 text-brand-600 transition-transform group-hover:scale-110" />
            Share Link
          </button>
        </div>

        {!shareUrl && (
          <p className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 lg:px-2 lg:py-1.5 lg:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Share link too long. Disable sensitive fields or reduce data length.
          </p>
        )}
      </div>
    </section>
  );
}
