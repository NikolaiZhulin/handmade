import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const makeFavourite = (postId: string) => {
  return axiosRequest({
    method: 'POST',
    url: `/api/posts/${postId}/favourite`,
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const useMakeFavourite = (onSuccess?: () => void) => {
  return useMutation<void, AxiosError<IApiError>, string>(
    (postId: string) => makeFavourite(postId),
    {
      onSuccess: onSuccess,
    },
  );
};
