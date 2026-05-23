import type { Meta, StoryObj } from '@storybook/vue3';
import TermsPage from '../../pages/TermsPage.vue';

const meta = {
  title: 'Pages/TermsPage',
  component: TermsPage,
  parameters: {
    layout: 'fullscreen',
    route: '/terms',
  },
} satisfies Meta<typeof TermsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
