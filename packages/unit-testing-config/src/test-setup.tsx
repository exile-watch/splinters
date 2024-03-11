import { render as rtlRender } from '@testing-library/react';
import { MockWritProvider } from '@exile-watch/writ-react';
import React, {ReactNode} from 'react';
import { vi } from 'vitest';

const mockLocalFont = vi.fn().mockImplementation(() => {
  return {
    src: 'mocked-font-path',
    variable: '--global-font-fontin',
  };
});

vi.mock('next/font/local', () => {
  return {
    default: mockLocalFont
  };
});

// Override the default render method
const render = (ui: ReactNode, options = {}) =>
  rtlRender(ui, {
    wrapper: ({ children }) => <MockWritProvider>{children}</MockWritProvider>,
    ...options,
  });

// Override the render method
export { render };