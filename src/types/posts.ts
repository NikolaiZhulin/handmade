import { Currency, UsedPeriod } from '@/constants/enums';

export interface IMainPagePost {
  id: string;
  images: string[];
  nameRu: string;
  nameEn: string;
  nameGe: string;
  price: number;
  currency: Currency;
  updatedAt: string;
  textRu?: string;
  textEn?: string;
  textGe?: string;
  city: string;
  categories: string[];
  contacts: IPostContactInfo;
  isActive: boolean;
  isUsed: boolean;
  usedAmount: number;
  usedPeriod: UsedPeriod;
  createdAt?: string;
  address?: string;
  usdPrice: number;
}

export type PostNameKeys = Pick<IMainPagePost, 'nameRu' | 'nameGe' | 'nameEn'>;

export type IUserPostPreview = Pick<
  IMainPagePost,
  'id' | 'images' | 'currency' | 'price' | 'nameRu' | 'nameGe' | 'nameEn' | 'isActive' | 'usdPrice'
>;

export interface IPostResponse {
  posts: IMainPagePost[];
}

export interface IFullPost extends IMainPagePost {
  userPosts: IMainPagePost[];
  userPostsCount: number;
  user: {
    id: string;
  };
}

export interface IPostContactInfo {
  phone: string;
  additionalPhone?: string;
  telegram?: string;
  whatsApp?: string;
  viber?: string;
  facebook?: string;
  name?: string;
  isPhoneActive?: boolean;
  isViberActive?: boolean;
  isAdditionalPhoneActive?: boolean;
  isFacebookActive?: boolean;
  isTelegramActive?: boolean;
  isWhatsappActive?: boolean;
}

export interface ICategoryItem {
  id: string;
  icon: string;
  nameRu: string;
  nameEn: string;
  nameGe: string;
  slug: string;
}

export interface ICategoriesResponse {
  categories: ICategoryItem[];
}
