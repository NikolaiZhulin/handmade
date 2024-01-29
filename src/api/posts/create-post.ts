import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const createPost = (data: FormData) => {
  return axiosRequest<FormData, number>({
    method: 'POST',
    url: '/api/v1/posts/create',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
    data,
  });
};

export const useCreatePost = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<number, AxiosError<IApiError>, FormData>((data) => createPost(data), {
    onSuccess,
    onError,
  });
};
