import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { accessTokenCookie } from '@/helpers/tokens/tokens';
import { IUser } from '@/types/auth';

export const GET_ME_QUERY = 'me';

export const getMe = (token: string) => {
  return axiosRequest<never, IUser>({
    method: 'GET',
    url: '/api/profile/me',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
    token,
  });
};

export const useGetMe = () => {
  return useQuery(
    [GET_ME_QUERY],
    () => {
      return getMe(accessTokenCookie.value() ?? '');
    },
    {
      staleTime: 3600,
    },
  );
};
