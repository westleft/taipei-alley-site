import type { Meta, StoryObj } from '@storybook/vue3';
import AppFooter from '../components/AppFooter.vue';

const meta = {
  title: 'Components/AppFooter',
  component: AppFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    route: '/',
  },
} satisfies Meta<typeof AppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
