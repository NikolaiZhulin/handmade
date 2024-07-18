import { FC } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

import FlexContainer from '@/layout/FlexContainer';
import Typography from '@/ui/Typography';
import { mergeStyles } from '@/helpers/mergeStyles';
import Button from '@/ui/Button';
import { useGetFullFavouritePosts } from '@/api/posts/get-favourite-full';
import { useDeleteAllFavourite } from '@/api/posts/dlete-all-favourite';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { MY_FAVOURITE_POSTS } from '@/api/posts/get-favourite';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';

import Modal from '../modals/Modal';
import Announcement from '../Announcement';
import AnnouncementContainer from '../AnnouncementContainer';
import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import styles from './styles.module.scss';

const Favourite: FC = () => {
  //TODO: нужна информация о том продан ли товар из объявления
  const queryClient = useQueryClient();
  const { data, refetch } = useGetFullFavouritePosts();
  const { t } = useTranslation();
  const { mutate: deleteAllFavourites } = useDeleteAllFavourite(() => {
    refetch();
    toast.success(t('favourites.cleared'));
    queryClient.invalidateQueries([MY_FAVOURITE_POSTS]);
  }, getErrorToast);

  return (
    <FlexContainer
      direction="column"
      gap={14}
      align="start"
      justify="start"
      className="2xl:!w-full 2xl:h-full xs:!justify-start"
    >
      {data && data?.posts.length ? (
        <>
          <FlexContainer className={cn(styles.w100, 'xs:!flex-col xs:!items-start xs:gap-[14px]')}>
            <Typography variant="heading2">{t('favourites.title')}</Typography>
            <FlexContainer gap={14}>
              <Modal
                trigger={
                  <Button color="gray" className={styles.button}>
                    <Typography variant="heading3" color="black">
                      {t('favourites.clear')}
                    </Typography>
                  </Button>
                }
                header={t('favourites.clearWarn')}
                confirmHandler={() => deleteAllFavourites()}
              />
            </FlexContainer>
          </FlexContainer>
          <AnnouncementContainer className="w-full 2xl:!mt-0">
            {data.posts.map((post) => (
              <Announcement key={post.id} post={post} />
            ))}
          </AnnouncementContainer>
        </>
      ) : (
        <FlexContainer
          className={mergeStyles(styles.empty, styles.w100, '2xl:h-full')}
          align="center"
          direction="column"
          justify="center"
          gap={20}
        >
          <HomeSvgSelector id="favourite_star" />
          <FlexContainer direction="column">
            <Typography variant="heading3" weight={700} className="xs:text-center">
              {t('favourites.noPosts')}
            </Typography>
            <Typography variant="heading3" color="gray" className="xs:text-center">
              {t('favourites.advice')}
            </Typography>
          </FlexContainer>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default Favourite;
