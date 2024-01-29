import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export const blockUser = (id: string) => {
  return axiosRequest({
    method: 'POST',
    url: `/api/v1/admin/users/${id}/block`,
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
  });
};

export const useBlockUser = (
  onSuccess: () => void,
  onError: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, string>(blockUser, {
    onSuccess,
    onError,
  });
};
