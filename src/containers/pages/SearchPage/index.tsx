import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useState } from 'react';

import { GetPostsVariables, SortBy, sortAt, useGetPosts } from '@/api/posts/get-posts';
import { ActiveFiltersRow } from '@/components/ActiveFiltersRow';
import Announcement from '@/components/Announcement';
import AnnouncementContainer from '@/components/AnnouncementContainer';
import BanerTop from '@/components/BanerTop';
import CategoriesBar from '@/components/CategoriesBar';
import { FiltersRow } from '@/components/FiltersRow';
import Pagination from '@/components/Pagination';
import PostsEmpty from '@/components/PostsEmpty';
import SearchFilters from '@/components/SearchFilters';
import MainPagePostSkeleton from '@/components/Skeletons/MainPagePostSkeleton';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslation } from '@/hooks/useTranslation';
import Container from '@/layout/Container';
import FlexContainer from '@/layout/FlexContainer';
import LeftBlock from '@/layout/LeftBlock';
import Main from '@/layout/Main';
import MainWrapper from '@/layout/MainWrapper';
import RightBlock from '@/layout/RightBlock';
import ChangeView from '@/ui/ChangeView';
import Select from '@/ui/CustomSelect';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

import { ORDER_OPTIONS } from './config';

interface IProps {}

const SearchPage: FC<IProps> = ({}) => {
  const [isUsdPrice, setIsUsdPrice] = useState(false);
  const [initial, setInitial] = useState(true);
  const { query, push, pathname } = useRouter();
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

  const { data, isLoading, refetch } = useGetPosts(filters);

  useEffect(() => {
    if (!initial) {
      refetch();
      setInitial(false);
    }
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      filter: {
        city: [],
        category: 'all',
        search: '',
        withPhoto: false,
        isJewelry: undefined,
        metal: [],
        sample: [],
        priceFrom: undefined,
        priceTo: undefined,
        madeBy: undefined,
        stone: [],
      },
      page: { page: 1 },
    });
    push({ query: { category: 'all' } }, undefined, { shallow: true });
  };

  const onApplyFilters = (data: GetPostsVariables['filter'], setOnlyCategory?: boolean) => {
    const newQuery: Record<string, string> = {};

    if (setOnlyCategory) {
      newQuery.category = data.category;
      push({ query: { ...newQuery } }, undefined, { shallow: true });
      setFilters(() => ({
        filter: { category: data.category },
        page: { page: 1 },
      }));
    }

    if (data.search) {
      newQuery.search = data.search;
    }

    if (data.search === undefined || data.search === '') {
      newQuery.search = '';
    }
    if (data.category) {
      newQuery.category = data.category;
    }
    if (data.city) {
      newQuery.cities = typeof data.city === 'string' ? data.city : data.city.join(',');
    }

    push({ query: { ...query, ...newQuery } }, undefined, { shallow: true });
    setFilters((prev) => ({
      filter: {
        ...prev.filter,
        ...data,
      },
      page: { page: 1 },
    }));
  };

  useEffect(() => {
    if (query.resetOtherFilters) {
      onApplyFilters({ category: query.category as string }, true);
      push(
        {
          pathname: pathname,
          query: { category: query.category },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [query.resetOtherFilters]);

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
            <LeftBlock className="!pb-0 !w-[200px]">
              <SearchFilters onApplyFilters={onApplyFilters} filters={filters.filter} />
            </LeftBlock>
          )}
          <RightBlock className="xs:!p-[14px]">
            <CategoriesBar onClick={onApplyFilters} />
            {isLaptop && (
              <FiltersRow
                onApplyFilters={onApplyFilters}
                filters={filters.filter}
                className="hidden 2xl:flex pt-[20px]"
              />
            )}
            <>
              <FlexContainer className="mt-[30px] !justify-start 2xl:mt-[15px] xs:!grid xs:grid-cols-2 xs:grid-rows-2 gap-[14px]">
                {data ? (
                  <Typography variant="heading2" className={'xs:col-start-1 xs:col-end-3'}>
                    {t('last_ads')}
                  </Typography>
                ) : (
                  <div />
                )}
                <FlexContainer gap={14} className="ml-auto mr-[14px] xs:w-full">
                  <Select
                    trigger={({ isOpen, toggleOpen, triggerRef, currentOption }) => (
                      <button
                        className={cn(
                          'flex gap-[4px] items-center bg-white pl-[16px] pr-[4px] h-[32px]',
                          'whitespace-nowrap text-[14px] leading-[18px] min-w-[155px] justify-end xs:pl-[0] xs:justify-start',
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
                    containerClassname="w-[224px] xs:w-auto justify-end"
                    options={ORDER_OPTIONS}
                    withCheckBox
                    placeholder=""
                    onSelect={handleSortChange}
                    defaultValue={ORDER_OPTIONS[0]}
                    withTranslate={true}
                  />
                </FlexContainer>
                <div className={'xs:!ml-auto'}>
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
                </div>
              </FlexContainer>
            </>
            <ActiveFiltersRow filters={filters} onApplyFilters={onApplyFilters} />
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
              </AnnouncementContainer>
            ) : isLoading ? (
              <AnnouncementContainer>
                {(!data || isLoading) &&
                  new Array(6).fill(0).map((_, i) => <MainPagePostSkeleton key={i} />)}
              </AnnouncementContainer>
            ) : (
              <PostsEmpty onClick={resetFilters} />
            )}

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
