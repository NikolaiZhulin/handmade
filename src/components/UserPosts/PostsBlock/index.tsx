import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { getImage } from '@/helpers/getImage';
import { getCreatedAtDatePhrase } from '@/helpers/getTime';
import { IPostResponse, PostNameKeys } from '@/types/posts';
import Typography from '@/ui/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { Currency } from '@/constants/enums';
import { CURRENCY_SYMBOLS } from '@/constants/currency';
import { capitalize } from '@/helpers/capitalize';

interface IProps {
  posts: IPostResponse['posts'];
}

const PostsBlock: FC<IProps> = ({ posts }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const nameKey = `name${capitalize(language)}`;

  return (
    <div className="w-1/2 border-2 2xl:w-full">
      <Typography variant="heading2" weight={700} className="mb-[14px]">
        {t('userPosts.title')}: {posts.length}
      </Typography>
      <div className="flex flex-col gap-2 w-full">
        {posts.map((post) => (
          <Link href={`/post/${post.id}`} className="max-w-full" key={post.id}>
            <div className="flex gap-[14px] items-center max-w-full">
              <div className="relative w-[160px] h-[126px] min-w-[160px] min-h-[126px] rounded-[6px] overflow-hidden">
                <Image
                  src={post.images[0] ? getImage(post.images[0]) : '/images/no-photo.png'}
                  fill={true}
                  alt={post[nameKey as keyof PostNameKeys]}
                  blurDataURL="/images/no-photo.png"
                  title={post[nameKey as keyof PostNameKeys]}
                  sizes="100%"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col gap-[6px] py-[14px] max-w-[57%]">
                <Typography
                  variant="heading4"
                  className="max-h-[54px] truncate whitespace-break-spaces"
                >
                  {post[nameKey as keyof PostNameKeys]}
                </Typography>
                <div className="flex items-center gap-[10px]">
                  <Typography variant="heading3" color="brand" weight={700}>
                    {post.price === 0
                      ? t('main.dealPrice')
                      : `${post.price} ${CURRENCY_SYMBOLS[post.currency]}`}
                  </Typography>
                  {!!post.usdPrice && post.price !== 0 && post.currency !== Currency.USD && (
                    <Typography variant="heading4" color="gray">
                      ~ {post.usdPrice} $
                    </Typography>
                  )}
                </div>
                <Typography variant="heading4" color="gray">
                  {getCreatedAtDatePhrase(post.createdAt ?? '', t)}
                </Typography>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsBlock;
