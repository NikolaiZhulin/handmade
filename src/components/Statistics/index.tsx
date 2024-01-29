import { FC } from 'react';

import { useTranslation } from '@/hooks/useTranslation';

import style from './style.module.scss';

interface IProps {
  text: string;
  total: number;
  tg: number;
  web: number;
}

const Statistics: FC<IProps> = ({ text, total, tg, web }) => {
  const { t } = useTranslation();

  return (
    <div className={style.Statistics}>
      <div className={style.NumberContainer}>
        <span className={style.Total}>{total}</span> (<span className={style.Site}>{web}</span>
        <span>/</span>
        <span className={style.Parser}>{tg}</span>)
      </div>
      <span className={style.Period}>{text}</span>
      <span className={style.Info}>({t('admin.posts.sourceStat')})</span>
    </div>
  );
};

export default Statistics;
