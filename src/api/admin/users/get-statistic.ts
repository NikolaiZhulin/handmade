import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IStatisticResponse } from '@/types/admin/users';

export const getStatistic = () => {
  return axiosRequest<unknown, IStatisticResponse>({
    method: 'GET',
    url: '/api/v1/admin/users/statistic',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
  });
};

const ADMIN_USER_STATISTIC = 'adminUserStatistic';

export const useGetStatistic = () => {
  return useQuery([ADMIN_USER_STATISTIC], getStatistic, {
    staleTime: 1000 * 60 * 60 * 60,
    refetchInterval: 1000 * 60 * 60 * 60,
  });
};
