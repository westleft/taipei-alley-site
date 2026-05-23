import type { Meta, StoryObj } from '@storybook/vue3';
import LegalDocument from '../components/LegalDocument.vue';

const meta = {
  title: 'Components/LegalDocument',
  component: LegalDocument,
  tags: ['autodocs'],
  args: {
    title: '隱私權政策',
    updatedAt: '2026年5月23日',
  },
} satisfies Meta<typeof LegalDocument>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { LegalDocument },
    setup() {
      return { args };
    },
    template: `
      <LegalDocument v-bind="args">
        <p>
          歡迎使用「漫遊台北」。本文件為 Storybook 預覽用的範例內文，實際條款請參閱網站上的完整版本。
        </p>
        <h2>一、適用範圍</h2>
        <p>本政策適用於您透過本 App 及形象網站所提供的資訊。</p>
        <h2>二、聯絡我們</h2>
        <p>若有任何疑問，請透過 App 內「設定 → 聯絡我們」與我們聯繫。</p>
      </LegalDocument>
    `,
  }),
};

export const TermsOfService: Story = {
  args: {
    title: '使用者條款',
    updatedAt: '2026年5月23日',
  },
  render: (args) => ({
    components: { LegalDocument },
    setup() {
      return { args };
    },
    template: `
      <LegalDocument v-bind="args">
        <p>請在使用本服務前，仔細閱讀以下使用者條款。</p>
        <h2>一、服務說明</h2>
        <p>「漫遊台北」為台北旅遊資訊瀏覽工具。</p>
      </LegalDocument>
    `,
  }),
};
