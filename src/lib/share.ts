import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { QrState } from '@/types/qr';
import { DEFAULT_STATE } from '@/lib/defaults';

const MAX_SHARE_LENGTH = 1800;
const VERSION = 1;

export function encodeShareState(state: QrState, includeSensitive: boolean) {
  const safeState: QrState = {
    ...state,
    fields: { ...state.fields }
  };

  if (!includeSensitive) {
    safeState.fields.wifiPassword = '';
  }

  const payload = JSON.stringify({ v: VERSION, state: safeState });
  const encoded = compressToEncodedURIComponent(payload);

  if (!encoded || encoded.length > MAX_SHARE_LENGTH) {
    return null;
  }

  return encoded;
}

export function decodeShareState(encoded: string) {
  const decoded = decompressFromEncodedURIComponent(encoded);
  if (!decoded) return null;

  try {
    const parsed = JSON.parse(decoded) as { v: number; state: Partial<QrState> };
    if (!parsed || parsed.v !== VERSION || !parsed.state) return null;

    const incoming = parsed.state;
    return {
      ...DEFAULT_STATE,
      ...incoming,
      fields: { ...DEFAULT_STATE.fields, ...incoming.fields },
      style: {
        ...DEFAULT_STATE.style,
        ...incoming.style,
        gradient: { ...DEFAULT_STATE.style.gradient, ...incoming.style?.gradient },
        logo: { ...DEFAULT_STATE.style.logo, ...incoming.style?.logo },
        frame: { ...DEFAULT_STATE.style.frame, ...incoming.style?.frame }
      }
    } satisfies QrState;
  } catch {
    return null;
  }
}

export function buildShareUrl(encoded: string) {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.searchParams.set('s', encoded);
  return url.toString();
}
