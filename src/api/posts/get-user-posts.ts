import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IPostResponse } from '@/types/posts';
import { ExternalUser } from '@/types/auth';

export const GET_USER_POSTS_KEY = 'userPosts';

export const getUserPosts = (userId: string) => {
  return axiosRequest<never, { posts: IPostResponse['posts']; user: ExternalUser }>({
    method: 'GET',
    url: `/api/v1/posts/posts/${userId}?active=true`,
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const useGetUserPosts = (userId: string) => {
  return useQuery([GET_USER_POSTS_KEY, userId], () => getUserPosts(userId));
};
