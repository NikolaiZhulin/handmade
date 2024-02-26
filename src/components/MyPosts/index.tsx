import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { useGetMyPosts } from '@/api/posts/get-my-posts';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useTranslation } from '@/hooks/useTranslation';
import FlexContainer from '@/layout/FlexContainer';
import Button from '@/ui/Button';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import Announcement from '@/components/Announcement';
import AnnouncementContainer from '@/components/AnnouncementContainer';

import SliderButton from '../SliderButton';
import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import styles from './styles.module.scss';

const MyPosts: FC = () => {
  const [queryState, setQueryState] = useState(true);
  const [hasAnyPosts, setHasAnyPosts] = useState(false);
  const { data: posts, refetch } = useGetMyPosts(queryState.toString());
  const { t } = useTranslation();

  const handleTypeChange = (isActive: boolean) => () => {
    setQueryState(!isActive);
  };

  useEffect(() => {
    if (posts) {
      setHasAnyPosts(posts.hasAnyPosts);
    }
  }, [posts]);

  return (
    <FlexContainer direction="column" align="start" justify="start" className="2xl:!h-full">
      <FlexContainer className={cn(styles.w100, '2xl:flex-col 2xl:!items-start 2xl:gap-[14px]')}>
        <Typography variant="heading2">{t('profile.myPosts')}</Typography>
        <SliderButton
          leftText={t('profile.activePosts')}
          rightText={t('profile.pausedPosts')}
          variant="gray"
          onClick={handleTypeChange}
          small={true}
          className="w-[345px] 2xl:!w-full"
        />
      </FlexContainer>
      {posts && hasAnyPosts ? (
        <>
          {posts.posts.length ? (
            <AnnouncementContainer className="w-full">
              {[...posts.posts, ...posts.posts, ...posts.posts, ...posts.posts, ...posts.posts].map(
                (post) => (
                  <Announcement
                    key={post.id}
                    post={post}
                    isMyAnnouncement
                    refetchPostsList={refetch}
                  />
                ),
              )}
            </AnnouncementContainer>
          ) : (
            <FlexContainer
              direction="column"
              className={mergeStyles(styles.w100, styles.empty, '2xl:!h-full')}
              align="center"
              justify="center"
              gap={20}
            >
              <img src="/images/empty-my-ads.png" alt="banner" className="w-[364px] h-[300px]" />
              <Typography variant="heading3" weight={700}>
                {t('profile.emptyList')}
              </Typography>
            </FlexContainer>
          )}
        </>
      ) : (
        <FlexContainer
          className={mergeStyles(styles.empty, styles.w100)}
          align="center"
          direction="column"
          justify="center"
          gap={10}
        >
          <img
            src="/images/empty-my-ads.png"
            alt="banner"
            className="w-[364px] h-[300px] xs:w-[155px] xs:h-[128px]"
          />
          <FlexContainer direction="column" gap={4}>
            <Typography variant="heading2" weight={700}>
              {t('profile.noPosts')}
            </Typography>
            <Typography variant="text3" color="gray">
              {t('profile.placePost')}
            </Typography>
          </FlexContainer>
          <Link href="/create">
            <Button className="2xl:!px-[10px] text-[14px] xs:!h-[35px] xs:w-[100%]">
              <HomeSvgSelector id={'plus'} />
              {t('header.createPost')}
            </Button>
          </Link>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default MyPosts;
