import { useMemo } from 'react';

import { useGetCategories } from '@/api/posts/get-categories';
import { capitalize } from '@/helpers/capitalize';
import { ICategoryItem } from '@/types/posts';
import { getImage } from '@/helpers/getImage';

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
          [iconKey]: (
            <img
              src={getImage(cat.icon)}
              className="w-[24px] h-[24px] transition-filter duration-300 ease-out group-hover:brightness-0 group-hover:invert-[1]"
            />
          ),
        };
      });
    }
    return [];
  }, [data, language]);

  return selectValues;
};
