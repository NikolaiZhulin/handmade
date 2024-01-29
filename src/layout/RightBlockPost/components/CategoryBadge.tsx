import { FC } from 'react';

import { getCreatedAtDatePhrase } from '@/helpers/getTime';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';
import Typography from '@/ui/Typography';

interface IProps {
  value: string;
  time?: string;
}

export const CategoryBadge: FC<IProps> = ({ value, time }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex items-center justify-between py-[8px]')}>
      <Typography
        variant="text2"
        className={cn('px-[10px] py-[4px] bg-light-gray overflow-hidden')}
      >
        {t(`categories.${value}`)}
      </Typography>
      {time && (
        <Typography variant="text3" color="gray">
          {getCreatedAtDatePhrase(time, t)}
        </Typography>
      )}
    </div>
  );
};
