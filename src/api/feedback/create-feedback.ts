import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export interface ICreateFeedbackVariables {
  email: string;
  description: string;
}

const createFeedback = (data: ICreateFeedbackVariables) => {
  return axiosRequest<ICreateFeedbackVariables, void>({
    method: 'POST',
    url: '/api/v1/admin/feedback',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
    data,
  });
};

export const useCreateFeedback = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<void, AxiosError<IApiError>, ICreateFeedbackVariables>(
    (data) => createFeedback(data),
    { onSuccess, onError },
  );
};
