import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const createCategory = (data: FormData) => {
  return axiosRequest({
    method: 'POST',
    url: '/api/admin/categories',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
    data,
  });
};

export const useCreateCategory = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, FormData>(createCategory, {
    onSuccess,
    onError,
  });
};
