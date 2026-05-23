<script setup lang="ts">
import { RouterLink } from 'vue-router';

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <p class="footer__name">漫遊台北</p>
        <p class="footer__tagline">探索台北的精彩景點</p>
      </div>

      <nav class="footer__nav" aria-label="頁尾導覽">
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/privacy">隱私權政策</RouterLink>
        <RouterLink to="/terms">使用者條款</RouterLink>
        <a
          href="https://www.travel.taipei/"
          target="_blank"
          rel="noopener noreferrer"
        >
          台北旅遊網
        </a>
      </nav>

      <p class="footer__copy">© {{ year }} 漫遊台北。景點資料由台北旅遊網提供。</p>
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
  font-size: 1.1rem;
  font-weight: 700;
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
