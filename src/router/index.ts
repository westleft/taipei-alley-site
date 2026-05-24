import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import PrivacyPage from '../pages/PrivacyPage.vue';
import TermsPage from '../pages/TermsPage.vue';
import ContactPage from '../pages/ContactPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: '漫遊台北' } },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPage,
      meta: { title: '隱私權政策' },
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsPage,
      meta: { title: '使用者條款' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: { title: '聯絡我們' },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const pageTitle = to.meta.title as string | undefined;
  document.title = pageTitle ? `${pageTitle}｜漫遊台北` : '漫遊台北';
});
