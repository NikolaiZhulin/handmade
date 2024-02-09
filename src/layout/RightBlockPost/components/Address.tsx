import { FC } from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

interface IProps {
  city: string;
  address?: string;
  className?: string;
}

export const PostAddress: FC<IProps> = ({ city, address, className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex items-center gap-[14px] py-[10px] border-y-[1px]', className)}>
      <div className="[&>svg]:w-[24px] [&>svg]:shrink-0 [&>svg]:h-auto">
        <HomeSvgSelector id="geo" />
      </div>
      <div>
        <Typography variant="text2">{t(`cities.${city}`)}</Typography>
        <Typography variant="text2">{address}</Typography>
      </div>
    </div>
  );
};
