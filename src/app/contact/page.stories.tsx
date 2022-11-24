import { Meta, StoryFn } from '@storybook/react';
import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';

import Contact from './page';

export default {
  title: 'Pages/Contact',
  component: Contact,
} as Meta;

const Template = () => <Contact />;

export const Default: StoryFn = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() =>
    expect(
      canvas.getByText('Typescript, Tailwind and Storybook'),
    ).toBeInTheDocument(),
  );
};
