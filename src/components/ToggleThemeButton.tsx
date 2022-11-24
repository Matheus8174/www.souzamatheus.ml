'use client';

import React from 'react';

import { useColorMode, Box } from '@chakra-ui/react';

import toggleLightDark from '@public/lottie/toggle-light-dark.json';
import useLottieAnimation from '../hooks/useLottieAnimation';

const ToggleThemeButton: React.FC = () => {
  const { ref, lottie } = useLottieAnimation({
    animationData: toggleLightDark,
    initialSegment: [0, 35],
    renderer: 'svg',
    loop: false,
    autoplay: false,
  });

  const { toggleColorMode } = useColorMode();

  const toggleIconTheme = React.useRef(false);

  function handleClick() {
    toggleColorMode();

    lottie?.setDirection(toggleIconTheme.current ? -1 : 1);

    lottie?.setSpeed(1.8);
    lottie?.play();

    toggleIconTheme.current = !toggleIconTheme.current;
  }

  return (
    <Box width="20" cursor="pointer" ref={ref} onClick={() => handleClick()} />
  );
};

export default ToggleThemeButton;
