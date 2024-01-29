import { Roles } from '@/constants/enums';

export interface IAuth {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: string;
  name: string;
  city?: string;
  additionalPhone?: string;
  email: string;
  facebook?: string;
  createdAt: string;
  image?: string;
  isActive?: boolean;
  phone?: string;
  role: Roles;
  telegram?: string;
  updatedAt: string;
  viber?: string;
  vip: boolean;
  whatsApp?: string;
}

export type CallModalChange = (isLeftActive: boolean | null) => () => void;

export interface AuthResponse {
  auth: IAuth;
  user: IUser;
}

export type ExternalUser = Pick<
  IUser,
  | 'name'
  | 'facebook'
  | 'telegram'
  | 'phone'
  | 'createdAt'
  | 'viber'
  | 'whatsApp'
  | 'additionalPhone'
  | 'image'
  | 'id'
>;
