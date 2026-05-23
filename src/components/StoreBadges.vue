<script setup lang="ts">
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../config/store-links';
</script>

<template>
  <div class="store-badges">
    <a
      class="store-badge"
      :href="APP_STORE_URL"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="在 App Store 下載漫遊台北"
    >
      <svg
        class="store-badge__svg"
        viewBox="0 0 135 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="135" height="40" rx="6" fill="#000" />
        <path
          fill="#fff"
          d="M24.77 20.3c-.03-3.2 2.6-4.74 2.72-4.82-1.48-2.16-3.78-2.46-4.6-2.5-1.96-.2-3.82 1.16-4.81 1.16-.99 0-2.52-1.13-4.14-1.1-2.13.03-4.1 1.24-5.2 3.15-2.22 3.84-.57 9.54 1.6 12.66 1.06 1.53 2.33 3.25 4 3.19 1.6-.06 2.2-1.03 4.14-1.03 1.94 0 2.48 1.03 4.17.99 1.72-.03 2.81-1.56 3.86-3.1 1.22-1.78 1.72-3.5 1.75-3.59-.04-.02-3.36-1.29-3.39-5.11zM21.35 12.2c.88-1.06 1.47-2.53 1.31-4-.99.04-2.18.66-2.89 1.47-.81.94-1.52 2.44-1.33 3.88 1.12.09 2.26-.57 2.91-1.35z"
        />
        <text
          x="44"
          y="14"
          fill="#fff"
          font-size="7"
          font-family="system-ui, sans-serif"
        >
          下載於
        </text>
        <text
          x="44"
          y="27"
          fill="#fff"
          font-size="13"
          font-weight="600"
          font-family="system-ui, sans-serif"
        >
          App Store
        </text>
      </svg>
    </a>

    <a
      class="store-badge"
      :href="GOOGLE_PLAY_URL"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="在 Google Play 下載漫遊台北"
    >
      <svg
        class="store-badge__svg"
        viewBox="0 0 135 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="135" height="40" rx="6" fill="#000" />
        <path
          fill="#00d6ff"
          d="M8.5 8.2l7.8 7.8-7.8 7.8V8.2z"
        />
        <path
          fill="#00f076"
          d="M8.5 8.2l7.8 7.8 5.5-3.2L14 5.5 8.5 8.2z"
        />
        <path
          fill="#ff3a44"
          d="M8.5 23.8l7.8-7.8 5.5 3.2-5.5 9.3-7.8-4.7z"
        />
        <path
          fill="#ffb300"
          d="M16.3 16l5.5-3.2L28 5.5 16.3 16z"
        />
        <path
          fill="#ffb300"
          d="M16.3 24l11.7 6.8L21.8 27.2 16.3 24z"
        />
        <text
          x="44"
          y="14"
          fill="#fff"
          font-size="7"
          font-family="system-ui, sans-serif"
        >
          取得於
        </text>
        <text
          x="44"
          y="27"
          fill="#fff"
          font-size="13"
          font-weight="600"
          font-family="system-ui, sans-serif"
        >
          Google Play
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
  height: 40px;
  width: auto;
}
</style>
