import { FC, PropsWithChildren, useState } from 'react';
import Link from 'next/link';

import Category from '@/ui/Category';
import Heading2 from '@/ui/Heading2';
import { useTranslation } from '@/hooks/useTranslation';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Button from '@/ui/Button';
import Typography from '@/ui/Typography';

import style from './style.module.scss';

interface IProps {}

const CategoryContainer: FC<PropsWithChildren<IProps>> = () => {
  const [isShowAll, setIsShowAll] = useState(false);
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect();
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  return (
    <div
      className={cn(
        style.CategoryContainer,
        '2xl:!rounded-none 2xl:!w-full',
        'xs:!p-[14px] xs:!gap-[14px]',
      )}
    >
      <Heading2>{t('main.categoryTitle')}</Heading2>
      <div>
        {categories
          .slice(0, !isLaptop ? categories.length : isShowAll ? categories.length : 5)
          .map((item) => (
            <Link href={`/?category=${item.value}`} key={item.value}>
              <Category>
                {item.icon}
                <span className="relative top-[1px]">{item.label}</span>
              </Category>
            </Link>
          ))}
      </div>
      {isLaptop && (
        <Button
          onClick={() => setIsShowAll((prev) => !prev)}
          color="neutral"
          className="!h-[32px]"
          fullWidth={true}
        >
          <Typography variant="heading3" weight={700}>
            {isShowAll ? 'Скрыть' : 'Все категории'}
          </Typography>
        </Button>
      )}
    </div>
  );
};

export default CategoryContainer;
