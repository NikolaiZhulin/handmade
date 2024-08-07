import { useMemo } from 'react';

import { useGetCategories } from '@/api/posts/get-categories';
import { capitalize } from '@/helpers/capitalize';
import { ICategoryItem } from '@/types/posts';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';

import { useTranslation } from './useTranslation';

export const useGetCategoriesForSelect = (iconKey = 'icon') => {
  const {
    i18n: { language },
  } = useTranslation();
  const { data } = useGetCategories();

  const selectValues = useMemo(() => {
    if (data) {
      return data.categories.map((cat) => {
        const key = `name${capitalize(language)}`;

        return {
          value: cat.slug,
          label: cat[key as keyof ICategoryItem],
          [iconKey]: <HomeSvgSelector id={`category-${cat.slug}`} />,
        };
      });
    }
    return [];
  }, [data, language]);

  return selectValues;
};
