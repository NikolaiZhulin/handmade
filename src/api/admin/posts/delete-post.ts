import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const deletePost = (id: string) => {
  return axiosRequest<string, void>({
    method: 'DELETE',
    url: `/api/admin/posts/${id}`,
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
  });
};

export const useDeleteAdminPost = (
  onSuccess: () => void,
  onError: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, string>((id) => deletePost(id), {
    onSuccess,
    onError,
  });
};
