import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';
import { AuthResponse } from '@/types/auth';

export interface LoginVariables {
  email: string;
  password: string;
  isAdmin?: boolean;
}

export const login = (data: LoginVariables) => {
  return axiosRequest<LoginVariables, AuthResponse>({
    method: 'POST',
    url: '/api/auth/log-in',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || '',
    data,
  });
};

export const useLogin = () => {
  return useMutation<AuthResponse, AxiosError<IApiError>, LoginVariables>((data) => login(data));
};
