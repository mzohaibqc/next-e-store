import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Provider as ThemeProvider } from './ThemeProvider';

test('ThemeProvider should render without error', async () => {
  const { container } = render(
    <ThemeProvider>
      <p></p>
    </ThemeProvider>
  );
  // save snapshot
  expect(container).toMatchSnapshot();
});
