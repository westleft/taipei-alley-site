<script setup lang="ts">
import { useRouter } from 'vue-router';

interface LegalBlock {
  type: 'p' | 'ul';
  html?: string;
  items?: string[];
}

interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

defineProps<{
  title: string;
  updatedAt: string;
  updatedLabel: string;
  intro: string;
  sections: LegalSection[];
}>();

const router = useRouter();

// Keep in-app anchors (marked with data-internal) as SPA navigation instead
// of a full page reload, since the legal body is rendered via v-html.
const onBodyClick = (event: MouseEvent) => {
  const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
    'a[data-internal]',
  );
  if (!anchor) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
    return;
  }
  event.preventDefault();
  const href = anchor.getAttribute('href');
  if (href) router.push(href);
};
</script>

<template>
  <article class="legal-doc">
    <header class="legal-doc__header">
      <h1>{{ title }}</h1>
      <p class="legal-doc__updated">{{ updatedLabel }}：{{ updatedAt }}</p>
    </header>
    <div class="legal-doc__body" @click="onBodyClick">
      <p v-html="intro" />
      <template v-for="(section, index) in sections" :key="index">
        <h2>{{ section.heading }}</h2>
        <template v-for="(block, blockIndex) in section.blocks" :key="blockIndex">
          <p v-if="block.type === 'p'" v-html="block.html" />
          <ul v-else-if="block.type === 'ul'">
            <li
              v-for="(item, itemIndex) in block.items"
              :key="itemIndex"
              v-html="item"
            />
          </ul>
        </template>
      </template>
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
