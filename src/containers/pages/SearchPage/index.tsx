import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useState } from 'react';
// import { useInView } from 'react-intersection-observer';

import {
  GetPostsVariables,
  SortBy,
  sortAt,
  useGetPosts,
  // useGetPostsWithPagination,
} from '@/api/posts/get-posts';
import Announcement from '@/components/Announcement';
import AnnouncementContainer from '@/components/AnnouncementContainer';
import SearchFilters from '@/components/SearchFilters';
import Container from '@/layout/Container';
import FlexContainer from '@/layout/FlexContainer';
import LeftBlock from '@/layout/LeftBlock';
import Main from '@/layout/Main';
import MainWrapper from '@/layout/MainWrapper';
import RightBlock from '@/layout/RightBlock';
import ChangeView from '@/ui/ChangeView';
import Loading from '@/ui/Loading';
import PostsEmpty from '@/components/PostsEmpty';
import BanerTop from '@/components/BanerTop';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import MainPagePostSkeleton from '@/components/Skeletons/MainPagePostSkeleton';
import { cn } from '@/utils/utils';
import Select from '@/ui/CustomSelect';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useMediaQuery } from '@/hooks/useMediaQuery';
// import Drawer from '@/ui/Drawer';
// import Button from '@/ui/Button';
import CategoriesBar from '@/components/CategoriesBar';
import Pagination from '@/components/Pagination';
// import { IGetWordsVariables } from '@/api/admin/key-words/get-words';
// import Modal from '@/containers/Modal';
// import AuthWrapper from '@/containers/AuthWrapper';
import { FiltersRow } from '@/components/FiltersRow';
import { ActiveFilterItem } from '@/ui/ActiveFilterItem';

import { ORDER_OPTIONS } from './config';

interface IProps {}

const SearchPage: FC<IProps> = ({}) => {
  // const [isGrid, setIsGrid] = useState(true);

  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isUsdPrice, setIsUsdPrice] = useState(false);
  const [initial, setInitial] = useState(true);
  const { query, push } = useRouter();
  const { t } = useTranslation();
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  const [filters, setFilters] = useState<GetPostsVariables>({
    filter: {
      category: query.category as string,
      search: (query.search as string) ?? undefined,
      city: query.cities
        ? query.cities === 'all'
          ? ['all']
          : (query.cities as string).split(',')
        : undefined,
    },
    page: { page: 1, limit: 9 },
  });

  const { data, isLoading, isFetching, refetch } = useGetPosts(filters);
  // const { data, isLoading, isFetching, refetch } = useGetPostsWithPagination(filters);

  // const { ref } = useInView({
  //   onChange: (inView) => {
  //     const posts = (data?.pages ?? []).reduce((acc, item) => {
  //       return (acc += item.data.posts.length);
  //     }, 0);
  //
  //     if (data && !isLoading && inView && posts % 16 === 0 && hasNextPage && !isFetching) {
  //       fetchNextPage();
  //     }
  //   },
  // });

  useEffect(() => {
    if (!initial) {
      refetch();
      setInitial(false);
    }
  }, [filters]);

  const onApplyFilters = (data: GetPostsVariables['filter']) => {
    const newQuery: Record<string, string> = {};

    if (data.search) {
      newQuery.search = data.search;
    }
    if (data.category) {
      newQuery.category = data.category;
    }
    if (data.city) {
      newQuery.cities = typeof data.city === 'string' ? data.city : data.city.join(',');
    }

    push({ query: newQuery }, undefined, { shallow: true });

    setFilters((prev) => ({
      filter: {
        ...prev.filter,
        ...data,
      },
      page: { page: 1 },
    }));
    if (isLaptop) {
      // setIsDrawerOpen(false);
    }
  };

  const resetFilters = () => {
    setFilters({ filter: { category: 'all', withPhoto: false, isUsed: true }, page: { page: 1 } });
    push({ query: { category: 'all' } }, undefined, { shallow: true });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortAt] = value.split('-') as [SortBy, sortAt];
    setFilters((prev) => ({ ...prev, sort: { sortAt, sortBy } }));
  };

  return (
    <Main className="2xl:!pb-[100px] xs:!pt-[117px]">
      <Container>
        <BanerTop />
        <MainWrapper className="2xl:!mt-0">
          {isLaptop ? null : (
            <LeftBlock>
              <SearchFilters onApplyFilters={onApplyFilters} />
            </LeftBlock>
          )}
          <RightBlock className="xs:!p-[14px]">
            <CategoriesBar />
            <FiltersRow onApplyFilters={onApplyFilters} className="hidden 2xl:flex mt-[20px]" />
            <>
              <FlexContainer className="mt-[30px] !justify-start xs:!grid xs:grid-cols-2 xs:grid-rows-2 gap-[14px]">
                {data ? (
                  <Typography variant="heading2">
                    {/*{t('search.found')}{' '}*/}
                    {/*{data?.pages.reduce((acc, page) => {*/}
                    {/*  return acc + page.meta.itemCount;*/}
                    {/*}, 0) ?? 0}{' '}*/}
                    {/*{t('search.foundPosts')}*/}
                    Последние
                  </Typography>
                ) : (
                  <div />
                )}
                <FlexContainer gap={14} className="ml-auto mr-[14px] xs:mr-[0]">
                  <Select
                    trigger={({ isOpen, toggleOpen, triggerRef, currentOption }) => (
                      <button
                        className={cn(
                          'flex gap-[4px] items-center bg-white pl-[16px] pr-[4px] h-[32px]',
                          'whitespace-nowrap text-[14px] leading-[18px] min-w-[155px] justify-end',
                        )}
                        ref={triggerRef}
                        onClick={() => toggleOpen((prev) => !prev)}
                      >
                        {t(currentOption?.label ?? '')}
                        <span
                          className={cn(
                            '[&>svg>path]:fill-black transition-transform origin-center shrink-0',
                            isOpen && 'rotate-180',
                          )}
                        >
                          <HomeSvgSelector id="select_arrow" />
                        </span>
                      </button>
                    )}
                    optionClassname="text-[14px] font-montserrat leading-[18px] px-[12px] whitespace-nowrap"
                    containerClassname="w-[204px] xs:w-auto justify-end"
                    options={ORDER_OPTIONS}
                    withCheckBox
                    placeholder=""
                    onSelect={handleSortChange}
                    defaultValue={ORDER_OPTIONS[0]}
                    withTranslate={true}
                  />

                  {/*<ChangeView*/}
                  {/*  setView={setIsGrid}*/}
                  {/*  isGrid={isGrid}*/}
                  {/*  leftIconId="list-icon"*/}
                  {/*  rightIconId="grid-icon"*/}
                  {/*/>*/}
                </FlexContainer>
                <ChangeView
                  setView={setIsUsdPrice}
                  isGrid={isUsdPrice}
                  leftIconId={
                    <Typography variant="text2" className="!leading-none">
                      ₾
                    </Typography>
                  }
                  rightIconId={
                    <Typography variant="text2" className="!leading-none">
                      $
                    </Typography>
                  }
                />
              </FlexContainer>
            </>
            <div className="flex items-center gap-[14px] flex-wrap mt-[14px]">
              <ActiveFilterItem onClick={() => console.log(1)} filterText={'Серебро'} />
              <ActiveFilterItem onClick={() => console.log(1)} filterText={'Серебро'} />
              <ActiveFilterItem onClick={() => console.log(1)} filterText={'Серебро'} />
            </div>
            {data && data.pages?.[0].data.posts.length ? (
              <AnnouncementContainer>
                {data &&
                  data.pages &&
                  data.pages.map((page, i) => (
                    <Fragment key={i}>
                      {page.data.posts.map((post, i) => (
                        <Announcement key={i} post={post} isUsdPrice={isUsdPrice} />
                      ))}
                    </Fragment>
                  ))}
                {/*<div ref={ref} />*/}
              </AnnouncementContainer>
            ) : isLoading ? (
              <div className={cn('flex flex-col gap-[14px] mt-[18px]')}>
                {(!data || isLoading) &&
                  new Array(7).fill(0).map((_, i) => <MainPagePostSkeleton key={i} />)}
              </div>
            ) : (
              <PostsEmpty onClick={resetFilters} />
            )}
            {isLoading ||
              (isFetching && (
                <div className="w-full flex justify-center">
                  <Loading />
                </div>
              ))}
            <div className="pt-[20px] mt-[60px] border-t border-solid border-light-gray 2xl:border-none 2xl:!mt-[30px] xs:border-solid">
              <Pagination meta={data?.pages[0].meta} setRules={setFilters} />
            </div>
          </RightBlock>
        </MainWrapper>
      </Container>
    </Main>
  );
};

export default SearchPage;
