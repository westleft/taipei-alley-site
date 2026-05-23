import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '../src/App.vue';
import HomePage from '../src/pages/HomePage.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: HomePage }],
});

test('renders the home page', async () => {
  render(App, {
    global: { plugins: [router] },
  });
  await router.isReady();
  expect(screen.getByRole('heading', { name: '漫遊台北' })).toBeInTheDocument();
});
