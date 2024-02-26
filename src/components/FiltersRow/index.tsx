import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import SearchFilters from '@/components/SearchFilters';
import Modal from '@/containers/Modal';
import { GetPostsVariables } from '@/api/posts/get-posts';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CustomSelect from '@/ui/CustomSelect';
import { cities } from '@/constants/cities';

type Props = {
  onApplyFilters: (data: GetPostsVariables['filter']) => void;
  className?: string;
};

export const FiltersRow: FC<Props> = (props) => {
  const { onApplyFilters, className } = props;
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
        <SearchFilters
          onApplyFilters={onApplyFilters}
          onModalClose={() => setIsFilterModalOpen(false)}
        />
      </Modal>
      <div
        className={cn(
          'flex gap-[30px] items-center max-w-full overflow-x-auto py-[1px] pb-[10px]',
          className,
        )}
      >
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="text-main-green flex gap-[8px] pl-[16px] items-center"
        >
          <HomeSvgSelector id="filters-icon" />
          {t('search.filters')}
        </button>
        <CustomSelect
          placeholder={'Город'}
          containerClassname="min-w-[155px]"
          options={[{ value: 'all', label: t('inputs.allCategories') }, ...cities]}
        />
        <CustomSelect
          placeholder={'Изделие'}
          containerClassname="min-w-[155px]"
          options={[{ value: 'all', label: t('inputs.allCategories') }, ...cities]}
        />
        <CustomSelect
          placeholder={'Металл'}
          containerClassname="min-w-[155px]"
          options={[{ value: 'all', label: t('inputs.allCategories') }, ...cities]}
        />
      </div>
    </>
  );
};
