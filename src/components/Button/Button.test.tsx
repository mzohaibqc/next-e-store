import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Button from '@/components/Button';

test('Button renders correctly and fires onClick', () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Button Label</Button>);
  expect(screen.getByRole('button').textContent).toEqual('Button Label');
  fireEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalled();
});
