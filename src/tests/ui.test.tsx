import { useState } from 'react';
import { render, screen } from '@testing-library/react';
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

    const sizeInput = screen.getByLabelText(/size/i);
    await user.clear(sizeInput);
    await user.type(sizeInput, '420');

    expect(sizeInput).toHaveValue(420);
  });
});
