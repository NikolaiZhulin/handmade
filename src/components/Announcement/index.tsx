import { FC, MouseEvent, PropsWithChildren, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

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
import Button from '@/ui/Button';
import Modal from '@/components/modals/Modal';
import { useUpdatePost } from '@/api/posts/update-post';
import { useDeletePost } from '@/api/posts/delete-post';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import Switch from '@/ui/Switch';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';

interface IProps {
  post: IMainPagePost;
  className?: string;
  isGrid?: boolean;
  isUsdPrice?: boolean;
  isMyAnnouncement?: boolean;
  refetchPostsList?: () => void;
  isSold?: boolean;
}

const Announcement: FC<PropsWithChildren<IProps>> = ({
  className,
  post,
  isMyAnnouncement,
  isGrid,
  isUsdPrice,
  refetchPostsList,
  isSold,
}) => {
  const { data: favourite, refetch } = useGetFavouritePosts();
  const { mutate: makeFavourite } = useMakeFavourite();
  const { mutate: deleteFavourite } = useDeleteFavourite();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { asPath } = useRouter();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost(refetch, getErrorToast);

  const { control, watch } = useForm({
    defaultValues: {
      isActive: post.isActive,
    },
  });

  const { isActive } = watch();

  useEffect(() => {
    if (isActive !== undefined && isActive !== post.isActive) {
      const formData = new FormData();
      formData.append('isActive', isActive.toString());
      updatePost({ id: post.id, data: formData }, { onSuccess: refetchPostsList });
    }
  }, [isActive]);

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

  const priceBlock = (
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
    </div>
  );

  return (
    <Link
      className={mergeStyles(style.GridLink)}
      href={`/post/${post.id}`}
      prefetch={false}
      target="_blank"
    >
      {isSold && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-50 z-[2] flex items-center justify-center">
          <Typography
            variant="text2"
            className="max-w-[220px] w-[100%] h-[32px] bg-gold flex justify-center items-center xs:w-[auto] xs:px-[16px]"
            color="white"
          >
            {t('sold')}
          </Typography>
        </div>
      )}
      <div className={mergeStyles(style.Announcement, className, style.Grid)}>
        <Images images={post.images} title={post[nameKey as keyof PostNameKeys]} isGrid={isGrid} />
        <div className={cn(style.AnnouncementInformation)}>
          <Typography variant="text2" weight={600} className={style.Text3}>
            {post[nameKey as keyof PostNameKeys]}
          </Typography>
          {isMyAnnouncement ? (
            <div className={style.myAnnouncementBottom}>
              <Typography variant="text2" color="gray" className={cn(style.Heading5, style.views)}>
                35 просмотров
              </Typography>
              {priceBlock}
              <div className={cn(style.divider, 'w-full h-[1px] bg-light-gray')} />
              <div className={cn(style.updateDelete, 'flex items-center gap-[10px]')}>
                <Link href={`${asPath}/${post.id}`}>
                  <Button className={mergeStyles(style.button)} color="ghost">
                    {t('profile.edit')}
                  </Button>
                </Link>
                <span className="h-[24px] w-[1px] bg-light-gray" />
                <Modal
                  trigger={
                    <Button className={mergeStyles(style.button)} color="ghost">
                      {t('delete')}
                    </Button>
                  }
                  confirmHandler={() => deletePost(post.id)}
                  header={t('profile.postDeleteWarn')}
                />
              </div>
              <Switch
                controllerProps={{ control, name: 'isActive' }}
                className={cn(style.switch, 'ml-auto')}
              />
            </div>
          ) : (
            <div className={style.AnnouncementBottomBlock}>
              <button onClick={handleAddFavourite} className={style.favoriteButton}>
                <HomeSvgSelector
                  id={favourite?.includes(post.id) ? 'star_filled_yellow' : 'star'}
                />
              </button>
              <Typography variant="text3" className={cn(style.City)}>
                {t(`cities.${post.city}`)}
              </Typography>
              <span />
              <Typography variant="text3" className={cn(style.Heading5, style.updatedInfo)}>
                {getCreatedAtDatePhrase(post?.createdAt || post.updatedAt, t)}
              </Typography>
              {priceBlock}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Announcement;
