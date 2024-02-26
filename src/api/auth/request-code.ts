import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CodeType } from '@/constants/enums';
import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export interface RequestCodeVariables {
  email: string;
  type: CodeType;
}

export const requestCode = (data: RequestCodeVariables) => {
  return axiosRequest<RequestCodeVariables, number>({
    method: 'POST',
    url: '/api/auth/request-code',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || '',
    data,
  });
};

export const useRequestCode = (
  onSuccess?: () => void,
  onError?: (err: AxiosError<IApiError>) => void,
) => {
  return useMutation<number, AxiosError<IApiError>, RequestCodeVariables>(
    (data) => requestCode(data),
    {
      onSuccess,
      onError,
    },
  );
};
