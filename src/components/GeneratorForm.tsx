import type { ChangeEvent, ReactNode } from 'react';
import type {
  QrContentType,
  QrCornerDotStyle,
  QrCornerSquareStyle,
  QrDotStyle,
  QrFrameStyle,
  QrState,
  WifiEncryption
} from '@/types/qr';
import { cn } from '@/lib/utils';
import { LOGO_PRESETS, getLogoPresetDataUrl } from '@/lib/logoPresets';
import {
  IconChat,
  IconContact,
  IconLink,
  IconMail,
  IconPalette,
  IconPhone,
  IconQr,
  IconRefresh,
  IconSliders,
  IconWifi,
  IconGradient,
  IconFrame,
  IconImage,
  IconLock
} from '@/components/Icons';

type Props = {
  state: QrState;
  errors: Record<string, string>;
  onStateChange: (next: QrState) => void;
  onGenerate: () => void;
  onReset: () => void;
};

const TABS: Array<{ id: QrContentType; label: string; icon: ReactNode }> = [
  { id: 'text', label: 'Text / URL', icon: <IconLink className="h-4 w-4" /> },
  { id: 'wifi', label: 'WiFi', icon: <IconWifi className="h-4 w-4" /> },
  { id: 'email', label: 'Email', icon: <IconMail className="h-4 w-4" /> },
  { id: 'phone', label: 'Phone', icon: <IconPhone className="h-4 w-4" /> },
  { id: 'sms', label: 'SMS', icon: <IconChat className="h-4 w-4" /> },
  { id: 'vcard', label: 'vCard', icon: <IconContact className="h-4 w-4" /> }
];

const encryptionOptions: WifiEncryption[] = ['WPA', 'WEP', 'nopass'];

const DOT_OPTIONS: Array<{ id: QrDotStyle; label: string; radius: string }> = [
  { id: 'square', label: 'Square', radius: 'rounded-[2px]' },
  { id: 'rounded', label: 'Rounded', radius: 'rounded-[5px]' },
  { id: 'dots', label: 'Dots', radius: 'rounded-full' },
  { id: 'classy', label: 'Classy', radius: 'rounded-[2px]' },
  { id: 'classy-rounded', label: 'Classy soft', radius: 'rounded-[6px]' },
  { id: 'extra-rounded', label: 'Extra', radius: 'rounded-[8px]' }
];

const CORNER_SQUARE_OPTIONS: Array<{ id: QrCornerSquareStyle; label: string; radius: string }> = [
  { id: 'square', label: 'Square', radius: 'rounded-[2px]' },
  { id: 'extra-rounded', label: 'Rounded', radius: 'rounded-[8px]' },
  { id: 'dot', label: 'Dot', radius: 'rounded-full' }
];

const CORNER_DOT_OPTIONS: Array<{ id: QrCornerDotStyle; label: string; radius: string }> = [
  { id: 'square', label: 'Square', radius: 'rounded-[2px]' },
  { id: 'dot', label: 'Dot', radius: 'rounded-full' }
];

const FRAME_OPTIONS: Array<{ id: QrFrameStyle; label: string; hint: string }> = [
  { id: 'none', label: 'No frame', hint: 'Clean edges' },
  { id: 'outline', label: 'Outline', hint: 'Classic border' },
  { id: 'soft', label: 'Soft card', hint: 'Rounded panel' },
  { id: 'scan-top', label: 'Scan top', hint: 'CTA label' },
  { id: 'scan-bottom', label: 'Scan bottom', hint: 'CTA label' }
];

export default function GeneratorForm({
  state,
  errors,
  onStateChange,
  onGenerate,
  onReset
}: Props) {
  const dotsStyle = state.style.dotsStyle ?? (state.style.rounded ? 'rounded' : 'square');
  const cornersSquareStyle =
    state.style.cornersSquareStyle ?? (state.style.rounded ? 'extra-rounded' : 'square');
  const cornersDotStyle =
    state.style.cornersDotStyle ?? (state.style.rounded ? 'dot' : 'square');
  const hasCustomLogo =
    Boolean(state.style.logo.enabled && state.style.logo.dataUrl) && !state.style.logo.presetId;
  const defaultLogoColor = '#111827';

  const updateField = (key: keyof QrState['fields'], value: string | boolean) => {
    onStateChange({
      ...state,
      fields: {
        ...state.fields,
        [key]: value
      }
    });
  };

  const updateStyle = (key: keyof QrState['style'], value: unknown) => {
    onStateChange({
      ...state,
      style: {
        ...state.style,
        [key]: value
      }
    });
  };

  const updateLogo = (key: keyof QrState['style']['logo'], value: unknown) => {
    onStateChange({
      ...state,
      style: {
        ...state.style,
        logo: {
          ...state.style.logo,
          [key]: value
        }
      }
    });
  };

  const updateFrame = (key: keyof QrState['style']['frame'], value: unknown) => {
    onStateChange({
      ...state,
      style: {
        ...state.style,
        frame: {
          ...state.style.frame,
          [key]: value
        }
      }
    });
  };

  const handleLogoPreset = (presetId: string | null) => {
    if (!presetId) {
      onStateChange({
        ...state,
        style: {
          ...state.style,
          logo: {
            ...state.style.logo,
            enabled: false,
            dataUrl: null,
            paddedDataUrl: null,
            presetId: null
          }
        }
      });
      return;
    }

    const color = state.style.logo.color || defaultLogoColor;
    const dataUrl = getLogoPresetDataUrl(presetId, color);
    if (!dataUrl) return;

    onStateChange({
      ...state,
      style: {
        ...state.style,
        logo: {
          ...state.style.logo,
          enabled: true,
          dataUrl,
          paddedDataUrl: null,
          presetId
        }
      }
    });
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onStateChange({
        ...state,
        style: {
          ...state.style,
          logo: {
            ...state.style.logo,
            enabled: true,
            dataUrl: String(reader.result),
            paddedDataUrl: null,
            presetId: null
          }
        }
      });
    };
    reader.readAsDataURL(file);
    
    // Reset input to allow re-uploading the same file
    event.target.value = '';
  };

  return (
    <section className="card-glow px-4 py-5 sm:px-6 sm:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="section-header">
          <div className="section-icon-brand">
            <IconQr className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Generator</h2>
            <p className="text-sm text-slate-500">Build your QR payload and style</p>
          </div>
        </div>
        <button type="button" className="btn btn-ghost group" onClick={onReset}>
          <IconRefresh className="h-4 w-4 text-slate-500 group-hover:rotate-180 transition-transform duration-300" />
          Reset
        </button>
      </div>

      <div className="mt-6">
        <div role="tablist" className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={state.type === tab.id}
              className={cn(
                'tab-pill group',
                state.type === tab.id
                  ? 'tab-pill-active'
                  : 'tab-pill-inactive',
              )}
              onClick={() => onStateChange({ ...state, type: tab.id })}
            >
              <span className={cn(
                'transition-transform group-hover:scale-110',
                state.type === tab.id ? 'text-white' : 'text-slate-500'
              )}>
                {tab.icon}
              </span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4">
          {state.type === 'text' && (
            <div>
              <label className="label">Text or URL</label>
              <textarea
                rows={3}
                className="input"
                value={state.fields.text}
                onChange={(event) => updateField('text', event.target.value)}
                placeholder="https://grayvally.com"
                aria-label="Text or URL"
              />
              {errors.text && <p className="mt-1 text-xs text-red-500">{errors.text}</p>}
            </div>
          )}

          {state.type === 'wifi' && (
            <>
              <div>
                <label className="label">SSID</label>
                <input
                  className="input"
                  value={state.fields.wifiSsid}
                  onChange={(event) => updateField('wifiSsid', event.target.value)}
                  aria-label="WiFi SSID"
                />
                {errors.wifiSsid && (
                  <p className="mt-1 text-xs text-red-500">{errors.wifiSsid}</p>
                )}
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  value={state.fields.wifiPassword}
                  onChange={(event) => updateField('wifiPassword', event.target.value)}
                  aria-label="WiFi password"
                />
                {errors.wifiPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.wifiPassword}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <label className="label">Encryption</label>
                <select
                  className="input"
                  value={state.fields.wifiEncryption}
                  onChange={(event) =>
                    updateField('wifiEncryption', event.target.value as WifiEncryption)
                  }
                  aria-label="WiFi encryption"
                >
                  {encryptionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={state.fields.wifiHidden}
                  onChange={(event) => updateField('wifiHidden', event.target.checked)}
                />
                Hidden network
              </label>
            </>
          )}

          {state.type === 'email' && (
            <>
              <div>
                <label className="label">To</label>
                <input
                  className="input"
                  value={state.fields.emailTo}
                  onChange={(event) => updateField('emailTo', event.target.value)}
                  aria-label="Email to"
                />
                {errors.emailTo && (
                  <p className="mt-1 text-xs text-red-500">{errors.emailTo}</p>
                )}
              </div>
              <div>
                <label className="label">Subject</label>
                <input
                  className="input"
                  value={state.fields.emailSubject}
                  onChange={(event) => updateField('emailSubject', event.target.value)}
                />
              </div>
              <div>
                <label className="label">Body</label>
                <textarea
                  rows={3}
                  className="input"
                  value={state.fields.emailBody}
                  onChange={(event) => updateField('emailBody', event.target.value)}
                />
              </div>
            </>
          )}

          {state.type === 'phone' && (
            <div>
              <label className="label">Phone number</label>
              <input
                className="input"
                value={state.fields.phoneNumber}
                onChange={(event) => updateField('phoneNumber', event.target.value)}
                aria-label="Phone number"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          )}

          {state.type === 'sms' && (
            <>
              <div>
                <label className="label">Number</label>
                <input
                  className="input"
                  value={state.fields.smsNumber}
                  onChange={(event) => updateField('smsNumber', event.target.value)}
                />
                {errors.smsNumber && (
                  <p className="mt-1 text-xs text-red-500">{errors.smsNumber}</p>
                )}
              </div>
              <div>
                <label className="label">Message</label>
                <textarea
                  rows={3}
                  className="input"
                  value={state.fields.smsMessage}
                  onChange={(event) => updateField('smsMessage', event.target.value)}
                />
              </div>
            </>
          )}

          {state.type === 'vcard' && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">First name</label>
                  <input
                    className="input"
                    value={state.fields.vcardFirstName}
                    onChange={(event) => updateField('vcardFirstName', event.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Last name</label>
                  <input
                    className="input"
                    value={state.fields.vcardLastName}
                    onChange={(event) => updateField('vcardLastName', event.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="label">Organization</label>
                <input
                  className="input"
                  value={state.fields.vcardOrg}
                  onChange={(event) => updateField('vcardOrg', event.target.value)}
                />
              </div>
              <div>
                <label className="label">Title</label>
                <input
                  className="input"
                  value={state.fields.vcardTitle}
                  onChange={(event) => updateField('vcardTitle', event.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Phone</label>
                  <input
                    className="input"
                    value={state.fields.vcardPhone}
                    onChange={(event) => updateField('vcardPhone', event.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    className="input"
                    value={state.fields.vcardEmail}
                    onChange={(event) => updateField('vcardEmail', event.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="label">Website</label>
                <input
                  className="input"
                  value={state.fields.vcardWebsite}
                  onChange={(event) => updateField('vcardWebsite', event.target.value)}
                />
              </div>
              <div>
                <label className="label">Address</label>
                <textarea
                  rows={2}
                  className="input"
                  value={state.fields.vcardAddress}
                  onChange={(event) => updateField('vcardAddress', event.target.value)}
                />
              </div>
              {errors.vcard && <p className="text-xs text-red-500">{errors.vcard}</p>}
            </>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <IconPalette className="h-4 w-4 text-slate-600" />
            Core settings
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between">
                <label className="label" htmlFor="qr-size">
                  Size (px)
                </label>
                <span className="badge bg-slate-100 text-slate-700">{state.style.size}px</span>
              </div>
              <input
                className="mt-2 w-full accent-brand-600"
                type="range"
                min={128}
                max={1024}
                step={8}
                id="qr-size"
                value={state.style.size}
                onChange={(event) =>
                  updateStyle('size', Number(event.target.value || 0))
                }
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="label">Margin (quiet zone)</label>
                <span className="badge bg-slate-100 text-slate-700">{state.style.margin}px</span>
              </div>
              <input
                className="mt-2 w-full accent-brand-600"
                type="range"
                min={0}
                max={32}
                step={1}
                value={state.style.margin}
                onChange={(event) =>
                  updateStyle('margin', Number(event.target.value || 0))
                }
              />
            </div>
            <div>
              <label className="label">Error correction</label>
              <select
                className="input"
                value={state.style.ecc}
                onChange={(event) =>
                  updateStyle('ecc', event.target.value as QrState['style']['ecc'])
                }
              >
                {['L', 'M', 'Q', 'H'].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <IconPalette className="h-4 w-4 text-slate-600" />
            Colors
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Foreground</label>
              <div className="color-field">
                <input className="color-value" readOnly value={state.style.fgColor} />
                <input
                  className="color-swatch-input"
                  type="color"
                  value={state.style.fgColor}
                  onChange={(event) => updateStyle('fgColor', event.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="label">Background</label>
              <div className="color-field">
                <input
                  className="color-value"
                  readOnly
                  value={state.style.backgroundTransparent ? 'Transparent' : state.style.bgColor}
                />
                <input
                  className="color-swatch-input"
                  type="color"
                  disabled={state.style.backgroundTransparent}
                  value={state.style.bgColor}
                  onChange={(event) => updateStyle('bgColor', event.target.value)}
                />
              </div>
              <label className="mt-2 inline-flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={state.style.backgroundTransparent}
                  onChange={(event) =>
                    updateStyle('backgroundTransparent', event.target.checked)
                  }
                />
                Transparent background (PNG/SVG)
              </label>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={state.style.gradient.enabled}
              onChange={(event) =>
                updateStyle('gradient', {
                  ...state.style.gradient,
                  enabled: event.target.checked
                })
              }
            />
            <span className="text-sm text-slate-600">Enable linear gradient</span>
          </div>

          {state.style.gradient.enabled && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label className="label">Gradient color 1</label>
                <div className="color-field">
                  <input
                    className="color-value"
                    readOnly
                    value={state.style.gradient.color1}
                  />
                  <input
                    className="color-swatch-input"
                    type="color"
                    value={state.style.gradient.color1}
                    onChange={(event) =>
                      updateStyle('gradient', {
                        ...state.style.gradient,
                        color1: event.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="label">Gradient color 2</label>
                <div className="color-field">
                  <input
                    className="color-value"
                    readOnly
                    value={state.style.gradient.color2}
                  />
                  <input
                    className="color-swatch-input"
                    type="color"
                    value={state.style.gradient.color2}
                    onChange={(event) =>
                      updateStyle('gradient', {
                        ...state.style.gradient,
                        color2: event.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="label">Direction (deg)</label>
                <input
                  className="input"
                  type="number"
                  min={0}
                  max={360}
                  value={state.style.gradient.rotation}
                  onChange={(event) =>
                    updateStyle('gradient', {
                      ...state.style.gradient,
                      rotation: Number(event.target.value || 0)
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <IconQr className="h-4 w-4 text-slate-600" />
            Frames
          </div>
          <div className="mt-4 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
            {FRAME_OPTIONS.map((frame) => {
              const active = state.style.frame.style === frame.id;
              return (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => updateFrame('style', frame.id)}
                  className={cn(
                    'flex min-w-[110px] flex-col items-start rounded-lg bg-transparent px-2 py-2 text-left transition',
                    active ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50',
                  )}
                >
                  <div className="relative flex h-10 w-full items-center justify-center rounded-md border border-slate-200/70 bg-slate-50">
                    {frame.id === 'scan-top' && (
                      <span className="absolute left-2 right-2 top-1.5 rounded-full bg-slate-900 py-0.5 text-[8px] font-semibold text-white">
                        SCAN ME
                      </span>
                    )}
                    {frame.id === 'scan-bottom' && (
                      <span className="absolute bottom-1.5 left-2 right-2 rounded-full bg-slate-900 py-0.5 text-[8px] font-semibold text-white">
                        SCAN ME
                      </span>
                    )}
                    <div className="h-5 w-5 rounded-md bg-slate-300" />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-700">{frame.label}</p>
                  <p className="text-[11px] text-slate-500">{frame.hint}</p>
                </button>
              );
            })}
          </div>

          {state.style.frame.style !== 'none' && (
            <div className="mt-4 grid gap-4 sm:grid-cols-4">
              <div>
                <label className="label">Frame padding</label>
                <input
                  className="input"
                  type="number"
                  min={12}
                  max={60}
                  value={state.style.frame.padding}
                  onChange={(event) =>
                    updateFrame('padding', Number(event.target.value || 0))
                  }
                />
              </div>
              <div>
                <label className="label">Frame radius</label>
                <input
                  className="input"
                  type="number"
                  min={0}
                  max={48}
                  value={state.style.frame.radius}
                  onChange={(event) =>
                    updateFrame('radius', Number(event.target.value || 0))
                  }
                />
              </div>
              <div>
                <label className="label">Border color</label>
                <div className="color-field">
                  <input
                    className="color-value"
                    readOnly
                    value={state.style.frame.borderColor}
                  />
                  <input
                    className="color-swatch-input"
                    type="color"
                    value={state.style.frame.borderColor}
                    onChange={(event) => updateFrame('borderColor', event.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="label">Frame background</label>
                <div className="color-field">
                  <input
                    className="color-value"
                    readOnly
                    value={state.style.frame.backgroundColor}
                  />
                  <input
                    className="color-swatch-input"
                    type="color"
                    value={state.style.frame.backgroundColor}
                    onChange={(event) => updateFrame('backgroundColor', event.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {(state.style.frame.style === 'scan-top' ||
            state.style.frame.style === 'scan-bottom') && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label className="label">Label text</label>
                <input
                  className="input"
                  value={state.style.frame.label}
                  onChange={(event) => updateFrame('label', event.target.value)}
                />
              </div>
              <div>
                <label className="label">Label background</label>
                <div className="color-field">
                  <input
                    className="color-value"
                    readOnly
                    value={state.style.frame.labelBg}
                  />
                  <input
                    className="color-swatch-input"
                    type="color"
                    value={state.style.frame.labelBg}
                    onChange={(event) => updateFrame('labelBg', event.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="label">Label text color</label>
                <div className="color-field">
                  <input
                    className="color-value"
                    readOnly
                    value={state.style.frame.labelColor}
                  />
                  <input
                    className="color-swatch-input"
                    type="color"
                    value={state.style.frame.labelColor}
                    onChange={(event) => updateFrame('labelColor', event.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <IconPalette className="h-4 w-4 text-slate-600" />
            Shapes
          </div>
          <div className="mt-4 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
            {DOT_OPTIONS.map((option) => {
              const active = dotsStyle === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => updateStyle('dotsStyle', option.id)}
                  className={cn(
                    'flex min-w-[92px] flex-col items-start rounded-lg bg-transparent px-2 py-2 text-left transition',
                    active ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50',
                  )}
                >
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span
                        key={`${option.id}-${index}`}
                        className={cn('h-2 w-2 bg-slate-900', option.radius)}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-700">{option.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <IconPalette className="h-4 w-4 text-slate-600" />
            Corners
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-slate-600">Outer corners</p>
              <div className="mt-2 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
                {CORNER_SQUARE_OPTIONS.map((option) => {
                  const active = cornersSquareStyle === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => updateStyle('cornersSquareStyle', option.id)}
                      className={cn(
                        'flex min-w-[72px] flex-col items-start rounded-lg bg-transparent px-1.5 py-1.5 text-left transition',
                        active ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50',
                      )}
                    >
                      <div className="relative h-6 w-6">
                        <span
                          className={cn(
                            'absolute left-0 top-0 h-6 w-6 border-2 border-slate-900',
                            option.radius,
                          )}
                        />
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-700">{option.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Inner dots</p>
              <div className="mt-2 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
                {CORNER_DOT_OPTIONS.map((option) => {
                  const active = cornersDotStyle === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => updateStyle('cornersDotStyle', option.id)}
                      className={cn(
                        'flex min-w-[72px] flex-col items-start rounded-lg bg-transparent px-1.5 py-1.5 text-left transition',
                        active ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50',
                      )}
                    >
                      <div className="relative h-6 w-6">
                        <span className="absolute left-0 top-0 h-6 w-6 rounded-[6px] border-2 border-slate-300" />
                        <span
                          className={cn(
                            'absolute left-1.5 top-1.5 h-3 w-3 bg-slate-900',
                            option.radius,
                          )}
                        />
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-700">{option.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <IconQr className="h-4 w-4 text-slate-600" />
            Logos
          </div>
          <div className="mt-3 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => handleLogoPreset(null)}
              className={cn(
                'flex min-w-[72px] flex-col items-center justify-center rounded-lg bg-transparent px-2 py-1.5 text-xs font-semibold text-slate-600 transition',
                !state.style.logo.enabled ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50',
              )}
            >
              None
            </button>
            {LOGO_PRESETS.map((logo) => {
              const active = state.style.logo.presetId === logo.id && state.style.logo.enabled;
              const previewColor = active ? state.style.logo.color : defaultLogoColor;
              const previewDataUrl = getLogoPresetDataUrl(logo.id, previewColor) ?? '';
              return (
                <button
                  key={logo.id}
                  type="button"
                  onClick={() => handleLogoPreset(logo.id)}
                  className={cn(
                    'flex min-w-[72px] flex-col items-center justify-center rounded-lg bg-transparent px-2 py-1.5 text-xs font-semibold text-slate-600 transition',
                    active ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50',
                  )}
                >
                  <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                    <img src={previewDataUrl} alt="" className="h-5 w-5" />
                  </span>
                  <span className="mt-1 block">{logo.name}</span>
                </button>
              );
            })}
            <label className="flex min-w-[84px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-slate-100/80 px-2 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-md bg-white">
                {hasCustomLogo ? (
                  <img src={state.style.logo.dataUrl ?? ''} alt="" className="h-5 w-5" />
                ) : (
                  <span className="text-[10px] font-bold text-slate-400">+</span>
                )}
              </span>
              <span>{hasCustomLogo ? 'Uploaded' : 'Upload'}</span>
              <input
                className="hidden"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleLogoUpload}
              />
            </label>
          </div>

          {state.style.logo.enabled && (
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-600">Size</label>
                <input
                  className="w-20 accent-brand-600"
                  type="range"
                  min={0.1}
                  max={0.35}
                  step={0.02}
                  value={state.style.logo.sizeRatio}
                  onChange={(event) =>
                    updateLogo('sizeRatio', Number(event.target.value || 0.2))
                  }
                />
                <span className="text-xs font-semibold text-slate-700 w-8">
                  {Math.round(state.style.logo.sizeRatio * 100)}%
                </span>
              </div>
              {state.style.logo.presetId && (
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-600">Logo color</label>
                  <input
                    className="color-swatch-input"
                    type="color"
                    value={state.style.logo.color}
                    onChange={(event) => {
                      const color = event.target.value;
                      const dataUrl = getLogoPresetDataUrl(
                        state.style.logo.presetId ?? '',
                        color,
                      );
                      if (!dataUrl) return;
                      onStateChange({
                        ...state,
                        style: {
                          ...state.style,
                          logo: {
                            ...state.style.logo,
                            color,
                            dataUrl,
                            paddedDataUrl: null
                          }
                        }
                      });
                    }}
                  />
                </div>
              )}
              <label className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={state.style.logo.paddingEnabled}
                  onChange={(event) => updateLogo('paddingEnabled', event.target.checked)}
                />
                White background
              </label>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <IconLock className="h-4 w-4 text-slate-600" />
            Share settings
          </div>
          <label className="mt-3 inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={state.includeSensitive}
              onChange={(event) =>
                onStateChange({ ...state, includeSensitive: event.target.checked })
              }
            />
            Include sensitive fields in share link (e.g. WiFi password)
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary" onClick={onGenerate}>
          Generate QR
        </button>
        <p className="text-xs text-slate-500">
          Live preview updates automatically. Generate saves to history and powers exports.
        </p>
      </div>
    </section>
  );
}
