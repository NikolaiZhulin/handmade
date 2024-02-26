import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IFullPost } from '@/types/posts';

export interface GetPostByIdVariables {
  id: string;
}

export const getPostById = (data: GetPostByIdVariables, token?: string) => {
  return axiosRequest<GetPostByIdVariables, IFullPost>({
    url: `/api/posts/${data.id}`,
    method: 'GET',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
    token,
  });
};

export const useGetPostById = (id: string) => {
  return useQuery([id], () => getPostById({ id }));
};
