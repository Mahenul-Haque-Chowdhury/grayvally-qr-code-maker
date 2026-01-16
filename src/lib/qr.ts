import type { Options } from 'qr-code-styling';
import type { QrState } from '@/types/qr';

export function buildQrOptions(state: QrState, payload: string, sizeOverride?: number): Options {
  const size = sizeOverride ?? state.style.size;
  const useGradient = state.style.gradient.enabled;
  const rotation = (state.style.gradient.rotation * Math.PI) / 180;
  const dotsType = state.style.dotsStyle ?? (state.style.rounded ? 'rounded' : 'square');
  const cornersSquareType =
    state.style.cornersSquareStyle ?? (state.style.rounded ? 'extra-rounded' : 'square');
  const cornersDotType = state.style.cornersDotStyle ?? (state.style.rounded ? 'dot' : 'square');

  const dotsColor = useGradient ? state.style.gradient.color1 : state.style.fgColor;
  const cornerColor = state.style.fgColor;
  const gradient = useGradient
    ? {
        type: 'linear' as const,
        rotation,
        colorStops: [
          { offset: 0, color: state.style.gradient.color1 },
          { offset: 1, color: state.style.gradient.color2 }
        ]
      }
    : undefined;

  return {
    width: size,
    height: size,
    type: 'canvas',
    data: payload || ' ',
    margin: state.style.margin,
    qrOptions: {
      errorCorrectionLevel: state.style.ecc
    },
    dotsOptions: {
      color: dotsColor,
      type: dotsType,
      gradient
    },
    cornersSquareOptions: {
      color: cornerColor,
      type: cornersSquareType
    },
    cornersDotOptions: {
      color: cornerColor,
      type: cornersDotType
    },
    backgroundOptions: {
      color: state.style.backgroundTransparent ? 'transparent' : state.style.bgColor
    },
    image: state.style.logo.enabled
      ? state.style.logo.paddedDataUrl || state.style.logo.dataUrl || undefined
      : undefined,
    imageOptions: {
      margin: state.style.logo.paddingEnabled ? state.style.logo.padding : 0,
      imageSize: state.style.logo.sizeRatio,
      hideBackgroundDots: true
    }
  };
}

export async function createPaddedLogoDataUrl(
  dataUrl: string,
  paddingPx: number,
  background = '#ffffff'
) {
  const img = new Image();
  img.src = dataUrl;
  await img.decode();

  const maxSide = Math.max(img.width, img.height);
  const size = maxSide + paddingPx * 2;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return dataUrl;

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, size, size);

  const x = (size - img.width) / 2;
  const y = (size - img.height) / 2;
  ctx.drawImage(img, x, y);

  return canvas.toDataURL('image/png');
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const safeRadius = Math.max(0, Math.min(radius, Math.min(width, height) / 2));
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.arcTo(x + width, y, x + width, y + height, safeRadius);
  ctx.arcTo(x + width, y + height, x, y + height, safeRadius);
  ctx.arcTo(x, y + height, x, y, safeRadius);
  ctx.arcTo(x, y, x + width, y, safeRadius);
  ctx.closePath();
}

export async function applyFrameToPng(pngBlob: Blob, state: QrState) {
  const frame = state.style.frame;
  if (!frame || frame.style === 'none') {
    return pngBlob;
  }

  const bitmap = await createImageBitmap(pngBlob);
  const qrSize = bitmap.width;
  const padding = Math.max(0, frame.padding);
  const labelEnabled = frame.style === 'scan-top' || frame.style === 'scan-bottom';
  const labelHeight = labelEnabled ? Math.max(36, Math.round(qrSize * 0.16)) : 0;
  const canvas = document.createElement('canvas');
  canvas.width = qrSize + padding * 2;
  canvas.height = qrSize + padding * 2 + labelHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return pngBlob;

  ctx.fillStyle = frame.backgroundColor || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (frame.style === 'outline' || frame.style === 'soft' || labelEnabled) {
    ctx.strokeStyle = frame.borderColor || '#e2e8f0';
    ctx.lineWidth = 2;
    roundedRect(ctx, 1, 1, canvas.width - 2, canvas.height - 2, frame.radius || 0);
    ctx.stroke();
  }

  const topOffset = frame.style === 'scan-top' ? labelHeight : 0;
  ctx.drawImage(bitmap, padding, padding + topOffset, qrSize, qrSize);

  if (labelEnabled) {
    const labelY = frame.style === 'scan-top' ? 0 : canvas.height - labelHeight;
    ctx.fillStyle = frame.labelBg || '#111827';
    roundedRect(ctx, 8, labelY + 8, canvas.width - 16, labelHeight - 16, 16);
    ctx.fill();

    ctx.fillStyle = frame.labelColor || '#ffffff';
    ctx.font = `600 ${Math.round(labelHeight * 0.38)}px 'Manrope', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(frame.label || 'SCAN ME', canvas.width / 2, labelY + labelHeight / 2);
  }

  return await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => resolve(blob ?? pngBlob), 'image/png', 1);
  });
}
