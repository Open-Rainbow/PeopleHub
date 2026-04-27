import { Meta, StoryObj } from '@storybook/angular';
import { PlannerCalendarComponent } from './planner-calendar.component';
import { plannerCalendarMockEvents } from '../../../models/component-models/planner-calendar.model';

type Story = StoryObj<PlannerCalendarComponent>;

const meta: Meta<PlannerCalendarComponent> = {
  component: PlannerCalendarComponent,
  title: 'UI/Controls/Planner Calendar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    events: plannerCalendarMockEvents,
    availableViews: ['month', 'week', 'day'],
    initialDate: new Date('2026-04-27T00:00:00')
  }
};

export default meta;

export const Default: Story = {};

export const WeekView: Story = {
  render: (args) => ({
    props: args,
    template: '<ui-planner-calendar [events]="events" [initialDate]="initialDate" [availableViews]="[\'week\', \'day\']"></ui-planner-calendar>'
  })
};

export const ParentUsageExample: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedDateText: 'Nothing selected yet',
      onDateSelected(date: Date): void {
        this['selectedDateText'] = `Selected date: ${date.toDateString()}`;
      }
    },
    template: `
      <section>
        <ui-planner-calendar
          [events]="events"
          [initialDate]="initialDate"
          [availableViews]="availableViews"
          (dateSelected)="onDateSelected($event)">
        </ui-planner-calendar>
        <p>{{ selectedDateText }}</p>
      </section>
    `
  })
};
