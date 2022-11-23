import React from 'react';

import developer from '@public/lottie/developer.json';
import useLottieAnimation from '../hooks/useLottieAnimation';

const DevAnimation: React.FC = () => {
  const { ref } = useLottieAnimation({
    animationData: developer,
    rendererSettings: {
      title: 'desenvolvedor escrevendo códigos',
    },
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });

  return <div ref={ref} />;
};

export default DevAnimation;
