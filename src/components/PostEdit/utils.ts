import * as z from 'zod';

import { Currency } from '@/constants/enums';
import { REQUIRED_FIELD } from '@/constants/texts/validations';
import { IFullPost, PostNameKeys } from '@/types/posts';
import { capitalize } from '@/helpers/capitalize';

export interface FormState {
  name: string;
  textRu: string;
  textEn: string;
  textGe: string;
  price: number;
  currency: Currency;
  address: string;
  isJewelry?: boolean | string;
  files: File[];
  city: string;
  requestCategories: string[];
  phone: string;
  contactName: string;
  additionalPhone: string;
  telegram: string;
  whatsApp: string;
  viber: string;
  facebook: string;
  isPhoneActive: boolean;
  isAdditionalPhoneActive: boolean;
  isTelegramActive: boolean;
  isWhatsappActive: boolean;
  isViberActive: boolean;
  isFacebookActive: boolean;
  material?: string;
  metal?: string;
  sample?: string;
  stone?: string;
  size?: string;
  sex?: string;
  recommendations?: string;
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
    whatsApp: z.string().optional(),
    city: z.string(),
    requestCategories: z.array(z.string()).nonempty(REQUIRED_FIELD),
    isPhoneActive: z.boolean(),
    isAdditionalPhoneActive: z.boolean(),
    isTelegramActive: z.boolean(),
    isWhatsappActive: z.boolean(),
    isViberActive: z.boolean(),
    isFacebookActive: z.boolean(),
    isJewelry: z.boolean().optional(),
    sex: z.string().optional(),
    size: z.string().optional(),
    sample: z.string().optional(),
    recommendations: z.string().optional(),
    material: z.string().optional(),
    stone: z.string().optional(),
    address: z.string().optional(),
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
    address: post.address,
    textRu: post.textRu,
    textEn: post.textEn,
    textGe: post.textGe,
    price: post.price,
    currency: post.currency,
    city: post.city,
    isJewelry: post.isJewelry,
    sex: post?.sex,
    size: post?.size,
    sample: post?.sample,
    recommendations: post?.recommendations,
    requestCategories: post?.categories,
    material: post?.material,
    stone: post?.stone,
    isPhoneActive: !!post.contacts.isPhoneActive,
    isAdditionalPhoneActive: !!post.contacts.isAdditionalPhoneActive,
    isTelegramActive: !!post.contacts.isTelegramActive,
    isWhatsappActive: !!post.contacts.isWhatsappActive,
    isViberActive: !!post.contacts.isViberActive,
    isFacebookActive: !!post.contacts.isFacebookActive,
    phone: post.contacts.phone ?? '',
    contactName: post.contacts.contactName ?? '',
    additionalPhone: post.contacts.additionalPhone ?? '',
    telegram: post.contacts.telegram ?? '',
    whatsApp: post.contacts.whatsApp ?? '',
    viber: post.contacts.viber ?? '',
    facebook: post.contacts.facebook ?? '',
  });
};
