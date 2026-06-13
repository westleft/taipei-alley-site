<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SiteLayout from '../components/SiteLayout.vue'
import StoreBadges from '../components/StoreBadges.vue'

const REVEAL_THRESHOLD = 0.15

const categories = [
  '親子共遊',
  '戶外踏青',
  '藝文館所',
  '歷史建築',
  '校外教學',
  '單車族',
  '無障礙旅遊',
  '自然生態',
  '美食探索',
  '夜景散步',
]

interface Feature {
  index: string
  kicker: string
  title: string
  description: string
  image: string
  alt: string
  tags: string[]
}

const features: Feature[] = [
  {
    index: '01',
    kicker: 'Discover',
    title: '探索精彩景點',
    description:
      '從熱門地標到隱藏巷弄，以舒適的卡片式介面快速瀏覽台北的每一處風景，依主題分類一目了然。',
    image: '/images/home.png',
    alt: '漫遊台北 App 首頁，依主題瀏覽熱門景點與歷史建築',
    tags: ['熱門景點', '歷史建築', '主題分類'],
  },
  {
    index: '02',
    kicker: 'Collect',
    title: '收藏城市驚喜',
    description:
      '點開景點即可查看地址、營業時間與多張實景照片，從熱門地標到隱藏角落，完整資訊一次掌握。',
    image: '/images/detail.png',
    alt: '漫遊台北 App 景點詳情頁，顯示地址、營業時間與實景照片',
    tags: ['景點詳情', '營業時間', '實景照片'],
  },
  {
    index: '03',
    kicker: 'Search',
    title: '走進生活風景',
    description:
      '用標籤篩選與關鍵字搜尋，快速找到最適合的行程。親子、踏青、藝文，隨心出走、隨意探索。',
    image: '/images/search.png',
    alt: '漫遊台北 App 搜尋頁，使用標籤篩選與關鍵字尋找景點',
    tags: ['標籤篩選', '關鍵字搜尋', '行程規劃'],
  },
  {
    index: '04',
    kicker: 'Settings',
    title: '貼心又透明',
    description:
      '清楚的設定選項與資料來源說明，景點資訊全數取自官方公開資料，使用起來安心又自在。',
    image: '/images/settings.png',
    alt: '漫遊台北 App 設定頁，顯示法規、支援與資料來源資訊',
    tags: ['隱私透明', '官方資料', '簡潔設定'],
  },
]

const pageRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const root = pageRef.value
  if (!root) return

  const targets = Array.from(
    root.querySelectorAll<HTMLElement>('[data-reveal]'),
  )

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((element) => element.classList.add('is-revealed'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      })
    },
    { threshold: REVEAL_THRESHOLD, rootMargin: '0px 0px -8% 0px' },
  )

  targets.forEach((element) => observer?.observe(element))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <SiteLayout>
    <div ref="pageRef" class="home">
      <section class="hero">
        <div class="hero__glow hero__glow--teal" aria-hidden="true" />
        <div class="hero__glow hero__glow--blue" aria-hidden="true" />

        <div class="hero__inner">
          <div class="hero__copy" data-reveal>
            <p class="hero__eyebrow">
              <span class="hero__eyebrow-dot" aria-hidden="true" />
              台北旅遊指南 App
            </p>
            <h1 class="hero__title">漫遊台北</h1>
            <p class="hero__subtitle">探索台北的精彩景點</p>
            <p class="hero__desc">
              探索城市角落，走進巷弄、美食與夜色之間。以簡潔的卡片式介面，從熱門推薦到標籤搜尋，讓規劃行程更輕鬆、更直覺。
            </p>
            <StoreBadges />
            <p class="hero__note">資料來源｜台北旅遊網 Taipei Travel Net</p>
          </div>

          <div class="hero__device" data-reveal style="--reveal-delay: 0.12s">
            <span class="hero__pin hero__pin--1" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 0-7 7c0 4.7 6.2 12.3 6.5 12.6a.7.7 0 0 0 1 0C12.8 21.3 19 13.7 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
                />
              </svg>
            </span>
            <span class="hero__pin hero__pin--2" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 0-7 7c0 4.7 6.2 12.3 6.5 12.6a.7.7 0 0 0 1 0C12.8 21.3 19 13.7 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
                />
              </svg>
            </span>

            <div class="phone phone--hero">
              <span class="phone__notch" aria-hidden="true" />
              <img
                src="/images/home.png"
                alt="漫遊台北 App 首頁畫面"
                width="390"
                height="844"
                class="phone__screen"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="marquee" aria-label="探索主題分類">
        <div class="marquee__track">
          <span
            v-for="(category, index) in categories"
            :key="`a-${index}`"
            class="marquee__chip"
          >
            {{ category }}
          </span>
          <span
            v-for="(category, index) in categories"
            :key="`b-${index}`"
            class="marquee__chip"
            aria-hidden="true"
          >
            {{ category }}
          </span>
        </div>
      </section>

      <section class="section values" aria-labelledby="values-heading">
        <div class="section__inner">
          <header class="section__header" data-reveal>
            <p class="eyebrow"><em>Why 漫遊台北</em></p>
            <h2 id="values-heading">一座城市，三種出走方式</h2>
            <p class="section__lead">
              不論是計畫一整天的行程，還是想隨意走走，漫遊台北都讓你用最舒服的節奏認識這座城市。
            </p>
          </header>

          <ul class="values__grid">
            <li class="value-card" data-reveal style="--reveal-delay: 0s">
              <span class="value-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                  />
                  <path
                    fill="currentColor"
                    d="m15.5 8.5-2 5-5 2 2-5 5-2Z"
                  />
                </svg>
              </span>
              <h3>探索城市角落</h3>
              <p>從地標到巷弄，跟著主題分類發掘屬於台北的日常風景。</p>
            </li>

            <li class="value-card" data-reveal style="--reveal-delay: 0.1s">
              <span class="value-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linejoin="round"
                    d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.5L6 20V5a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </span>
              <h3>收藏隱藏驚喜</h3>
              <p>完整景點資訊與實景照片，把每一次的城市發現都留下來。</p>
            </li>

            <li class="value-card" data-reveal style="--reveal-delay: 0.2s">
              <span class="value-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 20s2-7 5-7 1-4 4-4 2 5 7 4"
                  />
                  <circle cx="13" cy="5" r="2" fill="currentColor" />
                </svg>
              </span>
              <h3>用腳步出發</h3>
              <p>用標籤篩選快速規劃，讓腳步打開城市的每一個驚喜。</p>
            </li>
          </ul>
        </div>
      </section>

      <section class="section section--muted features" aria-labelledby="features-heading">
        <div class="section__inner">
          <header class="section__header" data-reveal>
            <p class="eyebrow"><em>Features</em></p>
            <h2 id="features-heading">把整座台北，放進口袋</h2>
          </header>

          <div class="features__list">
            <article
              v-for="feature in features"
              :key="feature.index"
              class="feature"
              data-reveal
            >
              <div class="feature__body">
                <span class="feature__index">{{ feature.index }}</span>
                <p class="feature__kicker"><em>{{ feature.kicker }}</em></p>
                <h3 class="feature__title">{{ feature.title }}</h3>
                <p class="feature__desc">{{ feature.description }}</p>
                <ul class="feature__tags">
                  <li v-for="tag in feature.tags" :key="tag">{{ tag }}</li>
                </ul>
              </div>

              <div class="feature__media">
                <div class="phone phone--feature">
                  <span class="phone__notch" aria-hidden="true" />
                  <img
                    :src="feature.image"
                    :alt="feature.alt"
                    width="390"
                    height="844"
                    loading="lazy"
                    class="phone__screen"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="quote" aria-label="品牌引言">
        <blockquote class="quote__inner" data-reveal>
          <p class="quote__text">最美的台北風景，<br />就在你身邊。</p>
          <footer class="quote__cite">漫遊台北 · 城市旅遊指南</footer>
        </blockquote>
      </section>

      <section class="section" aria-labelledby="source-heading">
        <div class="section__inner">
          <div class="source-card" data-reveal>
            <span class="source-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <path
                  fill="currentColor"
                  d="M11 10.5h2v6h-2zM12 6.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
                />
              </svg>
            </span>
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
                travel.taipei
                <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 17 17 7M9 7h8v8"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="legal-heading">
        <div class="section__inner">
          <header class="section__header section__header--start" data-reveal>
            <p class="eyebrow"><em>Support</em></p>
            <h2 id="legal-heading">法規與支援</h2>
            <p class="section__lead">
              使用 App 前，歡迎先閱讀我們的隱私權政策與使用者條款。
            </p>
          </header>

          <div class="legal-cards" data-reveal>
            <RouterLink to="/contact" class="legal-card">
              <span class="legal-card__title">聯絡我們</span>
              <span class="legal-card__chevron" aria-hidden="true">›</span>
            </RouterLink>
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

      <section class="cta">
        <div class="cta__inner" data-reveal>
          <p class="cta__eyebrow"><em>Ready to explore</em></p>
          <h2 class="cta__title">準備好出發了嗎？</h2>
          <p class="cta__desc">
            立即下載漫遊台北，讓城市的精彩景點陪你走過每一段旅程。
          </p>
          <StoreBadges />
        </div>
      </section>
    </div>
  </SiteLayout>
</template>

<style scoped>
.home {
  overflow-x: clip;
}

[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ease,
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0s);
}

[data-reveal].is-revealed {
  opacity: 1;
  transform: none;
}

/* Hero ------------------------------------------------------------ */
.hero {
  position: relative;
  padding-block: 3rem 4rem;
  padding-inline: 1.25rem;
  background: linear-gradient(180deg, #fff 0%, var(--color-bg) 100%);
  overflow: clip;
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  pointer-events: none;
}

.hero__glow--teal {
  inset-block-start: -120px;
  inset-inline-end: -80px;
  width: 360px;
  height: 360px;
  background: var(--color-teal-soft);
}

.hero__glow--blue {
  inset-block-end: -140px;
  inset-inline-start: -100px;
  width: 380px;
  height: 380px;
  background: var(--color-accent-soft);
}

.hero__inner {
  position: relative;
  max-width: var(--max-width);
  margin-inline: auto;
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-teal);
  letter-spacing: 0.02em;
}

.hero__eyebrow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-teal);
  box-shadow: 0 0 0 4px var(--color-teal-soft);
}

.hero__title {
  font-family: var(--font-serif);
  font-size: clamp(2.75rem, 7vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.01em;
  margin-block-end: 0.5rem;
}

.hero__subtitle {
  margin: 0 0 1.25rem;
  font-size: clamp(1.15rem, 3vw, 1.4rem);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.hero__desc {
  margin: 0 0 1.75rem;
  max-width: 34rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.hero__note {
  margin-block-start: 1rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.hero__device {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero__pin {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  color: #fff;
  background: var(--color-pin);
  border-radius: 50% 50% 50% 2px;
  box-shadow: var(--shadow-md);
  animation: float 5s ease-in-out infinite;
}

.hero__pin--1 {
  inset-block-start: 6%;
  inset-inline-start: 4%;
  width: 40px;
  height: 40px;
}

.hero__pin--2 {
  inset-block-end: 14%;
  inset-inline-end: 2%;
  width: 34px;
  height: 34px;
  background: var(--color-accent);
  animation-delay: 1.4s;
}

/* Phone mockup ---------------------------------------------------- */
.phone {
  position: relative;
  padding: 10px;
  background: #1d1d1f;
  border-radius: 38px;
  box-shadow: var(--shadow-lg);
}

.phone__notch {
  position: absolute;
  inset-block-start: 16px;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  z-index: 3;
  width: 38%;
  height: 22px;
  background: #1d1d1f;
  border-radius: 0 0 14px 14px;
}

.phone__screen {
  width: 100%;
  border-radius: 28px;
  display: block;
}

.phone--hero {
  width: min(290px, 78vw);
  animation: float 7s ease-in-out infinite;
}

.phone--feature {
  width: min(248px, 70vw);
  margin-inline: auto;
}

/* Marquee --------------------------------------------------------- */
.marquee {
  padding-block: 1.25rem;
  background: var(--color-surface);
  border-block: 1px solid var(--color-border);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 12%,
    #000 88%,
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 12%,
    #000 88%,
    transparent
  );
}

.marquee__track {
  display: flex;
  gap: 0.75rem;
  width: max-content;
  animation: marquee 36s linear infinite;
}

.marquee__chip {
  flex-shrink: 0;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-surface);
}

/* Section scaffolding -------------------------------------------- */
.section {
  padding-block: clamp(3rem, 7vw, 5rem);
  padding-inline: 1.25rem;
}

.section--muted {
  background: var(--color-surface-muted);
}

.section__inner {
  max-width: var(--max-width);
  margin-inline: auto;
}

.section__header {
  max-width: 40rem;
  margin-inline: auto;
  margin-block-end: 2.75rem;
  text-align: center;
}

.section__header--start {
  margin-inline: 0;
  text-align: start;
}

.eyebrow {
  margin: 0 0 0.6rem;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-teal);
}

.eyebrow em {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 600;
}

.section__header h2 {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 4vw, 2.25rem);
  font-weight: 700;
  margin-block-end: 0.75rem;
}

.section__lead {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

/* Values ---------------------------------------------------------- */
.values__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
}

.value-card {
  padding: 2rem 1.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.value-card__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-block-end: 1rem;
  color: var(--color-teal);
  background: var(--color-teal-soft);
  border-radius: 16px;
}

.value-card h3 {
  font-size: 1.2rem;
  margin-block-end: 0.5rem;
}

.value-card p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.75;
}

/* Features -------------------------------------------------------- */
.features__list {
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 7vw, 5rem);
}

.feature {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.feature__index {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-teal);
  opacity: 0.35;
}

.feature__kicker {
  margin: 0.5rem 0 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.feature__kicker em {
  font-family: var(--font-serif);
  font-style: italic;
}

.feature__title {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin-block-end: 0.75rem;
}

.feature__desc {
  max-width: 30rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-block-end: 1.25rem;
}

.feature__tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature__tags li {
  margin: 0;
  padding: 0.35rem 0.8rem;
  background: var(--color-teal-soft);
  color: var(--color-teal);
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
}

/* Quote ----------------------------------------------------------- */
.quote {
  padding-block: clamp(3rem, 8vw, 5.5rem);
  padding-inline: 1.25rem;
  background: linear-gradient(180deg, var(--color-bg), var(--color-surface));
}

.quote__inner {
  max-width: 44rem;
  margin-inline: auto;
  text-align: center;
}

.quote__text {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.4;
  color: var(--color-text);
  margin: 0 0 1rem;
}

.quote__cite {
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

/* Source card ----------------------------------------------------- */
.source-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.75rem 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.source-card__icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--color-accent);
  background: var(--color-accent-soft);
  border-radius: 12px;
}

.source-card__content h2 {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  margin-block-end: 0.5rem;
}

.source-card__content p {
  color: var(--color-text-secondary);
  margin-block-end: 0.85rem;
}

.source-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}

.source-card__link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  text-decoration: none;
}

/* Legal cards ----------------------------------------------------- */
.legal-cards {
  display: grid;
  gap: 1rem;
}

.legal-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.15rem 1.35rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease;
}

.legal-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  color: var(--color-accent);
  text-decoration: none;
}

.legal-card__chevron {
  color: var(--color-text-muted);
  font-size: 1.35rem;
  line-height: 1;
}

/* CTA ------------------------------------------------------------- */
.cta {
  padding-block: clamp(3.5rem, 8vw, 5.5rem);
  padding-inline: 1.25rem;
  background:
    radial-gradient(
      120% 120% at 80% 0%,
      rgba(13, 148, 136, 0.45),
      transparent 60%
    ),
    linear-gradient(135deg, #0b3d3a 0%, #0f2a30 100%);
}

.cta__inner {
  max-width: 44rem;
  margin-inline: auto;
  text-align: center;
  color: #fff;
}

.cta__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.cta__eyebrow em {
  font-family: var(--font-serif);
  font-style: italic;
}

.cta__title {
  font-family: var(--font-serif);
  font-size: clamp(1.9rem, 5vw, 2.75rem);
  font-weight: 700;
  color: #fff;
  margin-block-end: 0.85rem;
}

.cta__desc {
  margin: 0 auto 1.75rem;
  max-width: 30rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
}

.cta :deep(.store-badges) {
  justify-content: center;
}

/* Animations ------------------------------------------------------ */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Responsive ------------------------------------------------------ */
@media (width >= 720px) {
  .values__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .legal-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (width >= 900px) {
  .hero {
    padding-block: 4.5rem 5.5rem;
  }

  .hero__inner {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 3.5rem;
  }

  .feature {
    grid-template-columns: 1fr 1fr;
    gap: 3.5rem;
  }

  .feature:nth-child(even) .feature__body {
    order: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .phone--hero,
  .hero__pin {
    animation: none;
  }

  .marquee__track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
  }
}
</style>
