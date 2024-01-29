import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export interface ICreateFilterWordVariables {
  word: string;
}

const createFilterWord = (data: ICreateFilterWordVariables) => {
  return axiosRequest<ICreateFilterWordVariables, void>({
    method: 'POST',
    url: '/api/v1/admin/filter-words',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
    data,
  });
};

export const useCreateFilterWord = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, ICreateFilterWordVariables>(createFilterWord, {
    onSuccess,
    onError,
  });
};
