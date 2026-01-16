export type QrContentType = 'text' | 'wifi' | 'email' | 'phone' | 'sms' | 'vcard';
export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';
export type QrDotStyle = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type QrCornerSquareStyle = 'square' | 'dot' | 'extra-rounded';
export type QrCornerDotStyle = 'square' | 'dot';
export type QrFrameStyle = 'none' | 'outline' | 'soft' | 'scan-top' | 'scan-bottom';

export interface QrFields {
  text: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: WifiEncryption;
  wifiHidden: boolean;
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  phoneNumber: string;
  smsNumber: string;
  smsMessage: string;
  vcardFirstName: string;
  vcardLastName: string;
  vcardOrg: string;
  vcardTitle: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardWebsite: string;
  vcardAddress: string;
}

export interface QrGradient {
  enabled: boolean;
  color1: string;
  color2: string;
  rotation: number;
}

export interface QrLogo {
  enabled: boolean;
  dataUrl: string | null;
  paddedDataUrl: string | null;
  sizeRatio: number;
  padding: number;
  paddingEnabled: boolean;
  color: string;
  presetId: string | null;
}

export interface QrStyle {
  size: number;
  margin: number;
  ecc: 'L' | 'M' | 'Q' | 'H';
  fgColor: string;
  bgColor: string;
  backgroundTransparent: boolean;
  gradient: QrGradient;
  rounded: boolean;
  dotsStyle?: QrDotStyle;
  cornersSquareStyle?: QrCornerSquareStyle;
  cornersDotStyle?: QrCornerDotStyle;
  logo: QrLogo;
  frame: {
    style: QrFrameStyle;
    padding: number;
    radius: number;
    borderColor: string;
    backgroundColor: string;
    label: string;
    labelBg: string;
    labelColor: string;
  };
}

export interface QrState {
  type: QrContentType;
  fields: QrFields;
  style: QrStyle;
  includeSensitive: boolean;
}

export interface HistoryItem {
  id: string;
  type: QrContentType;
  fields: QrFields;
  style: QrStyle;
  payload: string;
  timestamp: number;
  starred: boolean;
}
