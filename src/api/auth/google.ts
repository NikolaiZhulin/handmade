import { axiosRequest } from '@/helpers/axiosRequest';

export const googleAuth = () => {
  return axiosRequest({
    method: 'GET',
    url: '/api/auth/google',
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || '',
  });
};
