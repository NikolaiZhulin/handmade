import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const updateProfile = (data: FormData) => {
  return axiosRequest({
    method: 'PUT',
    url: '/api/profile',
    baseURL: process.env.NEXT_AUTH_API_URL,
    data,
  });
};

export const useUpdateProfile = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError, any>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, FormData>(
    (data: FormData) => updateProfile(data),
    { onSuccess, onError },
  );
};
