<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import AppLogo from './AppLogo.vue';

const route = useRoute();

const navItems = [
  { label: '首頁', to: '/' },
  { label: '隱私權政策', to: '/privacy' },
  { label: '使用者條款', to: '/terms' },
] as const;

const isActive = (path: string) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path);
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/" class="header__brand">
        <AppLogo class="header__logo" aria-hidden="true" />
        <span class="header__name">漫遊台北</span>
      </RouterLink>

      <nav class="header__nav" aria-label="主要導覽">
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
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  font-size: 1.05rem;
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

@media (max-width: 640px) {
  .header__nav {
    gap: 0;
  }

  .header__link {
    padding: 0.4rem 0.55rem;
    font-size: 0.82rem;
  }
}
</style>
