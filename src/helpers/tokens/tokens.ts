import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/base';

import { cookie } from './cookie';

export const accessTokenCookie = cookie(ACCESS_TOKEN_KEY);
export const refreshTokenCookie = cookie(REFRESH_TOKEN_KEY);
