import { createRouter, createMemoryHistory } from 'vue-router';

const stub = { template: '<div />' };

export const storyRouter = createRouter({
  history: createMemoryHistory('/'),
  routes: [
    { path: '/', name: 'home', component: stub },
    { path: '/contact', name: 'contact', component: stub },
    { path: '/privacy', name: 'privacy', component: stub },
    { path: '/terms', name: 'terms', component: stub },
  ],
});

export async function navigateStoryRoute(path: string) {
  await storyRouter.push(path);
  await storyRouter.isReady();
}
