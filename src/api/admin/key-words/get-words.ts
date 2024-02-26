import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { convertObjectToQueryParams } from '@/helpers/convertObjectToParams';
import { IKeyWord } from '@/types/admin/key-words';
import { ResponseWithPagination } from '@/types/common';

const ADMIN_KEY_WORDS = ['adminKeyWords'];

export interface IGetWordsVariables {
  filter: {
    category?: string;
    search?: string;
  };
  page?: {
    page?: number;
    limit?: number;
  };
}

export const getWords = (data: IGetWordsVariables) => {
  return axiosRequest<IGetWordsVariables, ResponseWithPagination<IKeyWord[]>>({
    method: 'GET',
    url: '/api/admin/key-words',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
    params: convertObjectToQueryParams(data),
  });
};

export const useGetWords = (data: IGetWordsVariables) => {
  return useQuery([ADMIN_KEY_WORDS, JSON.stringify(data)], () => getWords(data));
};
