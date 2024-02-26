import { FC } from 'react';

import FlexContainer from '@/layout/FlexContainer';
import Typography from '@/ui/Typography';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useGetFullFavouritePosts } from '@/api/posts/get-favourite-full';
import { useTranslation } from '@/hooks/useTranslation';

import Announcement from '../Announcement';
import AnnouncementContainer from '../AnnouncementContainer';

import styles from './styles.module.scss';

const History: FC = () => {
  //TODO: Нужен поинт для истории просмотров
  const { data } = useGetFullFavouritePosts();
  const { t } = useTranslation();

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
          <Typography variant="heading2">{t('history.title')}</Typography>
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
          <img
            src="/images/empty-history.png"
            alt="banner"
            className="w-[396px] h-[300px] xs:w-[155px] xs:h-[128px]"
          />
          <FlexContainer direction="column" gap={4}>
            <Typography variant="heading3" weight={700} className="xs:text-center">
              {t('history.empty')}
            </Typography>
            <Typography variant="heading3" color="gray" className="xs:text-center">
              {t('history.start_search')}
            </Typography>
          </FlexContainer>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default History;
