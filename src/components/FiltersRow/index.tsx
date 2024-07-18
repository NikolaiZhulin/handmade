import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import SearchFilters from '@/components/SearchFilters';
import Modal from '@/containers/Modal';
import { Filters, GetPostsVariables } from '@/api/posts/get-posts';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Props = {
  onApplyFilters: (data: GetPostsVariables['filter']) => void;
  filters: Filters;
  className?: string;
};

export const FiltersRow: FC<Props> = (props) => {
  const { onApplyFilters, className, filters } = props;
  const canModalOpen = useMediaQuery('(max-width: 1200px)');

  useEffect(() => {
    if (canModalOpen) {
      return;
    }
    setIsFilterModalOpen(false);
  }, [canModalOpen]);

  const { t } = useTranslation();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
      <Modal
        isVisible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        backdropClassName="xs:!h-[calc(var(--app-height))] xs:!top-0"
        innerWrapperClassName="!w-full !h-[calc(var(--app-height))] xs:overflow-auto"
        title="Фильтрация"
        withCloseButton
      >
        {canModalOpen && (
          <SearchFilters
            onApplyFilters={onApplyFilters}
            onModalClose={() => setIsFilterModalOpen(false)}
            filters={filters}
          />
        )}
      </Modal>
      <div
        className={cn(
          'flex gap-[30px] items-center max-w-full overflow-x-auto py-[1px]',
          className,
        )}
      >
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="text-main-green flex gap-[8px]  items-center"
        >
          <HomeSvgSelector id="filters-icon" />
          {t('search.filters')}
        </button>
        {/*<CustomSelect*/}
        {/*  placeholder={'Город'}*/}
        {/*  containerClassname="min-w-[155px]"*/}
        {/*  options={[{ value: 'all', label: t('inputs.allCategories') }, ...cities]}*/}
        {/*/>*/}
        {/*<CustomSelect*/}
        {/*  placeholder={t('product')}*/}
        {/*  containerClassname="min-w-[155px]"*/}
        {/*  options={[{ value: 'all', label: t('inputs.allCategories') }, ...cities]}*/}
        {/*/>*/}
        {/*<CustomSelect*/}
        {/*  placeholder={t('metal')}*/}
        {/*  containerClassname="min-w-[155px]"*/}
        {/*  options={[{ value: 'all', label: t('inputs.allCategories') }, ...cities]}*/}
        {/*/>*/}
      </div>
    </>
  );
};
