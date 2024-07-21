import { FC } from 'react';

import { Filters, GetPostsVariables } from '@/api/posts/get-posts';
import { useTranslation } from '@/hooks/useTranslation';
import { ActiveFilterItem } from '@/ui/ActiveFilterItem';

type Props = {
  filters: GetPostsVariables;
  onApplyFilters: (data: GetPostsVariables['filter']) => void;
};

type ActiveFilterObj<T> = {
  name: string;
  filterField: keyof Filters;
  value: T;
};

const capitalizeFirstLetter = (word?: string) => {
  if (!word) {
    return null;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};

function createActiveFilterObj<T>(
  name: string,
  filterField: keyof Filters,
  value: T,
): ActiveFilterObj<T> {
  const obj = {
    name,
    filterField,
    value,
  };

  return obj;
}

export const ActiveFiltersRow: FC<Props> = (props) => {
  const { filters, onApplyFilters } = props;
  const activeFilters = filters.filter;
  const { t } = useTranslation();

  const categoryFilter = createActiveFilterObj<string>(
    (activeFilters?.category
      ? capitalizeFirstLetter(t(`categories.${activeFilters?.category}`))
      : undefined) || t('categories.all'),
    'category',
    activeFilters?.category || 'all',
  );
  const cityFilter = activeFilters.city?.map((f) =>
    createActiveFilterObj<string>(t(`cities.${f}`), 'city', f),
  );
  const isJewelryFilter = activeFilters.isJewelry
    ? createActiveFilterObj<undefined>(t('post.bijouterie'), 'isJewelry', undefined)
    : undefined;

  const metalFilter = activeFilters?.metal?.map((f) =>
    createActiveFilterObj<string>(t(`metals.${f}`), 'metal', f),
  );
  const priceFromFilter = activeFilters?.priceFrom
    ? createActiveFilterObj<string>(
        t('priceFrom') + ' ' + activeFilters.priceFrom,
        'priceFrom',
        activeFilters.priceFrom.toString(),
      )
    : undefined;
  const priceToFilter = activeFilters?.priceTo
    ? createActiveFilterObj<string>(
        t('priceTo') + ' ' + activeFilters.priceTo,
        'priceTo',
        activeFilters.priceTo.toString(),
      )
    : undefined;
  const sampleFilter = activeFilters?.sample?.map((f) =>
    createActiveFilterObj<string>(t('sample') + ' ' + f, 'sample', f),
  );
  const searchFilter = activeFilters?.search
    ? createActiveFilterObj<string>(activeFilters?.search, 'search', activeFilters.search)
    : undefined;
  const stoneFilter = activeFilters?.stone?.map((f) =>
    createActiveFilterObj<string>(t(`stones.${f}`), 'stone', f),
  );
  const withPhotoFilter = activeFilters?.withPhoto
    ? createActiveFilterObj<boolean>(t('inputs.onlyImage'), 'withPhoto', activeFilters.withPhoto)
    : undefined;
  const sexFilter = activeFilters.sex?.map((f) => createActiveFilterObj<string>(t(f), 'sex', f));
  const madeByFilter = activeFilters.madeBy
    ? createActiveFilterObj<undefined>(t(activeFilters.madeBy), 'madeBy', undefined)
    : undefined;

  const allActiveFilters: ActiveFilterObj<string | boolean | undefined>[] = [
    categoryFilter,
    ...(cityFilter || []),
    ...(isJewelryFilter ? [isJewelryFilter] : []),
    ...(metalFilter || []),
    ...(priceFromFilter ? [priceFromFilter] : []),
    ...(priceToFilter ? [priceToFilter] : []),
    ...(sampleFilter || []),
    ...(searchFilter ? [searchFilter] : []),
    ...(stoneFilter || []),
    ...(withPhotoFilter ? [withPhotoFilter] : []),
    ...(sexFilter || []),
    ...(madeByFilter ? [madeByFilter] : []),
  ]
    .flat()
    .filter((item) => Boolean(item));

  const handleFilterItemClick = (updatedFilters: Filters) => {
    onApplyFilters(updatedFilters);
  };

  const filteredActiveFilters = allActiveFilters.filter((filt) => filt.value !== 'all');

  return (
    <div className="flex items-center gap-[14px] max-w-full overflow-x-auto mt-[14px] pb-[8px]">
      {filteredActiveFilters.map((filt, index) => {
        let updatedFilters: Filters;

        if (typeof filt.value === 'boolean') {
          updatedFilters = { ...filters.filter, [filt.filterField]: !filt.value };
        }
        if (typeof filt.value === 'string') {
          updatedFilters = {
            ...filters.filter,
            [filt.filterField]: filt.filterField === 'category' ? 'all' : undefined,
          };
        }
        if (filt.value === undefined) {
          updatedFilters = { ...filters.filter, [filt.filterField]: filt.value };
        }
        if (Array.isArray(filters.filter[filt.filterField])) {
          const initItems = filters.filter[filt.filterField] as string[];
          const filteredItems = initItems.filter((item) => item !== filt.value);
          updatedFilters = { ...filters.filter, [filt.filterField]: filteredItems };
        }
        return (
          <ActiveFilterItem
            key={index}
            filterText={filt.name}
            onClick={() => handleFilterItemClick(updatedFilters)}
          />
        );
      })}
    </div>
  );
};
