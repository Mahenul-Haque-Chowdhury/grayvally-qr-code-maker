import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneratorForm from '@/components/GeneratorForm';
import { DEFAULT_STATE } from '@/lib/defaults';

describe('GeneratorForm', () => {
  it('updates size on input change', async () => {
    const user = userEvent.setup();
    function Wrapper() {
      const [state, setState] = useState(DEFAULT_STATE);
      return (
        <GeneratorForm
          state={state}
          errors={{}}
          onStateChange={setState}
          onGenerate={vi.fn()}
          onReset={vi.fn()}
        />
      );
    }

    render(<Wrapper />);

    // Core settings is collapsed by default — expand it first
    await user.click(screen.getByRole('button', { name: /core settings/i }));

    const sizeInput = screen.getByLabelText(/size \(px\)/i) as HTMLInputElement;
    fireEvent.change(sizeInput, { target: { value: '420' } });

    expect(sizeInput.value).toBe('420');
  });
});
