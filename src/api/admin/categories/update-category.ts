import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export interface IUpdateCategoryVariables {
  id: string;
  data: FormData;
}

export const updateCategory = (data: IUpdateCategoryVariables) => {
  return axiosRequest({
    method: 'PUT',
    url: `/api/v1/admin/categories/${data.id}`,
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
    data: data.data,
  });
};

export const useUpdateCategory = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, IUpdateCategoryVariables>(updateCategory, {
    onSuccess,
    onError,
  });
};
