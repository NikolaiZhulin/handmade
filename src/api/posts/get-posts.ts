import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { convertObjectToQueryParams } from '@/helpers/convertObjectToParams';
import { ResponseWithPagination } from '@/types/common';
import { IPostResponse } from '@/types/posts';

export type SortBy = 'createdAt' | 'price';
export type sortAt = 'ASC' | 'DESC';
export interface GetPostsVariables {
  filter: {
    category?: string;
    withPhoto?: boolean;
    city?: string[] | string;
    priceFrom?: number;
    priceTo?: number;
    isUsed?: boolean;
    search?: string;
  };
  page?: {
    page?: number;
    limit?: number;
  };
  sort?: {
    sortBy?: SortBy;
    sortAt?: 'ASC' | 'DESC';
  };
}

export const GET_POSTS_KEY = 'posts';

const defaultVariables: Required<Omit<GetPostsVariables, 'filter'>> = {
  page: {
    page: 1,
    limit: 9,
  },
  sort: {
    sortBy: 'createdAt',
    sortAt: 'DESC',
  },
};

export const getPosts = (data: GetPostsVariables) => {
  data.page = { ...defaultVariables.page, ...data.page };
  data.sort = { ...(data.sort ? data.sort : defaultVariables.sort) };

  return axiosRequest<GetPostsVariables, ResponseWithPagination<IPostResponse>>({
    method: 'GET',
    url: '/api/v1/posts/all',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
    params: convertObjectToQueryParams(data),
  });
};

export const useGetPosts = (data: GetPostsVariables) => {
  return useInfiniteQuery(
    [GET_POSTS_KEY, JSON.stringify(data)],
    ({ pageParam = data.page?.page! }) =>
      getPosts({ ...data, page: { ...data.page, page: pageParam } }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : lastPage.meta.page,
      getPreviousPageParam: (lastPage) =>
        lastPage.meta.hasPrevioudPage ? lastPage.meta.page - 1 : lastPage.meta.page,
    },
  );
};

export const useGetPostsWithPagination = (data: GetPostsVariables) => {
  return useQuery([GET_POSTS_KEY, JSON.stringify(data)], () => getPosts(data));
};
