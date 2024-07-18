import { FC, PropsWithChildren, useEffect } from 'react';
import Cookies from 'js-cookie';

import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';
import { ACCESS_TOKEN_KEY } from '@/constants/base';
import { accessTokenService } from '@/helpers/tokens/tokenService';

const TokensWrapper: FC<PropsWithChildren> = ({ children }) => {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
  useEffect(() => {
    if (!accessToken || !accessTokenService.getToken()) {
      accessTokenCookie.remove();
      refreshTokenCookie.remove();
    }
  }, [accessToken]);

  return <>{children}</>;
};

export default TokensWrapper;
