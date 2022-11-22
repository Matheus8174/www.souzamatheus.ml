module.exports = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    'storybook-addon-next',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chakra-ui/storybook-addon',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  features: {
    emotionAlias: false,
    interactionsDebugger: true,
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': '@emotion/react',
          'emotion-theming': '@emotion/react',
        },
      },
    };
  },
};
