import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useRef } from 'react';

import { MY_FAVOURITE_POSTS } from '@/api/posts/get-favourite';
import { UserContext } from '@/contexts/UserContext';
import { accessTokenService, refreshTokenService } from '@/helpers/tokens/tokenService';
import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';

export const useAuthBChanel = (name: string) => {
  const bc = useRef<BroadcastChannel | null>();
  const [, changeState] = useContext(UserContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    bc.current = new BroadcastChannel(name);

    bc.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      accessTokenCookie.create(data.accessToken);
      refreshTokenCookie.create(data.refreshToken);
      accessTokenService.setToken({ token: data.accessToken });
      refreshTokenService.setToken({ token: data.refreshToken });
      changeState?.({ ...data });
      queryClient.invalidateQueries([MY_FAVOURITE_POSTS]);
    };

    return () => {
      bc.current?.close();
    };
  }, []);
};
