import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import ToggleThemeButton from '../src/components/ToggleThemeButton';
import theme from '../src/styles/theme';

initialize({
  onUnhandledRequest: 'bypass',
});

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

export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
};

const withChakra = (StoryFn, context) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  React.useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <ChakraProvider theme={theme}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
        <ToggleThemeButton />
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra, mswDecorator];
