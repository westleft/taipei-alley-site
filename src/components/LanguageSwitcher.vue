<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { SUPPORTED_LOCALES, setLocale, type AppLocale } from '../i18n';

const { t, locale, messages } = useI18n();

const options = computed(() =>
  SUPPORTED_LOCALES.map((code) => ({
    code,
    label: (messages.value[code] as { langName: string }).langName,
  })),
);

const onChange = (event: Event) => {
  setLocale((event.target as HTMLSelectElement).value as AppLocale);
};
</script>

<template>
  <label class="lang">
    <span class="lang__label">{{ t('languageSwitcher.label') }}</span>
    <select
      class="lang__select"
      :value="locale"
      :aria-label="t('languageSwitcher.label')"
      @change="onChange"
    >
      <option v-for="option in options" :key="option.code" :value="option.code">
        {{ option.label }}
      </option>
    </select>
    <svg
      class="lang__chevron"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  </label>
</template>

<style scoped>
.lang {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.lang__label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.lang__select {
  appearance: none;
  -webkit-appearance: none;
  padding: 0.4rem 1.9rem 0.4rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s;
}

.lang__select:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.lang__select:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.lang__chevron {
  position: absolute;
  inset-inline-end: 0.7rem;
  color: var(--color-text-muted);
  pointer-events: none;
}

@media (max-width: 640px) {
  .lang__select {
    padding: 0.35rem 1.7rem 0.35rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
