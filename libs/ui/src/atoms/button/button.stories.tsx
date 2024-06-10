import type { Meta, StoryFn } from '@storybook/react';
import { Button } from './index';
import { action } from '@storybook/addon-actions';
import '../../themes/moi.css';
const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

const StoryTemplate: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = StoryTemplate.bind({});
Default.args = {
  variant: 'default',
  size: 'default',
  children: 'Default Button',
};

export const Destructive = StoryTemplate.bind({});
Destructive.args = {
  variant: 'destructive',
  size: 'default',
  children: 'Destructive Button',
};

export const Outline = StoryTemplate.bind({});
Outline.args = {
  variant: 'outline',
  size: 'default',
  children: 'Outline Button',
};

export const Secondary = StoryTemplate.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'default',
  children: 'Secondary Button',
};

export const Ghost = StoryTemplate.bind({});
Ghost.args = {
  variant: 'ghost',
  size: 'default',
  children: 'Ghost Button',
};

export const Link = StoryTemplate.bind({});
Link.args = {
  variant: 'link',
  size: 'default',
  children: 'Link Button',
};

export const Small = StoryTemplate.bind({});
Small.args = {
  variant: 'default',
  size: 'sm',
  children: 'Small Button',
};

export const Large = StoryTemplate.bind({});
Large.args = {
  variant: 'default',
  size: 'lg',
  children: 'Large Button',
};

export const Icon = StoryTemplate.bind({});
Icon.args = {
  variant: 'default',
  size: 'icon',
  children: '🔔',
};

export const AsChild = StoryTemplate.bind({});
AsChild.args = {
  asChild: true,
  variant: 'default',
  size: 'default',
  children: <span>Button as Child</span>,
};
