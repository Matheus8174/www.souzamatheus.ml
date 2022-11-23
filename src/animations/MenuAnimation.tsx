import React from 'react';

import menu from '@public/lottie/menu.json';
import useLottieAnimation from '../hooks/useLottieAnimation';

type Props = {
  isMenuOpen: boolean;
};

const MenuAnimation: React.FC<Props> = ({ isMenuOpen }) => {
  const { ref, lottie } = useLottieAnimation({
    animationData: menu,
    rendererSettings: {
      title: 'animação de click no menu',
    },
    renderer: 'svg',
    autoplay: false,
    loop: false,
    initialSegment: [0, 16],
  });

  React.useEffect(() => {
    lottie?.setDirection(isMenuOpen ? 1 : -1);
    lottie?.play();
  }, [isMenuOpen]);

  return <div ref={ref} />;
};

export default MenuAnimation;
