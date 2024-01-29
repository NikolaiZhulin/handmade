import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { cn } from '@/utils/utils';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';

type Props = {
  onClick: () => void;
  isOpen: boolean;
};

export const ShowAllListButton: FC<Props> = (props) => {
  const { isOpen, onClick } = props;
  const { t } = useTranslation();
  return (
    <button onClick={onClick} className="flex gap-[4px] font-montserrat">
      <Typography variant="text2">{t('all_list')}</Typography>
      <span
        className={cn(
          '[&>svg>path]:fill-black transition-transform origin-center',
          isOpen && 'rotate-180',
        )}
      >
        <HomeSvgSelector id="select_arrow" />
      </span>
    </button>
  );
};
