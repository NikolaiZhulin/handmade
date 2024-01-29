import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { accessTokenCookie } from '@/helpers/tokens/tokens';
import { IUser } from '@/types/auth';

export const GET_ME_QUERY = 'me';

export const getMe = (token: string) => {
  return axiosRequest<never, IUser>({
    method: 'GET',
    url: '/api/v1/auth/profile/me',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || '',
    token,
  });
};

export const useGetMe = () => {
  return useQuery([GET_ME_QUERY], () => getMe(accessTokenCookie.value() ?? ''), {
    staleTime: 3600,
  });
};
