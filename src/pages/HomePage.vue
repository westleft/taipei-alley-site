<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SiteLayout from '../components/SiteLayout.vue'
import StoreBadges from '../components/StoreBadges.vue'

const REVEAL_THRESHOLD = 0.12

const { t, tm, rt, locale } = useI18n()

/* Locale-aware App Store screenshots (繁中 / English / 日本語). */
type ShotKey = 'home' | 'explore' | 'list' | 'detail'
const SHOTS: Record<string, Record<ShotKey, string>> = {
  'zh-TW': {
    home: '/images/app/zh-home.webp',
    explore: '/images/app/zh-explore.webp',
    list: '/images/app/zh-list.webp',
    detail: '/images/app/zh-detail.webp',
  },
  en: {
    home: '/images/app/en-home.webp',
    explore: '/images/app/en-explore.webp',
    list: '/images/app/en-list.webp',
    detail: '/images/app/en-detail.webp',
  },
  ja: {
    home: '/images/app/ja-home.webp',
    explore: '/images/app/ja-explore.webp',
    list: '/images/app/ja-list.webp',
    detail: '/images/app/ja-detail.webp',
  },
}
const shots = computed(() => SHOTS[locale.value] ?? SHOTS['zh-TW'])

const categories = computed(() =>
  (tm('home.categories') as string[]).map((category) => rt(category)),
)

const heroChips = computed(() =>
  (tm('home.hero.chips') as string[]).map((chip) => rt(chip)),
)

interface RawStat {
  value: string
  label: string
}
const stats = computed(() =>
  (tm('home.stats') as RawStat[]).map((stat) => ({
    value: rt(stat.value),
    label: rt(stat.label),
  })),
)

interface RawValueCard {
  title: string
  desc: string
}
const valueCards = computed(() =>
  (tm('home.values.cards') as RawValueCard[]).map((card) => ({
    title: rt(card.title),
    desc: rt(card.desc),
  })),
)

const FEATURE_ORDER: ShotKey[] = ['home', 'explore', 'list', 'detail']

interface RawFeature {
  kicker: string
  title: string
  description: string
  alt: string
  tags: string[]
}
const features = computed(() =>
  (tm('home.features.items') as RawFeature[]).map((feature, index) => ({
    index: String(index + 1).padStart(2, '0'),
    kicker: rt(feature.kicker),
    title: rt(feature.title),
    description: rt(feature.description),
    image: shots.value[FEATURE_ORDER[index] ?? 'home'],
    alt: rt(feature.alt),
    tags: feature.tags.map((tag) => rt(tag)),
  })),
)

interface RawMoreCard {
  title: string
  desc: string
}
const moreCards = computed(() =>
  (tm('home.more.cards') as RawMoreCard[]).map((card) => ({
    title: rt(card.title),
    desc: rt(card.desc),
  })),
)

const quoteLines = computed(() =>
  (tm('home.quote.lines') as string[]).map((line) => rt(line)),
)

const pageRef = ref<HTMLElement | null>(null)
const heroStageRef = ref<HTMLElement | null>(null)
const heroTiltRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null
let parallaxItems: { el: HTMLElement; speed: number }[] = []
let parallaxTicking = false

const updateParallax = () => {
  const viewportMid = window.innerHeight / 2
  for (const { el, speed } of parallaxItems) {
    const rect = el.getBoundingClientRect()
    const delta = rect.top + rect.height / 2 - viewportMid
    el.style.transform = `translate3d(0, ${(delta * speed).toFixed(1)}px, 0)`
  }
  parallaxTicking = false
}

const onScroll = () => {
  if (parallaxTicking) return
  parallaxTicking = true
  requestAnimationFrame(updateParallax)
}

let tiltFrame = 0
const onPointerMove = (event: PointerEvent) => {
  const stage = heroStageRef.value
  const tilt = heroTiltRef.value
  if (!stage || !tilt) return
  const rect = stage.getBoundingClientRect()
  const px = (event.clientX - rect.left) / rect.width - 0.5
  const py = (event.clientY - rect.top) / rect.height - 0.5
  cancelAnimationFrame(tiltFrame)
  tiltFrame = requestAnimationFrame(() => {
    tilt.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`)
    tilt.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`)
    tilt.style.setProperty('--lift', `${(Math.abs(px) + Math.abs(py)) * -6}px`)
  })
}

const resetTilt = () => {
  const tilt = heroTiltRef.value
  if (!tilt) return
  tilt.style.setProperty('--rx', '0deg')
  tilt.style.setProperty('--ry', '0deg')
  tilt.style.setProperty('--lift', '0px')
}

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

  // Scroll-linked parallax for background + media layers.
  parallaxItems = Array.from(
    root.querySelectorAll<HTMLElement>('[data-parallax]'),
  ).map((el) => ({ el, speed: Number(el.dataset.parallax) || 0 }))

  if (parallaxItems.length) {
    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  }

  // Pointer-driven tilt on the hero device stack (fine pointers only).
  if (window.matchMedia('(pointer: fine)').matches && heroStageRef.value) {
    heroStageRef.value.addEventListener('pointermove', onPointerMove)
    heroStageRef.value.addEventListener('pointerleave', resetTilt)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  heroStageRef.value?.removeEventListener('pointermove', onPointerMove)
  heroStageRef.value?.removeEventListener('pointerleave', resetTilt)
  cancelAnimationFrame(tiltFrame)
})
</script>

<template>
  <SiteLayout>
    <div ref="pageRef" class="home">
      <!-- Hero ---------------------------------------------------- -->
      <section class="hero">
        <div class="hero__texture" aria-hidden="true" data-parallax="0.06">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M-50 120 Q 300 40 650 150 T 1300 130" />
              <path d="M-50 220 Q 320 140 650 250 T 1300 230" />
              <path d="M-50 330 Q 340 250 650 360 T 1300 340" />
              <path d="M-50 450 Q 360 370 650 470 T 1300 450" />
              <path d="M-50 560 Q 380 480 650 580 T 1300 560" />
            </g>
          </svg>
        </div>
        <span class="hero__kanji" aria-hidden="true" data-parallax="0.16">臺北</span>
        <div
          class="hero__glow hero__glow--teal"
          aria-hidden="true"
          data-parallax="-0.08"
        />
        <div
          class="hero__glow hero__glow--coral"
          aria-hidden="true"
          data-parallax="0.12"
        />

        <div class="hero__inner">
          <div class="hero__copy" data-reveal>
            <p class="hero__eyebrow">
              <span class="hero__eyebrow-dot" aria-hidden="true" />
              {{ t('home.hero.eyebrow') }}
            </p>
            <h1 class="hero__title">{{ t('home.hero.title') }}</h1>
            <p class="hero__subtitle">{{ t('home.hero.subtitle') }}</p>
            <p class="hero__desc">{{ t('home.hero.desc') }}</p>
            <StoreBadges />
            <p class="hero__note">{{ t('home.hero.note') }}</p>
          </div>

          <div
            ref="heroStageRef"
            class="hero__stage"
            data-reveal
            style="--reveal-delay: 0.12s"
          >
            <span
              v-for="(chip, index) in heroChips"
              :key="chip"
              class="hero__chip"
              :class="`hero__chip--${index + 1}`"
              aria-hidden="true"
            >
              <span class="hero__chip-dot" />{{ chip }}
            </span>

            <div ref="heroTiltRef" class="hero__tilt">
              <div class="phone phone--ghost" aria-hidden="true">
                <img
                  :src="shots.detail"
                  alt=""
                  width="390"
                  height="844"
                  class="phone__screen"
                />
              </div>

              <div class="phone phone--hero">
                <span class="phone__notch" aria-hidden="true" />
                <img
                  :src="shots.home"
                  :alt="t('home.hero.deviceAlt')"
                  width="390"
                  height="844"
                  class="phone__screen"
                />
              </div>
            </div>
          </div>
        </div>

        <ul class="hero__stats" data-reveal style="--reveal-delay: 0.2s">
          <li v-for="stat in stats" :key="stat.label" class="stat">
            <span class="stat__value">{{ stat.value }}</span>
            <span class="stat__label">{{ stat.label }}</span>
          </li>
        </ul>
      </section>

      <!-- Category marquee ---------------------------------------- -->
      <section class="marquee" :aria-label="t('home.categoriesLabel')">
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

      <!-- Values -------------------------------------------------- -->
      <section class="section values" aria-labelledby="values-heading">
        <div class="section__inner">
          <header class="section__header" data-reveal>
            <p class="eyebrow"><em>{{ t('home.values.eyebrow') }}</em></p>
            <h2 id="values-heading">{{ t('home.values.heading') }}</h2>
            <p class="section__lead">{{ t('home.values.lead') }}</p>
          </header>

          <ul class="values__grid">
            <li
              v-for="(card, index) in valueCards"
              :key="card.title"
              class="value-card"
              data-reveal
              :style="`--reveal-delay: ${index * 0.1}s`"
            >
              <span class="value-card__icon" aria-hidden="true">
                <svg
                  v-if="index === 0"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                    d="m9 3-6 2.5v15.5l6-2.5 6 2.5 6-2.5V2.5L15 5 9 3Zm0 0v15.5M15 5v15.5"
                  />
                </svg>
                <svg
                  v-else-if="index === 1"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                    d="M12 21s-7-4.6-7-10a7 7 0 0 1 14 0c0 5.4-7 10-7 10Z"
                  />
                  <circle cx="12" cy="11" r="2.4" fill="currentColor" />
                </svg>
                <svg v-else viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 20s2-7 5-7 1-4 4-4 2 5 7 4"
                  />
                  <circle cx="13" cy="5" r="2" fill="currentColor" />
                </svg>
              </span>
              <h3>{{ card.title }}</h3>
              <p>{{ card.desc }}</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- Feature showcase ---------------------------------------- -->
      <section
        class="section section--muted features"
        aria-labelledby="features-heading"
      >
        <div class="section__inner">
          <header class="section__header" data-reveal>
            <p class="eyebrow"><em>{{ t('home.features.eyebrow') }}</em></p>
            <h2 id="features-heading">{{ t('home.features.heading') }}</h2>
            <p class="section__lead">{{ t('home.features.lead') }}</p>
          </header>

          <div class="features__list">
            <article
              v-for="feature in features"
              :key="feature.index"
              class="feature"
            >
              <div class="feature__body" data-reveal="left">
                <span class="feature__index" aria-hidden="true">
                  {{ feature.index }}
                </span>
                <p class="feature__kicker"><em>{{ feature.kicker }}</em></p>
                <h3 class="feature__title">{{ feature.title }}</h3>
                <p class="feature__desc">{{ feature.description }}</p>
                <ul class="feature__tags">
                  <li v-for="tag in feature.tags" :key="tag">{{ tag }}</li>
                </ul>
              </div>

              <div class="feature__media" data-reveal="right">
                <div class="feature__halo" aria-hidden="true" />
                <div class="phone phone--feature" data-parallax="-0.04">
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

      <!-- More capabilities --------------------------------------- -->
      <section class="section more" aria-labelledby="more-heading">
        <div class="section__inner">
          <header class="section__header" data-reveal>
            <p class="eyebrow"><em>{{ t('home.more.eyebrow') }}</em></p>
            <h2 id="more-heading">{{ t('home.more.heading') }}</h2>
            <p class="section__lead">{{ t('home.more.lead') }}</p>
          </header>

          <ul class="more__grid">
            <li
              v-for="(card, index) in moreCards"
              :key="card.title"
              class="more-card"
              data-reveal
              :style="`--reveal-delay: ${index * 0.08}s`"
            >
              <span class="more-card__icon" aria-hidden="true">
                <svg
                  v-if="index === 0"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                    d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14"
                  />
                </svg>
                <svg
                  v-else-if="index === 1"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                    d="M12 21s-7-4.6-7-10a7 7 0 0 1 14 0c0 5.4-7 10-7 10Z"
                  />
                </svg>
                <svg
                  v-else-if="index === 2"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                    d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.5L6 20V5a1 1 0 0 1 1-1Z"
                  />
                </svg>
                <svg v-else viewBox="0 0 24 24" width="22" height="22">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"
                  />
                </svg>
              </span>
              <h3>{{ card.title }}</h3>
              <p>{{ card.desc }}</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- Quote --------------------------------------------------- -->
      <section class="quote" :aria-label="t('home.quote.label')">
        <span class="quote__kanji" aria-hidden="true" data-parallax="0.12">漫遊</span>
        <blockquote class="quote__inner" data-reveal>
          <span class="quote__mark" aria-hidden="true">&ldquo;</span>
          <p class="quote__text">
            <template v-for="(line, index) in quoteLines" :key="index">
              <br v-if="index > 0" />{{ line }}
            </template>
          </p>
          <footer class="quote__cite">{{ t('home.quote.cite') }}</footer>
        </blockquote>
      </section>

      <!-- Source -------------------------------------------------- -->
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
              <h2 id="source-heading">{{ t('home.source.heading') }}</h2>
              <p v-html="t('home.source.body')" />
              <a
                class="source-card__link"
                href="https://www.travel.taipei/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ t('home.source.link') }}
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

      <!-- Support / legal ----------------------------------------- -->
      <section class="section" aria-labelledby="legal-heading">
        <div class="section__inner">
          <header class="section__header section__header--start" data-reveal>
            <p class="eyebrow"><em>{{ t('home.support.eyebrow') }}</em></p>
            <h2 id="legal-heading">{{ t('home.support.heading') }}</h2>
            <p class="section__lead">{{ t('home.support.lead') }}</p>
          </header>

          <div class="legal-cards" data-reveal>
            <RouterLink to="/contact" class="legal-card">
              <span class="legal-card__title">{{ t('nav.contact') }}</span>
              <span class="legal-card__chevron" aria-hidden="true">›</span>
            </RouterLink>
            <RouterLink to="/privacy" class="legal-card">
              <span class="legal-card__title">{{ t('nav.privacy') }}</span>
              <span class="legal-card__chevron" aria-hidden="true">›</span>
            </RouterLink>
            <RouterLink to="/terms" class="legal-card">
              <span class="legal-card__title">{{ t('nav.terms') }}</span>
              <span class="legal-card__chevron" aria-hidden="true">›</span>
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- CTA ----------------------------------------------------- -->
      <section id="download" class="cta">
        <div class="cta__texture" aria-hidden="true">
          <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M-50 90 Q 300 20 650 110 T 1300 90" />
              <path d="M-50 200 Q 320 130 650 220 T 1300 200" />
              <path d="M-50 310 Q 340 240 650 330 T 1300 310" />
            </g>
          </svg>
        </div>
        <div class="cta__inner" data-reveal>
          <p class="cta__eyebrow"><em>{{ t('home.cta.eyebrow') }}</em></p>
          <h2 class="cta__title">{{ t('home.cta.title') }}</h2>
          <p class="cta__desc">{{ t('home.cta.desc') }}</p>
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
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0s);
}

[data-reveal='left'] {
  transform: translateX(-46px);
}

[data-reveal='right'] {
  transform: translateX(46px);
}

[data-reveal].is-revealed {
  opacity: 1;
  transform: none;
}

[data-parallax] {
  will-change: transform;
}

/* Hero ------------------------------------------------------------ */
.hero {
  position: relative;
  padding-block: 2.75rem 3rem;
  padding-inline: 1.25rem;
  background:
    radial-gradient(130% 90% at 85% -10%, var(--color-coral-soft), transparent 55%),
    linear-gradient(180deg, #fffdf8 0%, var(--color-bg) 100%);
  overflow: clip;
}

.hero__texture {
  position: absolute;
  inset: 0;
  color: var(--color-teal);
  opacity: 0.08;
  pointer-events: none;
}

.hero__texture svg {
  width: 100%;
  height: 100%;
}

.hero__kanji {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: -2%;
  translate: 0 -50%;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(14rem, 34vw, 30rem);
  line-height: 0.8;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(15, 118, 110, 0.12);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
  pointer-events: none;
}

.hero__glow--teal {
  inset-block-start: -130px;
  inset-inline-end: -60px;
  width: 360px;
  height: 360px;
  background: var(--color-teal-soft);
}

.hero__glow--coral {
  inset-block-end: -160px;
  inset-inline-start: -120px;
  width: 380px;
  height: 380px;
  background: var(--color-coral-soft);
}

.hero__inner {
  position: relative;
  z-index: 2;
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
  margin: 0 0 0.9rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--color-teal-strong);
  letter-spacing: 0.01em;
}

.hero__eyebrow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-coral);
  box-shadow: 0 0 0 4px var(--color-coral-soft);
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.9rem, 8vw, 4.6rem);
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.04;
  margin-block-end: 0.6rem;
}

.hero__subtitle {
  margin: 0 0 1.3rem;
  font-size: clamp(1.15rem, 3vw, 1.45rem);
  font-weight: 500;
  color: var(--color-teal-strong);
}

.hero__desc {
  margin: 0 0 1.9rem;
  max-width: 34rem;
  color: var(--color-text-secondary);
  line-height: 1.85;
}

.hero__note {
  margin-block-start: 1.1rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

/* Device stage ---------------------------------------------------- */
.hero__stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 420px;
  perspective: 1100px;
}

.hero__tilt {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transform: translateY(var(--lift, 0))
    rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero__chip {
  position: absolute;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-pill);
  background: rgba(255, 253, 248, 0.86);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  animation: float 6s ease-in-out infinite;
}

.hero__chip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-teal);
}

.hero__chip--1 {
  inset-block-start: 8%;
  inset-inline-start: -2%;
}

.hero__chip--2 {
  inset-block-start: 42%;
  inset-inline-end: -4%;
  animation-delay: 1.1s;
}

.hero__chip--2 .hero__chip-dot {
  background: var(--color-coral);
}

.hero__chip--3 {
  inset-block-end: 9%;
  inset-inline-start: 4%;
  animation-delay: 2.1s;
}

/* Phone mockup ---------------------------------------------------- */
.phone {
  position: relative;
  padding: 9px;
  background: #15201d;
  border-radius: 40px;
  box-shadow: var(--shadow-lg);
}

.phone__notch {
  position: absolute;
  inset-block-start: 15px;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  z-index: 3;
  width: 34%;
  height: 20px;
  background: #15201d;
  border-radius: 0 0 14px 14px;
}

.phone__screen {
  width: 100%;
  border-radius: 31px;
  display: block;
}

.phone--hero {
  position: relative;
  z-index: 2;
  width: min(282px, 72vw);
  animation: float 7s ease-in-out infinite;
}

.phone--ghost {
  position: absolute;
  z-index: 1;
  width: min(236px, 60vw);
  inset-inline-end: 6%;
  inset-block-start: 10%;
  transform: rotate(6deg);
  opacity: 0.92;
  filter: saturate(0.96);
}

/* Hero stats ------------------------------------------------------ */
.hero__stats {
  position: relative;
  z-index: 2;
  list-style: none;
  margin: 2.75rem auto 0;
  padding: 1.4rem 1rem;
  max-width: var(--max-width);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  text-align: center;
  position: relative;
}

.stat__value {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 5vw, 2.3rem);
  font-weight: 600;
  line-height: 1;
  color: var(--color-teal);
}

.stat__label {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* Marquee --------------------------------------------------------- */
.marquee {
  padding-block: 1.1rem;
  background: var(--color-teal-ink);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.marquee__track {
  display: flex;
  gap: 0.75rem;
  width: max-content;
  animation: marquee 38s linear infinite;
}

.marquee__chip {
  flex-shrink: 0;
  padding: 0.5rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-pill);
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

/* Section scaffolding -------------------------------------------- */
.section {
  padding-block: clamp(3.25rem, 7vw, 5.5rem);
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
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-coral);
}

.eyebrow em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  text-transform: none;
}

.section__header h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4.2vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.01em;
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
  gap: clamp(3.5rem, 7vw, 5.5rem);
}

.feature {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.feature__index {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-teal);
  opacity: 0.3;
}

.feature__kicker {
  margin: 0.5rem 0 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-coral);
}

.feature__kicker em {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  text-transform: none;
}

.feature__title {
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 4vw, 2.1rem);
  font-weight: 600;
  letter-spacing: -0.01em;
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
  color: var(--color-teal-strong);
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
}

.feature__media {
  position: relative;
  display: grid;
  place-items: center;
}

.feature__halo {
  position: absolute;
  width: 78%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-teal-soft), transparent 68%);
  filter: blur(8px);
}

.phone--feature {
  position: relative;
  width: min(252px, 70vw);
  margin-inline: auto;
}

/* More capabilities ---------------------------------------------- */
.more__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.1rem;
}

.more-card {
  padding: 1.6rem 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.more-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-teal-soft);
}

.more-card__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-block-end: 0.85rem;
  color: var(--color-teal);
  background: var(--color-teal-soft);
  border-radius: 13px;
}

.more-card h3 {
  font-size: 1.08rem;
  margin-block-end: 0.4rem;
}

.more-card p {
  margin: 0;
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* Quote ----------------------------------------------------------- */
.quote {
  position: relative;
  padding-block: clamp(3.5rem, 8vw, 6rem);
  padding-inline: 1.25rem;
  background: linear-gradient(180deg, var(--color-surface-muted), var(--color-bg));
  overflow: clip;
}

.quote__kanji {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  translate: -50% -50%;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(12rem, 40vw, 34rem);
  line-height: 0.8;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(224, 106, 77, 0.1);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.quote__inner {
  position: relative;
  z-index: 1;
  max-width: 46rem;
  margin-inline: auto;
  text-align: center;
}

.quote__mark {
  display: block;
  font-family: var(--font-display);
  font-size: 4rem;
  line-height: 0.6;
  color: var(--color-coral);
  opacity: 0.55;
  margin-block-end: 0.75rem;
}

.quote__text {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 5vw, 2.85rem);
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0 0 1.1rem;
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
  color: var(--color-teal);
  background: var(--color-teal-soft);
  border-radius: 12px;
}

.source-card__content h2 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
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
  border-color: var(--color-teal);
  color: var(--color-teal);
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
  color: var(--color-teal);
  text-decoration: none;
}

.legal-card__chevron {
  color: var(--color-text-muted);
  font-size: 1.35rem;
  line-height: 1;
}

/* CTA ------------------------------------------------------------- */
.cta {
  position: relative;
  padding-block: clamp(3.5rem, 8vw, 6rem);
  padding-inline: 1.25rem;
  overflow: clip;
  background:
    radial-gradient(120% 130% at 82% 0%, rgba(15, 118, 110, 0.55), transparent 58%),
    linear-gradient(140deg, #0b4a44 0%, #09332f 100%);
}

.cta__texture {
  position: absolute;
  inset: 0;
  color: #fff;
  opacity: 0.08;
  pointer-events: none;
}

.cta__texture svg {
  width: 100%;
  height: 100%;
}

.cta__inner {
  position: relative;
  max-width: 44rem;
  margin-inline: auto;
  text-align: center;
  color: #fff;
}

.cta__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.cta__eyebrow em {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  text-transform: none;
}

.cta__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.9rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #fff;
  margin-block-end: 0.85rem;
}

.cta__desc {
  margin: 0 auto 1.9rem;
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

.phone--ghost {
  animation: floatGhost 7.5s ease-in-out infinite;
}

@keyframes floatGhost {
  0%,
  100% {
    transform: rotate(6deg) translateY(0);
  }
  50% {
    transform: rotate(6deg) translateY(-12px);
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
@media (width >= 560px) {
  .hero__stats {
    grid-template-columns: repeat(4, 1fr);
  }

  .stat + .stat::before {
    content: '';
    position: absolute;
    inset-inline-start: -0.25rem;
    inset-block: 0.1rem;
    width: 1px;
    background: var(--color-border);
  }
}

@media (width >= 720px) {
  .values__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .more__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .legal-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (width >= 900px) {
  .hero {
    padding-block: 4rem 4.5rem;
  }

  .hero__inner {
    grid-template-columns: 1.02fr 0.98fr;
    gap: 3.25rem;
  }

  .hero__stage {
    min-height: 500px;
  }

  .more__grid {
    grid-template-columns: repeat(4, 1fr);
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
  .phone--ghost,
  .hero__chip {
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
