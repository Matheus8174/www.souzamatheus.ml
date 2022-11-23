import React from 'react';

import {
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationItem,
  LottiePlayer,
} from 'lottie-web';

type Props = Omit<
  AnimationConfigWithPath<'svg'> | AnimationConfigWithData<'svg'>,
  'container'
> & { animationData: any };

const useLottieAnimation = (animationOptions: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [lottie, setLottie] = React.useState<LottiePlayer | null>(null);

  React.useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  }, []);

  React.useEffect(() => {
    let animation: AnimationItem;

    if (lottie && ref.current) {
      animation = lottie.loadAnimation({
        ...animationOptions,
        container: ref.current,
      });
    }

    return () => animation?.destroy();
  }, [lottie]);

  return {
    ref,
    lottie,
    setLottie,
  };
};

export default useLottieAnimation;
