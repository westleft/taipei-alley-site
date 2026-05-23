<script setup lang="ts">
defineProps<{
  title: string;
  updatedAt: string;
}>();
</script>

<template>
  <article class="legal-doc">
    <header class="legal-doc__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="legal-doc__body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.legal-doc {
  max-width: 720px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}

.legal-doc__header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.legal-doc__header h1 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  margin-bottom: 0.5rem;
}

.legal-doc__updated {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.legal-doc__body :deep(h2) {
  font-size: 1.15rem;
  margin: 2rem 0 0.75rem;
}

.legal-doc__body :deep(h2:first-child) {
  margin-top: 0;
}

.legal-doc__body :deep(p),
.legal-doc__body :deep(li) {
  color: var(--color-text-secondary);
  line-height: 1.75;
}

.legal-doc__body :deep(strong) {
  color: var(--color-text);
  font-weight: 600;
}

.legal-doc__body :deep(a) {
  font-weight: 500;
}
</style>
