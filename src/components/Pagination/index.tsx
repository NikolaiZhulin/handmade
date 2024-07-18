import { Dispatch, FC, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';

import { IPagination } from '@/types/common';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Filters, SortBy } from '@/api/posts/get-posts';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';

interface IProps {
  meta?: IPagination;
  setRules: Dispatch<
    SetStateAction<{
      filter: Filters;
      page?: {
        page?: number;
        limit?: number;
      };
      sort?: {
        sortBy?: SortBy;
        sortAt?: 'ASC' | 'DESC';
      };
    }>
  >;
}

const emptyPaginationClassName =
  'w-[40px] h-[40px] flex gap-[2px] items-center [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:transition-[color] [&>a]:items-center [&>a]:justify-center [&>a]:text-black [&>a]:text-[14px] [&>a]:leading-[18px] [&>a]:font-montserrat';

const Pagination: FC<IProps> = ({ meta, setRules }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div className={style.Pagination}>
      <ReactPaginate
        pageCount={meta?.pageCount ?? 0}
        marginPagesDisplayed={isMobile ? 2 : 3}
        pageRangeDisplayed={isMobile ? 2 : 3}
        breakLabel="..."
        renderOnZeroPageCount={null}
        breakClassName={emptyPaginationClassName}
        containerClassName="flex gap-[4px] items-center"
        pageClassName={cn(
          emptyPaginationClassName,
          'bg-white transition-[background] duration-300 hover:bg-light-gray [&>a]:text-[#4E6C50] [&>a]:font-medium',
        )}
        activeClassName={cn(emptyPaginationClassName, '!bg-main-green [&>a]:!text-white')}
        previousLabel={
          <a href="#">
            <HomeSvgSelector id="arrow-left" />
          </a>
        }
        nextLabel={
          <a href="#">
            <HomeSvgSelector id="arrow-left" />
          </a>
        }
        nextClassName="rotate-180"
        onPageChange={({ selected }) => {
          setRules((prev) => ({ ...prev, page: { ...prev.page, page: selected + 1 } }));
        }}
      />
    </div>
  );
};

export default Pagination;
