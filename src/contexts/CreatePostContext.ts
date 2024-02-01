import { createContext } from 'react';

import { Currency, UsedPeriod } from '@/constants/enums';

export interface ICreatePostContext {
  name: string;
  textRu: string;
  textEn: string;
  textGe: string;
  price: number;
  currency: Currency;
  files: File[];
  requestCategories: string[];
  city: string;
  metal: string;
  jewel: string;
  sample: string;
  stone: string;
  size: string;
  careRecommendations: string;
  isUsed: boolean;
  usedAmount?: number;
  usedPeriod?: UsedPeriod;
  phone: string;
  additionalPhone: string;
  telegram: string;
  whatsApp: string;
  viber: string;
  facebook: string;
  contactName: string;
  isPhoneActive: boolean;
  isAdditionalPhoneActive: boolean;
  isTelegramActive: boolean;
  isWhatsappActive: boolean;
  isViberActive: boolean;
  isFacebookActive: boolean;
  address: string;
}

export const CREATE_POST_CONTEXT_DEFAULT_VALUES: ICreatePostContext = {
  name: '',
  textRu: '',
  textEn: '',
  textGe: '',
  price: 0,
  metal: '',
  jewel: '',
  sample: '',
  stone: '',
  size: '',
  careRecommendations: '',
  currency: Currency.GEL,
  files: [],
  requestCategories: [],
  city: '',
  isUsed: true,
  usedAmount: undefined,
  usedPeriod: undefined,
  phone: '',
  additionalPhone: '',
  telegram: '',
  whatsApp: '',
  viber: '',
  facebook: '',
  contactName: '',
  isPhoneActive: true,
  isAdditionalPhoneActive: true,
  isTelegramActive: true,
  isWhatsappActive: true,
  isViberActive: true,
  isFacebookActive: true,
  address: '',
};

export type CreatePostContext = [ICreatePostContext, (state: Partial<ICreatePostContext>) => void];

export const CreatePostContext = createContext<CreatePostContext>([
  CREATE_POST_CONTEXT_DEFAULT_VALUES,
  () => {},
]);
