import type { Meta, StoryObj } from '@storybook/vue3';
import ContactPage from '../../pages/ContactPage.vue';

const meta = {
  title: 'Pages/ContactPage',
  component: ContactPage,
  parameters: {
    layout: 'fullscreen',
    route: '/contact',
  },
} satisfies Meta<typeof ContactPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
