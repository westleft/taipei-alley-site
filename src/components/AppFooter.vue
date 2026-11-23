<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <p class="footer__name">{{ t('brand.name') }}</p>
        <p class="footer__tagline">{{ t('footer.tagline') }}</p>
      </div>

      <nav class="footer__nav" :aria-label="t('footer.label')">
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/contact">{{ t('nav.contact') }}</RouterLink>
        <RouterLink to="/privacy">{{ t('nav.privacy') }}</RouterLink>
        <RouterLink to="/terms">{{ t('nav.terms') }}</RouterLink>
        <a
          href="https://www.travel.taipei/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('footer.travelNet') }}
        </a>
      </nav>

      <p class="footer__copy">{{ t('footer.copyright', { year }) }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.footer__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2.5rem 1.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer__name {
  margin: 0 0 0.25rem;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.footer__tagline {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
}

.footer__nav a {
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
}

.footer__nav a:hover {
  text-decoration: underline;
}

.footer__copy {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
</style>
