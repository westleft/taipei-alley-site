import type { Meta, StoryObj } from '@storybook/vue3';
import HomePage from '../../pages/HomePage.vue';

const meta = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    route: '/',
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
