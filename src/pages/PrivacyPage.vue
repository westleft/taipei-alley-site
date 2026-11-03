<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SiteLayout from '../components/SiteLayout.vue';
import LegalDocument from '../components/LegalDocument.vue';

interface RawBlock {
  type: 'p' | 'ul';
  html?: string;
  items?: string[];
}
interface RawSection {
  heading: string;
  blocks: RawBlock[];
}

const { t, tm, rt } = useI18n();

const sections = computed(() =>
  (tm('privacy.sections') as RawSection[]).map((section) => ({
    heading: rt(section.heading),
    blocks: section.blocks.map((block) => ({
      type: block.type,
      html: block.html != null ? rt(block.html) : undefined,
      items: block.items ? block.items.map((item) => rt(item)) : undefined,
    })),
  })),
);
</script>

<template>
  <SiteLayout>
    <LegalDocument
      :title="t('privacy.title')"
      :updated-at="t('privacy.updatedAt')"
      :updated-label="t('legal.updatedLabel')"
      :intro="t('privacy.intro')"
      :sections="sections"
    />
  </SiteLayout>
</template>
