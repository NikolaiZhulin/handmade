import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ReportPostReason } from '@/constants/enums';
import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';

export interface ICreateReportVariables {
  reason: ReportPostReason;
  message: string;
  postId: string;
}

export const createReport = (data: ICreateReportVariables) => {
  return axiosRequest<ICreateReportVariables, number>({
    method: 'POST',
    url: `/api/posts/reports/${data.postId}`,
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
    data,
  });
};

export const useCreateReport = (
  onSuccess?: () => void,
  onError?: (e: AxiosError<IApiError>) => void,
) => {
  return useMutation<number, AxiosError<IApiError>, ICreateReportVariables>(
    (data) => createReport(data),
    {
      onSuccess,
      onError,
    },
  );
};
