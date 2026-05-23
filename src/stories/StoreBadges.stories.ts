import type { Meta, StoryObj } from '@storybook/vue3';
import StoreBadges from '../components/StoreBadges.vue';

const meta = {
  title: 'Components/StoreBadges',
  component: StoreBadges,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StoreBadges>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
