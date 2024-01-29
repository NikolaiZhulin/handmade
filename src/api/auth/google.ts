import { axiosRequest } from '@/helpers/axiosRequest';

export const googleAuth = () => {
  return axiosRequest({
    method: 'GET',
    url: '/api/v1/auth/google',
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || '',
  });
};
