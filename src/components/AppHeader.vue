<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AppLogo from './AppLogo.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const route = useRoute();
const { t } = useI18n();

const navItems = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.contact'), to: '/contact' },
  { label: t('nav.privacy'), to: '/privacy' },
  { label: t('nav.terms'), to: '/terms' },
]);

const isActive = (path: string) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path);
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/" class="header__brand">
        <AppLogo class="header__logo" aria-hidden="true" />
        <span class="header__name">{{ t('brand.name') }}</span>
      </RouterLink>

      <nav class="header__nav" :aria-label="t('nav.label')">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="header__link"
          :class="{ 'header__link--active': isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <LanguageSwitcher class="header__lang" />
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.25rem;
  min-height: var(--header-height);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
  margin-inline-end: auto;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  font-size: 1.05rem;
}

.header__name {
  white-space: nowrap;
}

.header__brand:hover {
  text-decoration: none;
}

.header__logo {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  box-shadow: 0 0 0 1px var(--color-border);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.header__link {
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition:
    color 0.15s,
    background 0.15s;
}

.header__link:hover {
  color: var(--color-accent);
  background: var(--color-accent-soft);
  text-decoration: none;
}

.header__link--active {
  color: var(--color-accent);
  background: var(--color-accent-soft);
}

.header__lang {
  flex-shrink: 0;
}

@media (max-width: 720px) {
  .header__inner {
    flex-wrap: wrap;
    padding-block: 0.6rem;
    row-gap: 0.5rem;
    column-gap: 0.75rem;
  }

  /* Nav links drop to their own full-width row that scrolls horizontally
     instead of wrapping, keeping the brand + language picker on top. */
  .header__nav {
    order: 3;
    flex: 1 0 100%;
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 0.2rem;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .header__nav::-webkit-scrollbar {
    display: none;
  }

  .header__link {
    flex-shrink: 0;
    padding: 0.4rem 0.7rem;
    font-size: 0.85rem;
  }
}
</style>
