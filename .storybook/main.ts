import type { StorybookConfig } from 'storybook-vue3-rsbuild';

const config: StorybookConfig = {
  "stories": ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": "storybook-vue3-rsbuild"
};
export default config;