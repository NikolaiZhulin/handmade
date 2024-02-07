import * as z from 'zod';

import { Currency, UsedPeriod } from '@/constants/enums';
import { NUMBER_NON_NEGATIVE, REQUIRED_FIELD } from '@/constants/texts/validations';
import { IFullPost, PostNameKeys } from '@/types/posts';
import { capitalize } from '@/helpers/capitalize';

export interface FormState {
  name: string;
  textRu: string;
  textEn: string;
  textGe: string;
  price: number;
  currency: Currency;
  sex: string[];
  jewel: string;
  sample: string;
  stone: string;
  size: string;
  careRecommendations: string;
  address: string;
  isJewelry: boolean;
  files: File[];
  isUsed: boolean;
  usedAmount: number;
  usedPeriod: UsedPeriod;
  city: string;
  requestCategories: string[];
  requestMaterials: string[];
  requestStones: string[];
  requestSamples: string[];
  requestCity: string[];
  phone: string;
  contactName: string;
  additionalPhone: string;
  telegram: string;
  whatsapp: string;
  viber: string;
  facebook: string;
  isPhoneActive: boolean;
  isAdditionalPhoneActive: boolean;
  isTelegramActive: boolean;
  isWhatsappActive: boolean;
  isViberActive: boolean;
  isFacebookActive: boolean;
}

export const schema = z
  .object({
    name: z.string({ required_error: REQUIRED_FIELD }).nonempty(REQUIRED_FIELD),
    textRu: z.string().nullable(),
    textEn: z.string().nullable(),
    textGe: z.string().nullable(),
    price: z.coerce.number(),
    currency: z.string().nonempty(REQUIRED_FIELD),
    phone: z.string(),
    contactName: z.string({ required_error: REQUIRED_FIELD }),
    additionalPhone: z.string().optional(),
    telegram: z.string().optional(),
    facebook: z.string().optional(),
    viber: z.string().optional(),
    whatsapp: z.string().optional(),
    isUsed: z.boolean(),
    usedAmount: z
      .preprocess((value) => parseInt(value as string), z.number().nonnegative(NUMBER_NON_NEGATIVE))
      .nullable(),
    usedPeriod: z.string().nullable(),
    city: z.string(),
    requestCategories: z.array(z.string()).nonempty(REQUIRED_FIELD),
    isPhoneActive: z.boolean(),
    isAdditionalPhoneActive: z.boolean(),
    isTelegramActive: z.boolean(),
    isWhatsappActive: z.boolean(),
    isViberActive: z.boolean(),
    isFacebookActive: z.boolean(),
  })
  .partial({
    textEn: true,
    textGe: true,
    textRu: true,
  });

export const setDefaultValues = (
  post: IFullPost,
  reset: (values?: Partial<FormState>) => void,
  lang: string,
) => {
  const nameKey = `name${capitalize(lang)}`;
  reset({
    name: post[nameKey as keyof PostNameKeys] ?? post.nameRu,
    textRu: post.textRu,
    textEn: post.textEn,
    textGe: post.textGe,
    price: post.price,
    currency: post.currency,
    isUsed: post.isUsed,
    usedAmount: post.usedAmount,
    usedPeriod: post.usedPeriod,
    city: post.city,
    requestCategories: post.categories,
    isPhoneActive: !!post.contacts.isPhoneActive,
    isAdditionalPhoneActive: !!post.contacts.isAdditionalPhoneActive,
    isTelegramActive: !!post.contacts.isTelegramActive,
    isWhatsappActive: !!post.contacts.isWhatsappActive,
    isViberActive: !!post.contacts.isViberActive,
    isFacebookActive: !!post.contacts.isFacebookActive,
    phone: post.contacts.phone ?? '',
    contactName: post.contacts.name ?? '',
    additionalPhone: post.contacts.additionalPhone ?? '',
    telegram: post.contacts.telegram ?? '',
    whatsapp: post.contacts.whatsApp ?? '',
    viber: post.contacts.viber ?? '',
    facebook: post.contacts.facebook ?? '',
  });
};
