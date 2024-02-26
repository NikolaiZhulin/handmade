import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IPostResponse } from '@/types/posts';

export const GET_MY_POSTS_KEY = 'myPosts';

export const getMyPosts = (query: string) => {
  return axiosRequest<never, IPostResponse & { hasAnyPosts: boolean }>({
    method: 'GET',
    url: `/api/posts/my?active=${query}`,
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const useGetMyPosts = (query: string) => {
  return useQuery([GET_MY_POSTS_KEY, query], () => getMyPosts(query));
};
