import type { QrContentType, QrFields } from '@/types/qr';

const escapeWifi = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/:/g, '\\:');

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPhone = (value: string) => /^[+0-9().\s-]+$/.test(value);

export function buildPayload(type: QrContentType, fields: QrFields) {
  switch (type) {
    case 'text':
      return fields.text.trim();
    case 'wifi': {
      const encryption = fields.wifiEncryption;
      const ssid = escapeWifi(fields.wifiSsid.trim());
      const password = escapeWifi(fields.wifiPassword.trim());
      const hidden = fields.wifiHidden ? 'H:true;' : '';
      const passSegment = encryption === 'nopass' ? '' : `P:${password};`;
      return `WIFI:T:${encryption};S:${ssid};${passSegment}${hidden};`;
    }
    case 'email': {
      const to = fields.emailTo.trim();
      const subject = fields.emailSubject.trim();
      const body = fields.emailBody.trim();
      const params: string[] = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);
      return params.length ? `mailto:${to}?${params.join('&')}` : `mailto:${to}`;
    }
    case 'phone':
      return `tel:${fields.phoneNumber.trim()}`;
    case 'sms': {
      const number = fields.smsNumber.trim();
      const message = fields.smsMessage.trim();
      return message ? `sms:${number}?body=${encodeURIComponent(message)}` : `sms:${number}`;
    }
    case 'vcard': {
      const first = fields.vcardFirstName.trim();
      const last = fields.vcardLastName.trim();
      const fullName = `${first} ${last}`.trim();
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${last};${first};;;`,
        `FN:${fullName || fields.vcardOrg || 'Contact'}`,
        fields.vcardOrg ? `ORG:${fields.vcardOrg}` : '',
        fields.vcardTitle ? `TITLE:${fields.vcardTitle}` : '',
        fields.vcardPhone ? `TEL;TYPE=CELL:${fields.vcardPhone}` : '',
        fields.vcardEmail ? `EMAIL:${fields.vcardEmail}` : '',
        fields.vcardWebsite ? `URL:${fields.vcardWebsite}` : '',
        fields.vcardAddress ? `ADR:${fields.vcardAddress}` : '',
        'END:VCARD'
      ];
      return lines.filter(Boolean).join('\n');
    }
    default:
      return '';
  }
}

export function validateFields(type: QrContentType, fields: QrFields) {
  const errors: Record<string, string> = {};

  if (type === 'text' && !fields.text.trim()) {
    errors.text = 'Enter text or a URL.';
  }

  if (type === 'wifi') {
    if (!fields.wifiSsid.trim()) errors.wifiSsid = 'SSID is required.';
    if (fields.wifiEncryption !== 'nopass' && !fields.wifiPassword.trim()) {
      errors.wifiPassword = 'Password is required for secured networks.';
    }
  }

  if (type === 'email') {
    if (!fields.emailTo.trim()) {
      errors.emailTo = 'Email address required.';
    } else if (!isEmail(fields.emailTo.trim())) {
      errors.emailTo = 'Enter a valid email address.';
    }
  }

  if (type === 'phone') {
    if (!fields.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number required.';
    } else if (!isPhone(fields.phoneNumber.trim())) {
      errors.phoneNumber = 'Enter a valid phone number.';
    }
  }

  if (type === 'sms') {
    if (!fields.smsNumber.trim()) {
      errors.smsNumber = 'SMS number required.';
    } else if (!isPhone(fields.smsNumber.trim())) {
      errors.smsNumber = 'Enter a valid phone number.';
    }
  }

  if (type === 'vcard') {
    const hasIdentity =
      fields.vcardFirstName.trim() ||
      fields.vcardLastName.trim() ||
      fields.vcardOrg.trim() ||
      fields.vcardEmail.trim() ||
      fields.vcardPhone.trim();
    if (!hasIdentity) {
      errors.vcard = 'Provide at least a name, org, email, or phone.';
    }
    if (fields.vcardEmail && !isEmail(fields.vcardEmail)) {
      errors.vcard = 'Enter a valid vCard email.';
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function sanitizeFields(fields: QrFields) {
  const sanitized: QrFields = { ...fields };
  (Object.keys(sanitized) as Array<keyof QrFields>).forEach((key) => {
    const value = sanitized[key];
    if (typeof value === 'string') {
      sanitized[key] = value.replace(/\n/g, ' ').slice(0, 300) as QrFields[keyof QrFields];
    }
  });
  return sanitized;
}
