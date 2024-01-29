import { createContext } from 'react';

export interface IUserContextValues {
  accessToken?: string;
  id?: string;
  name?: string;
}

export const USER_CONTEXT_DEFAULT_VALUES: IUserContextValues = {
  accessToken: '',
  id: '',
  name: '',
};

export type UserContext = [IUserContextValues, (newState: Partial<IUserContextValues>) => void];

export const UserContext = createContext<UserContext>([USER_CONTEXT_DEFAULT_VALUES, () => {}]);
