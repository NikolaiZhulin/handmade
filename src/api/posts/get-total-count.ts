import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';

const MINS_30 = 1000 * 60 * 30;
const POSTS_TOTAL_COUNT = 'postsTotalCount';

export const getTotalCount = () => {
  return axiosRequest({
    method: 'GET',
    url: '/api/v1/posts/count',
    baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL || '',
  });
};

export const useGetTotalCount = () => {
  return useQuery([POSTS_TOTAL_COUNT], () => getTotalCount(), {
    staleTime: MINS_30,
    refetchInterval: MINS_30,
  });
};
