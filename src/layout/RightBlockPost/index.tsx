import { FC, useEffect, useState } from 'react';
import * as clipboard from 'clipboard-polyfill';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Currency } from '@/constants/enums';
import { categories } from '@/constants/categories';
import { IPostContactInfo } from '@/types/posts';
import { CURRENCY_SYMBOLS } from '@/constants/currency';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useMakeFavourite } from '@/api/posts/make-favourite';
import { useGetFavouritePosts } from '@/api/posts/get-favourite';
import { useDeleteFavourite } from '@/api/posts/delete-favourite';
import { useTranslation } from '@/hooks/useTranslation';
import { mergeStyles } from '@/helpers/mergeStyles';
import { cn } from '@/utils/utils';

import style from './style.module.scss';
import { PostAddress } from './components/Address';
import { CategoryBadge } from './components/CategoryBadge';
import { Contacts } from './components/Contacts';

interface IProps {
  price: number;
  currency: Currency;
  time: string;
  postCategories: string[];
  city: string;
  contacts: IPostContactInfo;
  id: string;
  address?: string;
}

const RightBlockPost: FC<IProps> = ({
  postCategories,
  price,
  currency,
  time,
  city,
  contacts,
  address,
  id,
}) => {
  const categoryBadges = categories.filter((el) => postCategories.includes(el.value));
  const { mutate: makeFavourite } = useMakeFavourite();
  const { mutate: deleteFavourite } = useDeleteFavourite();
  const { data: favourite, refetch } = useGetFavouritePosts();
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (favourite?.includes(id)) {
      setIsFavourite(true);
    }
  }, [favourite]);

  const copyHandler = (text: string) => () => {
    clipboard.writeText(text);
    toast.success(t('toasts.copied'));
  };

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
    <div
      className={cn(
        style.RightBlockPost,
        '2xl:!py-[14px] 2xl:!px-[24px] 2xl:!static xs:!px-[20px] xs:!pb-0',
      )}
    >
      <div className={style.priceBlock}>
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
      <PostAddress city={city} address={address} />
      <Contacts contacts={contacts} />
    </div>
  );
};

export default RightBlockPost;
