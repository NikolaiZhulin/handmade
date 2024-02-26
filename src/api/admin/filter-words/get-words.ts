import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { convertObjectToQueryParams } from '@/helpers/convertObjectToParams';
import { IKeyWord } from '@/types/admin/key-words';
import { ResponseWithPagination } from '@/types/common';

const ADMIN_KEY_WORDS = ['adminKeyWords'];

export interface IGetFilterWordsVariables {
  filter: {
    search?: string;
  };
  page?: {
    page?: number;
    limit?: number;
  };
}

export const getFilterWords = (data: IGetFilterWordsVariables) => {
  return axiosRequest<IGetFilterWordsVariables, ResponseWithPagination<IKeyWord[]>>({
    method: 'GET',
    url: '/api/admin/filter-words',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
    params: convertObjectToQueryParams(data),
  });
};

export const useGetFilterWords = (data: IGetFilterWordsVariables) => {
  return useQuery([ADMIN_KEY_WORDS, JSON.stringify(data)], () => getFilterWords(data));
};
