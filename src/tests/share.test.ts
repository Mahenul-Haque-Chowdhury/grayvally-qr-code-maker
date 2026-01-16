import { DEFAULT_STATE } from '@/lib/defaults';
import { decodeShareState, encodeShareState } from '@/lib/share';

describe('share link encoding', () => {
  it('roundtrips state', () => {
    const encoded = encodeShareState(DEFAULT_STATE, false);
    expect(encoded).toBeTruthy();
    const decoded = decodeShareState(encoded || '');
    expect(decoded?.type).toBe(DEFAULT_STATE.type);
    expect(decoded?.fields.text).toBe(DEFAULT_STATE.fields.text);
  });
});
