import { buildPayload } from '@/lib/payload';
import { DEFAULT_FIELDS } from '@/lib/defaults';

describe('payload builders', () => {
  it('builds WiFi payload', () => {
    const fields = {
      ...DEFAULT_FIELDS,
      wifiSsid: 'MyNet',
      wifiPassword: 'secret',
      wifiEncryption: 'WPA',
      wifiHidden: true
    };
    expect(buildPayload('wifi', fields)).toBe('WIFI:T:WPA;S:MyNet;P:secret;H:true;;');
  });

  it('builds email payload', () => {
    const fields = {
      ...DEFAULT_FIELDS,
      emailTo: 'hello@grayvally.com',
      emailSubject: 'Hello',
      emailBody: 'Test message'
    };
    expect(buildPayload('email', fields)).toBe(
      'mailto:hello@grayvally.com?subject=Hello&body=Test%20message',
    );
  });

  it('builds vCard payload', () => {
    const fields = {
      ...DEFAULT_FIELDS,
      vcardFirstName: 'Jane',
      vcardLastName: 'Doe',
      vcardEmail: 'jane@grayvally.com'
    };
    const payload = buildPayload('vcard', fields);
    expect(payload).toContain('BEGIN:VCARD');
    expect(payload).toContain('FN:Jane Doe');
    expect(payload).toContain('EMAIL:jane@grayvally.com');
  });

  it('builds URL payload', () => {
    const fields = { ...DEFAULT_FIELDS, text: 'https://grayvally.com' };
    expect(buildPayload('text', fields)).toBe('https://grayvally.com');
  });
});
