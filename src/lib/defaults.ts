import type { QrFields, QrState, QrStyle } from '@/types/qr';

export const DEFAULT_FIELDS: QrFields = {
  text: 'https://grayvally.com',
  wifiSsid: '',
  wifiPassword: '',
  wifiEncryption: 'WPA',
  wifiHidden: false,
  emailTo: '',
  emailSubject: '',
  emailBody: '',
  phoneNumber: '',
  smsNumber: '',
  smsMessage: '',
  vcardFirstName: '',
  vcardLastName: '',
  vcardOrg: '',
  vcardTitle: '',
  vcardPhone: '',
  vcardEmail: '',
  vcardWebsite: '',
  vcardAddress: ''
};

export const DEFAULT_STYLE: QrStyle = {
  size: 320,
  margin: 8,
  ecc: 'M',
  fgColor: '#111827',
  bgColor: '#ffffff',
  backgroundTransparent: false,
  gradient: {
    enabled: false,
    color1: '#2563eb',
    color2: '#22d3ee',
    rotation: 45
  },
  rounded: false,
  dotsStyle: 'square',
  cornersSquareStyle: 'square',
  cornersDotStyle: 'square',
  logo: {
    enabled: false,
    dataUrl: null,
    paddedDataUrl: null,
    sizeRatio: 0.2,
    padding: 10,
    paddingEnabled: false
  },
  frame: {
    style: 'none',
    padding: 24,
    radius: 28,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    label: 'SCAN ME',
    labelBg: '#111827',
    labelColor: '#ffffff'
  }
};

export const DEFAULT_STATE: QrState = {
  type: 'text',
  fields: DEFAULT_FIELDS,
  style: DEFAULT_STYLE,
  includeSensitive: false
};
