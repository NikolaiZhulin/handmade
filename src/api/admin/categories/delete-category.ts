import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const deleteCategory = (id: string) => {
  return axiosRequest({
    method: 'DELETE',
    url: `/api/v1/admin/categories/${id}`,
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
  });
};

export const useDeleteCategory = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, string>(deleteCategory, {
    onSuccess,
    onError,
  });
};
