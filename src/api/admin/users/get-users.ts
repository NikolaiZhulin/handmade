import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@/helpers/axiosRequest';
import { convertObjectToQueryParams } from '@/helpers/convertObjectToParams';
import { IUserData } from '@/types/admin/users';
import { ResponseWithPagination } from '@/types/common';

export interface IGetUsersVariables {
  filter: {
    search?: string;
  };
  page?: {
    page?: number;
    limit?: number;
  };
  sort?: {
    sortBy?: string;
    sortAt?: 'ASC' | 'DESC';
  };
}

export const getUsers = (data: IGetUsersVariables) => {
  return axiosRequest<IGetUsersVariables, ResponseWithPagination<IUserData[]>>({
    method: 'GET',
    url: '/api/v1/admin/users',
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
    params: convertObjectToQueryParams(data),
  });
};

const ADMIN_USERS = 'adminUsers';

export const useGetUsers = (data: IGetUsersVariables) => {
  return useQuery([ADMIN_USERS, JSON.stringify(data)], () => getUsers(data));
};
