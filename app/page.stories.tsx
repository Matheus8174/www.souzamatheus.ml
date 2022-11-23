import { Meta, StoryFn } from '@storybook/react';
import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';

import Home from '@pages/page';

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
      canvas.getByText(
        'Trabalho no desenvolvimento de aplicações web performáticas e com foco na experiência de usuário.',
      ),
    ).toBeInTheDocument(),
  );
};
