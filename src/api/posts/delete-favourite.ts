import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const deleteFavourite = (postId: string) => {
  return axiosRequest({
    method: 'DELETE',
    url: `/api/posts/${postId}/favourite`,
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const useDeleteFavourite = (onSuccess?: () => void) => {
  return useMutation<void, AxiosError<IApiError>, string>(
    (postId: string) => deleteFavourite(postId),
    {
      onSuccess: onSuccess,
    },
  );
};
