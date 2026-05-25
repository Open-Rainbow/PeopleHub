import { Meta, StoryObj } from '@storybook/angular';
import { RecruitmentComponent } from './recruitment.component';

type Story = StoryObj<RecruitmentComponent>;

const meta: Meta<RecruitmentComponent> = {
  component: RecruitmentComponent,
  title: 'recruitment',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

