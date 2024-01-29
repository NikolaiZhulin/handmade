import cookie from 'js-cookie';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/base';

export class TokenService {
  tokenName: string;
  constructor(tokenName: string) {
    this.tokenName = tokenName;
  }
  getToken() {
    return cookie.get(this.tokenName) || '';
  }

  setToken({ token }: { token: string }) {
    cookie.set(this.tokenName, token);
  }
  deleteToken() {
    cookie.remove(this.tokenName);
  }
}

export const accessTokenService = new TokenService(ACCESS_TOKEN_KEY);
export const refreshTokenService = new TokenService(REFRESH_TOKEN_KEY);
