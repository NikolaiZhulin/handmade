import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export interface UpdatePostVariables {
  id: string;
  data: FormData;
}

export const updatePost = (data: UpdatePostVariables) => {
  return axiosRequest<FormData, unknown>({
    url: `/api/posts/${data.id}`,
    method: 'PUT',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
    data: data.data,
  });
};

export const useUpdatePost = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<unknown, AxiosError<IApiError>, UpdatePostVariables>(
    (data) => updatePost(data),
    {
      onSuccess,
      onError,
    },
  );
};
