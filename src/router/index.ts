import { watch } from 'vue';
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import PrivacyPage from '../pages/PrivacyPage.vue';
import TermsPage from '../pages/TermsPage.vue';
import ContactPage from '../pages/ContactPage.vue';
import { i18n } from '../i18n';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { titleKey: 'meta.home' } },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPage,
      meta: { titleKey: 'meta.privacy' },
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsPage,
      meta: { titleKey: 'meta.terms' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: { titleKey: 'meta.contact' },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

function updateTitle(route: RouteLocationNormalized) {
  const { t } = i18n.global;
  const titleKey = route.meta.titleKey as string | undefined;
  const suffix = t('meta.titleSuffix');
  const pageTitle = titleKey ? t(titleKey) : undefined;
  document.title =
    pageTitle && pageTitle !== suffix ? `${pageTitle}｜${suffix}` : suffix;
}

router.afterEach((to) => {
  updateTitle(to);
});

// Re-localize the current page title whenever the locale changes.
watch(i18n.global.locale, () => {
  updateTitle(router.currentRoute.value);
});
