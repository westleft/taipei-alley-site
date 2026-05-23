import type { Meta, StoryObj } from '@storybook/vue3';
import SiteLayout from '../components/SiteLayout.vue';

const meta = {
  title: 'Components/SiteLayout',
  component: SiteLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    route: '/',
  },
} satisfies Meta<typeof SiteLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { SiteLayout },
    template: `
      <SiteLayout>
        <section style="padding: 3rem 1.25rem; max-width: 720px; margin: 0 auto;">
          <h1 style="margin: 0 0 1rem;">頁面內容區塊</h1>
          <p style="color: var(--color-text-secondary); margin: 0;">
            SiteLayout 包含頂部導覽、主要內容插槽與頁尾。
          </p>
        </section>
      </SiteLayout>
    `,
  }),
};
