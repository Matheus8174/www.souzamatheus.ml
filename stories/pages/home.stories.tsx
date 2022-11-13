import { Meta, StoryFn } from '@storybook/react';
import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';

import Home from '@pages/index';

export default {
  title: 'Pages/Home',
  component: Home,
} as Meta;

const Template = () => <Home />;

export const Default: StoryFn = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() =>
    expect(
      canvas.getByText('Typescript, Tailwind and Storybook.'),
    ).toBeInTheDocument(),
  );
};
