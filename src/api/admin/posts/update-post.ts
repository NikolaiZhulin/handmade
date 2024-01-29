import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export interface IUpdatePostVariables {
  category: string;
  id: string;
}

export const updatePost = (data: IUpdatePostVariables) => {
  return axiosRequest<IUpdatePostVariables, void>({
    method: 'PUT',
    url: `/api/v1/admin/posts/${data.id}`,
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
    data,
  });
};

export const useUpdateAdminPost = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, IUpdatePostVariables>(
    (data) => updatePost(data),
    {
      onSuccess,
      onError,
    },
  );
};
