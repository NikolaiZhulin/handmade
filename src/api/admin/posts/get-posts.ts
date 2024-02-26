import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { convertObjectToQueryParams } from '@/helpers/convertObjectToParams';
import { ResponseWithPagination } from '@/types/common';
import { IAdminPost } from '@/types/admin/posts';

export type SortBy = 'createdAt' | 'price';
export type sortAt = 'ASC' | 'DESC';
export interface GetAdminPostsVariables {
  filter: {
    category?: string;
    search?: string;
    source?: string;
  };
  page?: {
    page?: number;
    limit?: number;
  };
}

export const GET_ADMIN_POSTS_KEY = 'adminPosts';

const defaultVariables: Required<Omit<GetAdminPostsVariables, 'filter'>> = {
  page: {
    page: 1,
    limit: 9,
  },
};

export const getAdminPosts = (data: GetAdminPostsVariables) => {
  data.page = { ...defaultVariables.page, ...data.page };

  return axiosRequest<GetAdminPostsVariables, ResponseWithPagination<IAdminPost[]>>({
    method: 'GET',
    url: '/api/admin/posts',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || '',
    params: convertObjectToQueryParams(data),
  });
};

export const useGetAdminPosts = (data: GetAdminPostsVariables) => {
  return useQuery([GET_ADMIN_POSTS_KEY, JSON.stringify(data)], ({ pageParam = data.page?.page! }) =>
    getAdminPosts({ ...data, page: { ...data.page, page: pageParam } }),
  );
};
