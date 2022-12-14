import React from 'react';

import mail from '@public/lottie/mail.json';
import useLottieAnimation from '../hooks/useLottieAnimation';

const MailAnimation: React.FC = () => {
  const { ref } = useLottieAnimation({
    animationData: mail,
    rendererSettings: {
      title: 'animação de e-mail',
    },
    renderer: 'svg',
    autoplay: true,
    loop: true,
  });

  return <div ref={ref} />;
};

export default MailAnimation;
