import { render, screen } from '@testing-library/react';
import { expect, describe, test, vi, beforeEach } from 'vitest';
import { Product } from '@/components/ProductItem';
import Layout from './layout';

describe('Layout', () => {
  beforeEach(() => {
    vi.mock('next/font/google', () => ({
      Roboto: () => ({
        style: {
          fontFamily: 'mocked',
        },
      }),
    }));
  });
  test('Layout should render', async () => {
    const { container } = render(
      <Layout>
        <p>Test Message</p>
      </Layout>
    );
    expect(screen.getByText('Test Message')).toBeDefined();
    expect(container.querySelector('header')).toBeDefined();
    expect(container.querySelector('main')).toBeDefined();
    // save snapshot
    expect(container).toMatchSnapshot();
  });
});
function createFetchResponse(data: Product[]) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}
