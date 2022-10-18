module.exports = {
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "storybook-addon-next",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions"
  ],
  features: {
    interactionsDebugger: true
  },
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  }
}
