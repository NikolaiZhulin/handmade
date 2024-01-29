import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export interface ICreateKeyWordVariables {
  word: string;
  category: string;
}

const createKeyWord = (data: ICreateKeyWordVariables) => {
  return axiosRequest<ICreateKeyWordVariables, void>({
    method: 'POST',
    url: '/api/v1/admin/key-words',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
    data,
  });
};

export const useCreateKeyWord = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, ICreateKeyWordVariables>(createKeyWord, {
    onSuccess,
    onError,
  });
};
