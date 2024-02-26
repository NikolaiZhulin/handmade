import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const deleteAllFavourite = () => {
  return axiosRequest({
    method: 'DELETE',
    url: '/api/posts/favourite/all',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const useDeleteAllFavourite = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>>(() => deleteAllFavourite(), {
    onSuccess,
    onError,
  });
};
