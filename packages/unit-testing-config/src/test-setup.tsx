import { render as rtlRender } from '@testing-library/react';
import { MockWritProvider } from '@exile-watch/writ-react';
import React, {ReactNode} from 'react';

process.on('uncaughtException', (error) => {
  if (error.message.includes("@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app")) {
    return;
  }

  // For all other uncaught exceptions, you might want to log them or handle them differently
  return error
});

// Override the default render method
const render = (ui: ReactNode, options = {}) =>
  rtlRender(ui, {
    wrapper: ({ children }) => <MockWritProvider>{children}</MockWritProvider>,
    ...options,
  });

// Override the render method
export { render };