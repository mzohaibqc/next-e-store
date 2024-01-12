import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import NotFound from './not-found';

test('NotFound should render without error', async () => {
  const { container } = render(<NotFound />);
  // save snapshot
  expect(container).toMatchSnapshot();
});
