import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { IApiError } from '@/types/axios';
import { AuthResponse } from '@/types/auth';

export interface SignUpVariables {
  email: string;
  confirmationCode: string;
  password: string;
}

export const signUp = (data: SignUpVariables) => {
  return axiosRequest<SignUpVariables, AuthResponse>({
    method: 'POST',
    url: '/api/auth/sign-up',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || '',
    data,
  });
};

export const useSignUp = () => {
  return useMutation<AuthResponse, AxiosError<IApiError>, SignUpVariables>((data) => signUp(data));
};
