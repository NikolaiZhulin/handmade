import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { ICategoriesResponse } from '@/types/posts';

export const getCategories = () => {
  return axiosRequest<never, ICategoriesResponse>({
    method: 'GET',
    url: '/api/categories',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const CATEGORIES_KEY = 'categories';

export const useGetCategories = () => {
  return useQuery([CATEGORIES_KEY], getCategories);
};
