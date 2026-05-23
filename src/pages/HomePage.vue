<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SiteLayout from '../components/SiteLayout.vue';
import StoreBadges from '../components/StoreBadges.vue';
import AppLogo from '../components/AppLogo.vue';

const features = [
  {
    title: '首頁探索',
    description:
      '依主題分類瀏覽熱門景點與歷史建築，以卡片網格快速掌握台北各區精彩去處。',
    image: '/images/home.png',
    tags: ['熱門景點', '歷史建築', '主題分類'],
  },
  {
    title: '搜尋與標籤篩選',
    description:
      '關鍵字搜尋搭配標籤篩選，輕鬆找到親子共遊、戶外踏青或藝文館所等適合你的行程。',
    image: '/images/search.png',
    tags: ['關鍵字搜尋', '標籤篩選', '快速瀏覽'],
  },
  {
    title: '完整景點資訊',
    description:
      '地址、開放時間、票價與景點介紹一次呈現，還能查看多張照片與無障礙等標籤。',
    image: '/images/detail.png',
    tags: ['基本資訊', '照片瀏覽', '景點介紹'],
  },
  {
    title: '設定與支援',
    description:
      '查閱隱私權政策、服務條款與聯絡方式，並了解景點資料的官方來源。',
    image: '/images/settings.png',
    tags: ['法規與隱私', '聯絡我們', '版本資訊'],
  },
] as const;

</script>

<template>
  <SiteLayout>
    <section class="hero">
      <div class="hero__inner">
        <div class="hero__copy">
          <p class="hero__eyebrow">台北旅遊指南 App</p>
          <h1 class="hero__title">漫遊台北</h1>
          <p class="hero__subtitle">探索台北的精彩景點</p>
          <p class="hero__desc">
            以簡潔卡片式介面瀏覽台北景點，從熱門推薦到標籤搜尋，讓規劃行程更輕鬆、更直覺。
          </p>
          <StoreBadges />
        </div>

        <div class="hero__device" aria-hidden="true">
          <div class="hero__phone">
            <img
              src="/images/home.png"
              alt=""
              width="390"
              height="844"
              class="hero__screenshot"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section section--muted" aria-labelledby="source-heading">
      <div class="section__inner">
        <div class="source-card">
          <div class="source-card__icon" aria-hidden="true">ℹ️</div>
          <div class="source-card__content">
            <h2 id="source-heading">資料來源</h2>
            <p>
              本 App 的景點與旅遊資訊由
              <strong>台北旅遊網（Taipei Travel Net）</strong>
              提供，確保內容來自官方公開資料。
            </p>
            <a
              class="source-card__link"
              href="https://www.travel.taipei/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.travel.taipei/
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="legal-heading">
      <div class="section__inner">
        <header class="section__header">
          <h2 id="legal-heading">法規與支援</h2>
          <p>使用 App 前，歡迎先閱讀我們的隱私權政策與使用者條款。</p>
        </header>

        <div class="legal-cards">
          <RouterLink to="/privacy" class="legal-card">
            <span class="legal-card__title">隱私權政策</span>
            <span class="legal-card__chevron" aria-hidden="true">›</span>
          </RouterLink>
          <RouterLink to="/terms" class="legal-card">
            <span class="legal-card__title">使用者條款</span>
            <span class="legal-card__chevron" aria-hidden="true">›</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </SiteLayout>
</template>

<style scoped>
.hero {
  padding: 3rem 1.25rem 4rem;
  background: linear-gradient(180deg, #fff 0%, var(--color-bg) 100%);
}

.hero__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero__eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.02em;
}

.hero__logo {
  width: 88px;
  height: 88px;
  border-radius: 22px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 1rem;
}

.hero__title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  letter-spacing: -0.02em;
  margin-bottom: 0.35rem;
}

.hero__subtitle {
  margin: 0 0 1.25rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.hero__desc {
  margin: 0 0 1.5rem;
  max-width: 32rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.hero__device {
  display: flex;
  justify-content: center;
}

.hero__phone {
  width: min(280px, 100%);
  padding: 10px;
  background: #1d1d1f;
  border-radius: 36px;
  box-shadow: var(--shadow-lg);
}

.hero__screenshot {
  width: 100%;
  border-radius: 28px;
}

.section {
  padding: 3.5rem 1.25rem;
}

.section--muted {
  padding-top: 0;
}

.section__inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.section__header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.section__header h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.section__header p {
  color: var(--color-text-secondary);
  margin: 0;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.feature-card {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 2.5rem;
  align-items: center;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.feature-card--reverse {
  direction: rtl;
}

.feature-card--reverse > * {
  direction: ltr;
}

.feature-card__phone {
  max-width: 220px;
  margin: 0 auto;
  padding: 8px;
  background: #1d1d1f;
  border-radius: 28px;
  box-shadow: var(--shadow-md);
}

.feature-card__phone img {
  border-radius: 22px;
  width: 100%;
}

.feature-card__body h3 {
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
}

.feature-card__body p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.feature-card__tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-card__tags li {
  margin: 0;
  padding: 0.35rem 0.75rem;
  background: var(--color-teal-soft);
  color: var(--color-teal);
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
}

.source-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.75rem 2rem;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.source-card__icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  font-size: 1.25rem;
  background: var(--color-accent-soft);
  border-radius: 12px;
}

.source-card__content h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.source-card__content p {
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
}

.source-card__link {
  display: inline-block;
  padding: 0.6rem 1rem;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  word-break: break-all;
}

.source-card__link:hover {
  border-color: var(--color-accent);
  text-decoration: none;
}

.legal-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 640px;
  margin: 0 auto;
}

.legal-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.25rem;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
  transition: box-shadow 0.15s;
}

.legal-card:hover {
  box-shadow: var(--shadow-md);
  text-decoration: none;
  color: var(--color-accent);
}

.legal-card__chevron {
  color: var(--color-text-muted);
  font-size: 1.25rem;
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__desc {
    margin-left: auto;
    margin-right: auto;
  }

  .hero__copy :deep(.store-badges) {
    justify-content: center;
  }

  .feature-card,
  .feature-card--reverse {
    grid-template-columns: 1fr;
    direction: ltr;
    text-align: center;
  }

  .legal-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 2rem;
  }

  .source-card {
    flex-direction: column;
    padding: 1.25rem;
  }
}
</style>
