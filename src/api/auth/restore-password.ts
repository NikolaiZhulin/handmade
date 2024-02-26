import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@/helpers/axiosRequest';
import { AuthResponse } from '@/types/auth';
import { IApiError } from '@/types/axios';

export interface PasswordRestoreVariables {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

export const passwordRecovery = (data: PasswordRestoreVariables) => {
  return axiosRequest<PasswordRestoreVariables, AuthResponse>({
    method: 'POST',
    url: '/api/auth/password/recovery',
    contentType: 'application/json',
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || '',
    data,
  });
};

export const usePasswordRecovery = () => {
  return useMutation<AuthResponse, AxiosError<IApiError>, PasswordRestoreVariables>((data) =>
    passwordRecovery(data),
  );
};
