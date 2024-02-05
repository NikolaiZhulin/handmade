import React, { FC, useEffect, useState } from 'react';
import * as clipboard from 'clipboard-polyfill';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { CURRENCY_SYMBOLS } from '@/constants/currency';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { mergeStyles } from '@/helpers/mergeStyles';
import { Currency } from '@/constants/enums';
import { useTranslation } from '@/hooks/useTranslation';
import { useGetFavouritePosts } from '@/api/posts/get-favourite';
import { useDeleteFavourite } from '@/api/posts/delete-favourite';
import { useMakeFavourite } from '@/api/posts/make-favourite';
import { cn } from '@/utils/utils';
import { CategoryBadge } from '@/layout/RightBlockPost/components/CategoryBadge';
import { categories } from '@/constants/categories';

import style from './style.module.scss';

interface IProps {
  price: number;
  currency: Currency;
  id: string;
  className?: string;
  time: string;
  postCategories: string[];
}

const RightBlockPostHeader: FC<IProps> = (props) => {
  const { price, currency, id, postCategories, time, className } = props;
  const { mutate: makeFavourite } = useMakeFavourite();
  const { mutate: deleteFavourite } = useDeleteFavourite();
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const { data: favourite, refetch } = useGetFavouritePosts();
  const [isFavourite, setIsFavourite] = useState(false);
  const categoryBadges = categories.filter((el) => postCategories?.includes(el.value));

  const copyHandler = (text: string) => () => {
    clipboard.writeText(text);
    toast.success(t('toasts.copied'));
  };

  useEffect(() => {
    if (favourite?.includes(id)) {
      setIsFavourite(true);
    }
  }, [favourite]);

  const handleMakeFavouriteClick = () => {
    if (favourite?.includes(id)) {
      deleteFavourite(id, { onSuccess: () => refetch() });
      setIsFavourite(false);
    } else {
      makeFavourite(id, { onSuccess: () => refetch() });
      setIsFavourite(true);
    }
  };
  return (
    <div className={className}>
      <div className={cn(style.priceBlock)}>
        <p className={style.price}>
          {price === 0 ? t('main.dealPrice') : `${price} ${CURRENCY_SYMBOLS[currency]}`}
        </p>
        <button
          className={style.share}
          onClick={copyHandler(`${process.env.NEXT_PUBLIC_FRONT_URL}/${asPath}`)}
        >
          <HomeSvgSelector id="bold-arrow-right" />
        </button>
        <button
          onClick={handleMakeFavouriteClick}
          className={mergeStyles(style.favorite, isFavourite && style.active)}
        >
          <HomeSvgSelector id={isFavourite ? 'star_filled_yellow' : 'star'} />
        </button>
      </div>
      {categoryBadges.map((badge) => (
        <CategoryBadge value={badge.value} time={time} key={badge.value} />
      ))}
    </div>
  );
};

export default RightBlockPostHeader;
