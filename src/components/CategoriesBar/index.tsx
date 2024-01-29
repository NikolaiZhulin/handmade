import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation } from '@/hooks/useTranslation';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { cn } from '@/utils/utils';
import Typography from '@/ui/Typography';

interface IProps {}

const CategoriesBar: FC<PropsWithChildren<IProps>> = () => {
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect();
  const router = useRouter();
  const { query } = router;

  return (
    <div className="flex flex-col gap-[14px]">
      <Typography className="py-[4px]" variant="heading2">
        {t('main.categoryTitle')}
      </Typography>

      <div className="max-w-full overflow-x-auto flex gap-[14px] pb-[14px]">
        {categories.map((item, index) => {
          const isCategoryItemActive = item.value === query.category;
          return (
            <div className="flex gap-[14px]" key={item.value}>
              <Link href={`/search?category=${item.value}`} key={item.value}>
                <div
                  className={cn(
                    'flex justify-center items-center w-[100px] h-[100px] px-[7px] py-[45px] [&>span]:text-main-green',
                    '2xl:w-[93px]',
                    isCategoryItemActive ? 'bg-main-green [&>span]:text-white' : undefined,
                  )}
                >
                  <span className="font-semibold text-[14px]">{item.label}</span>
                </div>
              </Link>
              {index !== categories.length - 1 && (
                <div className="w-[2px] h-[100px] bg-[#FAF7F1]"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesBar;
