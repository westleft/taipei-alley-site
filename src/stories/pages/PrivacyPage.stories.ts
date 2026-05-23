import type { Meta, StoryObj } from '@storybook/vue3';
import PrivacyPage from '../../pages/PrivacyPage.vue';

const meta = {
  title: 'Pages/PrivacyPage',
  component: PrivacyPage,
  parameters: {
    layout: 'fullscreen',
    route: '/privacy',
  },
} satisfies Meta<typeof PrivacyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
