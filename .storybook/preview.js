import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from '../styles/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
};

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Story />
    </ChakraProvider>
  ),
];
