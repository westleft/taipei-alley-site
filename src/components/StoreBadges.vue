<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../config/store-links';

const { t } = useI18n();
</script>

<template>
  <div class="store-badges">
    <a
      class="store-badge"
      :href="APP_STORE_URL"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="t('store.appStoreAria')"
    >
      <svg
        class="store-badge__svg"
        viewBox="0 0 140 42"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="140" height="42" rx="9" fill="#15201d" />
        <rect
          x="0.5"
          y="0.5"
          width="139"
          height="41"
          rx="8.5"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
        />
        <path
          fill="#fff"
          transform="translate(14 8.5)"
          d="M18.8 13.6c-.02-2.45 2-3.63 2.1-3.69-1.14-1.67-2.92-1.9-3.55-1.92-1.5-.15-2.95.89-3.72.89-.76 0-1.94-.87-3.2-.85-1.64.03-3.16.96-4.01 2.43-1.72 2.96-.44 7.35 1.23 9.76.82 1.18 1.8 2.5 3.09 2.46 1.24-.05 1.7-.8 3.2-.8 1.49 0 1.91.8 3.21.76 1.33-.02 2.17-1.2 2.98-2.39.94-1.37 1.33-2.7 1.35-2.77-.03-.01-2.6-1-2.62-3.94zM16.4 6.1c.68-.82 1.14-1.96 1.01-3.1-.98.04-2.16.65-2.86 1.46-.62.72-1.17 1.88-1.03 3 .86.07 1.75-.44 2.25-1.04z"
        />
        <text
          x="46"
          y="17"
          fill="rgba(255,255,255,0.72)"
          font-size="7.5"
          font-family="system-ui, sans-serif"
        >
          {{ t('store.appStoreSmall') }}
        </text>
        <text
          x="46"
          y="31"
          fill="#fff"
          font-size="14"
          font-weight="600"
          font-family="system-ui, sans-serif"
        >
          {{ t('store.appStoreName') }}
        </text>
      </svg>
    </a>

    <a
      class="store-badge"
      :href="GOOGLE_PLAY_URL"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="t('store.googlePlayAria')"
    >
      <svg
        class="store-badge__svg"
        viewBox="0 0 140 42"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="140" height="42" rx="9" fill="#15201d" />
        <rect
          x="0.5"
          y="0.5"
          width="139"
          height="41"
          rx="8.5"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
        />
        <g transform="translate(15 10)">
          <path fill="#00d4ff" d="M0 .9v20.2a.9.9 0 0 0 1.37.77l10.6-10.87L1.37.13A.9.9 0 0 0 0 .9Z" />
          <path fill="#00f076" d="M1.37.13 14.7 7.8l-2.73 2.9L1.37.13Z" />
          <path fill="#ff3a44" d="M11.97 11.3l2.73 2.9L1.37 21.87 11.97 11.3Z" />
          <path fill="#ffce00" d="M14.7 7.8l3.84 2.21a1.26 1.26 0 0 1 0 2.18L14.7 14.2l-3-3.4 3-3Z" />
        </g>
        <text
          x="46"
          y="17"
          fill="rgba(255,255,255,0.72)"
          font-size="7.5"
          font-family="system-ui, sans-serif"
        >
          {{ t('store.googlePlaySmall') }}
        </text>
        <text
          x="46"
          y="31"
          fill="#fff"
          font-size="14"
          font-weight="600"
          font-family="system-ui, sans-serif"
        >
          {{ t('store.googlePlayName') }}
        </text>
      </svg>
    </a>
  </div>
</template>

<style scoped>
.store-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.store-badge {
  display: block;
  line-height: 0;
  border-radius: 8px;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.store-badge:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.store-badge:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.store-badge__svg {
  display: block;
  height: 46px;
  width: auto;
}
</style>
