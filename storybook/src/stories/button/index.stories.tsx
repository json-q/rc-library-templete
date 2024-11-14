import { Button } from 'rclt-components';
import type { Meta, StoryObj } from '@storybook/react';
// export {OtherButton} from "./source/other-button.store"

const meta = {
  title: '基础组件/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonType: Story = {
  name: '按钮类型',
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button type="default">Default Button</Button>
      <Button type="primary">Primary Button</Button>
      <Button type="danger">Danger Button</Button>
    </div>
  ),
};

export const ButtonSize: Story = {
  name: '按钮大小',
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button type="primary" size="small">
        Small Button
      </Button>
      <Button type="primary">Default Button</Button>
      <Button type="primary" size="large">
        Large Button
      </Button>
    </div>
  ),
};
