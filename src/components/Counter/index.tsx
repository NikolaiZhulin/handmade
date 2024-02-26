import { FC } from 'react';

import Typography from '@/ui/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { useGetTotalCount } from '@/api/posts/get-total-count';
import { cn } from '@/utils/utils';

import style from './style.module.scss';

interface IProps {
  isHideCounter?: boolean;
}

const Counter: FC<IProps> = ({ isHideCounter }) => {
  const { t } = useTranslation();
  const { data } = useGetTotalCount();

  if (!data) {
    return <div />;
  }

  return (
    <div className={cn(style.Counter, isHideCounter && '2xl:!hidden')}>
      <Typography variant="heading3">{data}</Typography>
      <Typography variant="heading3">{t('totalPostsCount')}</Typography>
    </div>
  );
};

export default Counter;
