import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { useGetMyPosts } from '@/api/posts/get-my-posts';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useTranslation } from '@/hooks/useTranslation';
import FlexContainer from '@/layout/FlexContainer';
import Button from '@/ui/Button';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

import SliderButton from '../SliderButton';
import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import { Currency } from '@/constants/enums';
import ProfilePost from './components/ProfilePost';
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
    <FlexContainer
      direction="column"
      gap={14}
      align="start"
      justify="start"
      className="2xl:!h-full"
    >
      {hasAnyPosts && (
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
      )}
      {posts && hasAnyPosts ? (
        <>
          a
          {posts.posts.length ? (
            <FlexContainer direction="column" className={styles.w100}>
              {posts.map((post, i) => {
                console.log(post);

                return (
                  <ProfilePost
                    key={post.id}
                    withBorder={i !== posts.posts.length - 1}
                    post={post}
                    disabled={!queryState}
                    refetch={refetch}
                  />
                );
              })}
            </FlexContainer>
          ) : (
            <FlexContainer
              direction="column"
              className={mergeStyles(styles.w100, styles.empty, '2xl:!h-full')}
              align="center"
              justify="center"
              gap={20}
            >
              <HomeSvgSelector id="empty_folder" />
              <Typography variant="heading3" weight={700}>
                {t('profile.emptyList')}
              </Typography>
            </FlexContainer>
          )}
        </>
      ) : (
        <FlexContainer
          className={mergeStyles(styles.empty, styles.w100, '2xl:!h-full')}
          align="center"
          direction="column"
          justify="center"
          gap={20}
        >
          <HomeSvgSelector id="empty_folder" />
          <FlexContainer direction="column">
            <Typography variant="heading3" weight={700}>
              {t('profile.noPosts')}
            </Typography>
            <Typography variant="heading3" color="gray" className={styles.maxText}>
              {t('profile.placePost')}
            </Typography>
          </FlexContainer>
          <Link href="/create">
            <Button>{t('header.createPost')}</Button>
          </Link>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default MyPosts;
// const mock_post = {
//   id: '123',
//   images: [],
//   nameRu: 'Мок пост',
//   nameEn: 'Mock post',
//   nameGe: 'Geargian post',
//   price: 700,
//   currency: Currency.USD,
//   updatedAt: '',
//   textRu:
//     'Мок постМок постМок постМок постМок постМок постМок постМок постМок постМок постМок пост',
//   textEn: 'Mock postMock postMock postMock postMock postMock postMock post',
//   city: 'Novi Sad',
//   categories: 'Jewelry',
//   contacts: {
//     phone: '99234234234',
//     additionalPhone: '625464643646',
//     telegram: '@adfsdf',
//     name: 'Antocjs',
//     isPhoneActive: true,
//     isAdditionalPhoneActive: true,
//   },
//   isActive: true,
//   isUsed: true,
//   usedAmount: 3,
//   usedPeriod: 'month',
//   address: 'janka cmelica',
//   usdPrice: 600,
// };
