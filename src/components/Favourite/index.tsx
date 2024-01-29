import { FC, Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

import FlexContainer from '@/layout/FlexContainer';
import Typography from '@/ui/Typography';
import { mergeStyles } from '@/helpers/mergeStyles';
import Button from '@/ui/Button';
import ChangeView from '@/ui/ChangeView';
import { useGetFullFavouritePosts } from '@/api/posts/get-favourite-full';
import { useDeleteAllFavourite } from '@/api/posts/dlete-all-favourite';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { MY_FAVOURITE_POSTS } from '@/api/posts/get-favourite';
import { useTranslation } from '@/hooks/useTranslation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/utils';

import Modal from '../modals/Modal';
import Announcement from '../Announcement';
import AnnouncementContainer from '../AnnouncementContainer';
import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import styles from './styles.module.scss';

const Favourite: FC = () => {
  const queryClient = useQueryClient();
  const [view, setView] = useState(false);
  const { data, refetch } = useGetFullFavouritePosts();
  const { t } = useTranslation();
  const { mutate: deleteAllFavourites } = useDeleteAllFavourite(() => {
    refetch();
    toast.success(t('favourites.cleared'));
    queryClient.invalidateQueries([MY_FAVOURITE_POSTS]);
  }, getErrorToast);
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  return (
    <FlexContainer
      direction="column"
      gap={14}
      align="start"
      className="2xl:!w-full 2xl:h-full xs:!justify-start"
    >
      {data && data?.posts.length ? (
        <>
          <FlexContainer className={styles.w100}>
            <Typography variant="heading2">{t('favourites.title')}</Typography>
            <FlexContainer gap={14}>
              {!isLaptop && (
                <Modal
                  trigger={
                    <Button color="neutral" className={styles.button}>
                      <Typography variant="heading3" color="black">
                        {t('favourites.clear')}
                      </Typography>
                    </Button>
                  }
                  header={t('favourites.clearWarn')}
                  confirmHandler={() => deleteAllFavourites()}
                />
              )}
              <ChangeView
                setView={setView}
                isGrid={view}
                leftIconId="list-icon"
                rightIconId="grid-icon"
              />
            </FlexContainer>
          </FlexContainer>
          {isLaptop && (
            <Modal
              trigger={
                <div
                  className={cn(
                    'h-[32px] bg-light-gray flex items-center justify-center px-[10px] rounded-[6px] overflow-hidden',
                  )}
                >
                  <Typography variant="heading3" color="black" weight={700}>
                    {t('favourites.clear')}
                  </Typography>
                </div>
              }
              triggerClassName="2xl:w-full"
              header={t('favourites.clearWarn')}
              confirmHandler={() => deleteAllFavourites()}
              dialogClassName="xs:w-[calc(100%-40px)] xs:rounded-[12px]"
            />
          )}
          <AnnouncementContainer isGrid={view} className="w-full 2xl:!mt-0">
            {data.posts.map((post) => (
              <Announcement key={post.id} post={post} isGrid={view} />
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
            <Typography variant="heading4" color="gray" className="xs:text-center">
              {t('favourites.advice')}
            </Typography>
          </FlexContainer>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default Favourite;
