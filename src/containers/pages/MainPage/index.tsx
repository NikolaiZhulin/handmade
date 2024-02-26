import { useInView } from 'react-intersection-observer';
import { Fragment, useState } from 'react';

import { useGetPosts } from '@/api/posts/get-posts';
import Container from '@/layout/Container';
import MainWrapper from '@/layout/MainWrapper';
import LeftBlock from '@/layout/LeftBlock';
import RightBlock from '@/layout/RightBlock';
import Loading from '@/ui/Loading';
import CategoryContainer from '@/components/CategoryContainer';
import FlexContainer from '@/layout/FlexContainer';
import Main from '@/layout/Main';
import AnnouncementContainer from '@/components/AnnouncementContainer';
import ChangeView from '@/ui/ChangeView';
import Heading2 from '@/ui/Heading2';
import Announcement from '@/components/Announcement';
import BanerTop from '@/components/BanerTop';
import BanerSidebar from '@/components/BanerSidebar';
import MainPagePostSkeleton from '@/components/Skeletons/MainPagePostSkeleton';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CategoriesBar from '@/components/CategoriesBar';

const MainPage = () => {
  const [view, setView] = useState(false);
  const [isUsdPrice, setIsUsdPrice] = useState(false);
  const { t } = useTranslation();
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  const { data, isLoading, fetchNextPage, isFetching } = useGetPosts({
    filter: { category: 'all' },
    page: { page: 1 },
  });

  const { ref } = useInView({
    onChange: (inView) => {
      const posts = (data?.pages ?? []).reduce((acc, item) => {
        return (acc += item.data.posts.length);
      }, 0);
      if (data && !isLoading && inView && posts % 16 === 0) {
        fetchNextPage();
      }
    },
    threshold: 1,
  });

  return (
    <Main className="xs:!pt-[117px]">
      <Container>
        <BanerTop />
        <MainWrapper className="2xl:flex-col 2xl:!m-0 2xl:!gap-0">
          <LeftBlock className="2xl:!static 2xl:!w-full 2xl:!h-auto 2xl:!pb-[0px]">
            <CategoryContainer />
            {!isLaptop && <BanerSidebar />}
          </LeftBlock>
          <RightBlock className="2xl:!rounded-none xs:!px-[14px]">
            <CategoriesBar />
            <FlexContainer className="mt-[30px]">
              <Heading2>{t('main.lastPosts')}</Heading2>
              <div className="flex items-center gap-[16px]">
                <ChangeView
                  setView={setIsUsdPrice}
                  isGrid={isUsdPrice}
                  leftIconId={
                    <Typography variant="heading3" className="!leading-none">
                      ₾
                    </Typography>
                  }
                  rightIconId={
                    <Typography variant="heading3" className="!leading-none">
                      $
                    </Typography>
                  }
                />
                <ChangeView
                  setView={setView}
                  isGrid={view}
                  leftIconId="list-icon"
                  rightIconId="grid-icon"
                />
              </div>
            </FlexContainer>
            <AnnouncementContainer>
              {data && data.pages
                ? data.pages.map((page, i) => (
                    <Fragment key={i}>
                      {page.data.posts.map((post, i) => (
                        <Announcement key={i} post={post} isGrid={view} isUsdPrice={isUsdPrice} />
                      ))}
                    </Fragment>
                  ))
                : new Array(7).fill(0).map((_, i) => <MainPagePostSkeleton key={i} />)}
              {!isLoading && <div ref={ref} />}
            </AnnouncementContainer>
            {(isLoading || isFetching) && <Loading />}
          </RightBlock>
        </MainWrapper>
      </Container>
    </Main>
  );
};

export default MainPage;
