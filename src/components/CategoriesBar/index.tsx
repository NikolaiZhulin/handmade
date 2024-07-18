import { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from '@/hooks/useTranslation';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { cn } from '@/utils/utils';
import Typography from '@/ui/Typography';
import { GetPostsVariables } from '@/api/posts/get-posts';

interface IProps {
  onClick: (data: GetPostsVariables['filter']) => void;
}

const CategoriesBar: FC<PropsWithChildren<IProps>> = (props) => {
  const { onClick } = props;
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect();
  const router = useRouter();
  const { query } = router;
  const allCategory = { icon: '', value: 'all', label: t('categories.all') };

  const handleCategoryClick = (value: string) => {
    onClick({ category: value });
  };

  return (
    <div className="flex flex-col gap-[14px]">
      <Typography className="py-[4px]" variant="heading2">
        {t('main.categoryTitle')}
      </Typography>

      <div className="max-w-full overflow-x-auto flex gap-[8px] pb-[14px]">
        {[allCategory, ...categories].map((item, index) => {
          const isCategoryItemActive = item.value === query.category;
          return (
            <div className="flex gap-[8px]" key={item.value}>
              <button key={item.value} onClick={() => handleCategoryClick(item.value)}>
                <div
                  className={cn(
                    'flex justify-center items-center w-[90px] h-[50px] px-[7px] py-[25px] [&>span]:text-main-green',
                    '2xl:w-[93px] 2xl:h-[60px]',
                    isCategoryItemActive ? 'bg-main-green [&>span]:text-white' : undefined,
                  )}
                >
                  <span className="font-semibold text-[12px]">{item.label}</span>
                </div>
              </button>
              {index !== categories.length && (
                <div className="w-[2px] h-[50px] bg-[#FAF7F1] 2xl:h-[60px]"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesBar;
