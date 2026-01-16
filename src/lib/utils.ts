import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { QrContentType } from '@/types/qr';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(ts: number) {
  return new Date(ts).toLocaleString();
}

export function truncate(value: string, max = 120) {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}...`;
}

export function buildFileName(type: QrContentType, ts = Date.now()) {
  const stamp = new Date(ts).toISOString().replace(/[-:]/g, '').slice(0, 15);
  return `grayvally-qr-${type}-${stamp}`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
