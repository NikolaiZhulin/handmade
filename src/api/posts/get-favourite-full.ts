import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IPostResponse } from '@/types/posts';

const MY_FULL_FAVOURITE_POSTS = 'myFullFavouritePosts';

export const getFullFavouritePosts = () => {
  return axiosRequest<never, IPostResponse>({
    method: 'GET',
    url: '/api/v1/posts/favourite/full',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const useGetFullFavouritePosts = () => {
  return useQuery([MY_FULL_FAVOURITE_POSTS], () => getFullFavouritePosts());
};
