import { render as rtlRender } from '@testing-library/react';
import { MockWritProvider } from '@exile-watch/writ-react';
import React, {ReactNode} from 'react';

// Override the default render method
const render = (ui: ReactNode, options = {}) =>
  rtlRender(ui, {
    wrapper: ({ children }) => <MockWritProvider>{children}</MockWritProvider>,
    ...options,
  });

// Override the render method
export { render };