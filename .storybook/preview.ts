import type { Preview } from 'storybook-vue3-rsbuild';
import { setup } from 'storybook-vue3-rsbuild';
import '../src/styles/global.css';
import { navigateStoryRoute, storyRouter } from '../src/stories/router';

setup((app) => {
  app.use(storyRouter);
});

const preview: Preview = {
  decorators: [
    (story, { parameters }) => {
      const path =
        typeof parameters.route === 'string' ? parameters.route : '/';
      void navigateStoryRoute(path);
      return {
        components: { story },
        template: '<story />',
      };
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
