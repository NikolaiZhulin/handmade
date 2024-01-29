import { FC, MouseEvent, PropsWithChildren } from 'react';
import Link from 'next/link';

import Images from '@/ui/Images';
import { mergeStyles } from '@/helpers/mergeStyles';
import { IMainPagePost, PostNameKeys } from '@/types/posts';
import { getCreatedAtDatePhrase } from '@/helpers/getTime';
import { useGetFavouritePosts } from '@/api/posts/get-favourite';
import { useTranslation } from '@/hooks/useTranslation';
import { CURRENCY_SYMBOLS } from '@/constants/currency';
import { useMakeFavourite } from '@/api/posts/make-favourite';
import { useDeleteFavourite } from '@/api/posts/delete-favourite';
import Typography from '@/ui/Typography';
import { Currency } from '@/constants/enums';
import { capitalize } from '@/helpers/capitalize';
import { cn } from '@/utils/utils';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';

interface IProps {
  post: IMainPagePost;
  className?: string;
  isGrid?: boolean;
  isUsdPrice?: boolean;
}

const Announcement: FC<PropsWithChildren<IProps>> = ({ className, post, isGrid, isUsdPrice }) => {
  const { data: favourite, refetch } = useGetFavouritePosts();
  const { mutate: makeFavourite } = useMakeFavourite();
  const { mutate: deleteFavourite } = useDeleteFavourite();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const handleAddFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (favourite?.includes(post.id)) {
      deleteFavourite(post.id, { onSuccess: () => refetch() });
    } else {
      makeFavourite(post.id, { onSuccess: () => refetch() });
    }
  };

  const nameKey = `name${capitalize(language)}`;

  return (
    <Link
      className={mergeStyles(style.GridLink)}
      href={`/post/${post.id}`}
      prefetch={false}
      target="_blank"
    >
      <div className={mergeStyles(style.Announcement, className, style.Grid)}>
        <Images images={post.images} title={post[nameKey as keyof PostNameKeys]} isGrid={isGrid} />
        <div className={cn(style.AnnouncementInformation)}>
          <Typography variant="text2" weight={600} className={style.Text3}>
            {post[nameKey as keyof PostNameKeys]}
          </Typography>
          <div className={style.AnnouncementBottomBlock}>
            <button onClick={handleAddFavourite} className={style.favoriteButton}>
              <HomeSvgSelector id={favourite?.includes(post.id) ? 'star_filled_yellow' : 'star'} />
            </button>
            <Typography variant="text3" className={cn(style.City)}>
              {t(`cities.${post.city}`)}
            </Typography>
            <span />
            <Typography variant="text3" className={cn(style.Heading5, style.updatedInfo)}>
              {getCreatedAtDatePhrase(post.updatedAt, t)}
            </Typography>
            <div className={cn('flex items-center gap-[10px] xs:gap-[6px]  ml-auto', style.price)}>
              <Typography variant="text3" className={cn(style.Heading2, '!text-[18px]')}>
                {post.price === 0
                  ? t('main.dealPrice')
                  : isUsdPrice
                  ? post.currency === Currency.USD
                    ? `${post.price} ${CURRENCY_SYMBOLS[post.currency]}`
                    : `${post.usdPrice} ${CURRENCY_SYMBOLS.USD}`
                  : `${post.price} ${CURRENCY_SYMBOLS[post.currency]}`}
              </Typography>
              {/*{!!post.usdPrice &&*/}
              {/*  post.price !== 0 &&*/}
              {/*  post.currency !== Currency.USD &&*/}
              {/*  !isUsdPrice && (*/}
              {/*    <Typography variant="text3" color="gray" className="xs:!text-[12px]">*/}
              {/*      ~ {post.usdPrice} $*/}
              {/*    </Typography>*/}
              {/*  )}*/}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Announcement;
