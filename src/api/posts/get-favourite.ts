import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';

export const MY_FAVOURITE_POSTS = 'myFavouritePosts';

export const getFavouritePosts = () => {
  return axiosRequest<never, string[]>({
    method: 'GET',
    url: '/api/v1/posts/favourite',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const useGetFavouritePosts = () => {
  return useQuery([MY_FAVOURITE_POSTS], () => getFavouritePosts());
};
