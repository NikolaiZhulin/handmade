import { useState, useEffect } from 'react';

export const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);
  const [, setMediaQueryList] = useState<MediaQueryList>();
  useEffect(() => {
    const handler = () => {
      const list = window.matchMedia(mediaQuery);
      setMediaQueryList(list);
      setIsMatch(list.matches);
    };
    handler();
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [mediaQuery]);

  return isMatch;
};
