import { useEffect } from 'react';

import { Blocker } from './blocker';

export const useBlockScroll = (isBlocking: boolean) => {
  useEffect(() => {
    if (!isBlocking) {
      return undefined;
    }

    const blocker = Blocker(document.body);

    blocker.block();

    return () => {
      blocker.unblock();
    };
  }, [isBlocking]);
};
