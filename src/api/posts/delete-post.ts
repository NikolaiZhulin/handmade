import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const deletePost = (id: string) => {
  return axiosRequest({
    method: 'DELETE',
    url: `/api/posts/post/${id}`,
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL,
  });
};

export const useDeletePost = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, string>((id) => deletePost(id), {
    onSuccess,
    onError,
  });
};
