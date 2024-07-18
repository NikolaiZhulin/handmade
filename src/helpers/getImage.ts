import { ImageService } from '@/constants/enums';

const URLS_MAP = {
  [ImageService.AUTH]: process.env.NEXT_PUBLIC_POSTS_API_URL,
  [ImageService.POSTS]: process.env.NEXT_PUBLIC_POSTS_API_URL,
  [ImageService.ADMIN]: process.env.NEXT_PUBLIC_ADMIN_API_URL,
};

export const getImage = (service: ImageService, name: string) => {
  return `${URLS_MAP[service]}/api/${service}/image/${name}`;
};
