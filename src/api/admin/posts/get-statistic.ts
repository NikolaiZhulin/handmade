import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IAdminPostsStatistic } from '@/types/admin/posts';

export const getStatistic = () => {
  return axiosRequest<unknown, IAdminPostsStatistic>({
    method: 'GET',
    url: '/api/admin/posts/statistic',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
  });
};

const GET_STATISTIC = 'adminStatistic';

export const useGetStatistic = () => {
  return useQuery([GET_STATISTIC], () => getStatistic(), {
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
  });
};
