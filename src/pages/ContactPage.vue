<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SiteLayout from '../components/SiteLayout.vue';

const { t } = useI18n();

const feedbackFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSf-XiMH_1beZ5fECNRf9Z8wszh7cAIL4Uw8hfj_3o3qAAOgZg/viewform?usp=publish-editor';
</script>

<template>
  <SiteLayout>
    <section class="contact">
      <div class="contact__inner">
        <p class="contact__eyebrow">{{ t('contact.eyebrow') }}</p>
        <h1>{{ t('contact.title') }}</h1>
        <p class="contact__description">
          {{ t('contact.description') }}
        </p>

        <a
          class="contact__form-link"
          :href="feedbackFormUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('contact.formLink') }}
        </a>

        <p class="contact__hint">
          {{ t('contact.hintLabel') }}
          <a :href="feedbackFormUrl" target="_blank" rel="noopener noreferrer">
            {{ feedbackFormUrl }}
          </a>
        </p>
      </div>
    </section>
  </SiteLayout>
</template>

<style scoped>
.contact {
  padding: 3rem 1.25rem 4rem;
}

.contact__inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.contact__eyebrow {
  margin: 0 0 0.5rem;
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.9rem;
}

h1 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
}

.contact__description {
  margin: 0 0 1.5rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.contact__form-link {
  display: inline-block;
  padding: 0.75rem 1.1rem;
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

.contact__form-link:hover {
  filter: brightness(0.94);
  text-decoration: none;
}

.contact__hint {
  margin: 1.25rem 0 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  word-break: break-all;
}

@media (max-width: 640px) {
  .contact {
    padding-top: 2rem;
  }

  .contact__inner {
    padding: 1.25rem;
  }
}
</style>
