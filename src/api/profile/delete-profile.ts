import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const deleteProfile = () => {
  return axiosRequest({
    method: 'DELETE',
    url: '/api/v1/auth/profile',
    baseURL: process.env.NEXT_AUTH_API_URL,
  });
};

export const useDeleteProfile = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation(() => deleteProfile(), { onSuccess, onError });
};
