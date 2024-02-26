import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

const deleteWord = (id: string) => {
  return axiosRequest<string, void>({
    method: 'DELETE',
    url: `/api/admin/key-words/${id}`,
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
  });
};

export const useDeleteWord = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, string>(deleteWord, {
    onSuccess,
    onError,
  });
};
