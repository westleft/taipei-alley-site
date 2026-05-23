import type { Meta, StoryObj } from '@storybook/vue3';
import AppHeader from '../components/AppHeader.vue';

const meta = {
  title: 'Components/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  parameters: { route: '/' },
};

export const Privacy: Story = {
  parameters: { route: '/privacy' },
};

export const Terms: Story = {
  parameters: { route: '/terms' },
};
