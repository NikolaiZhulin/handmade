import { FC } from 'react';

import Button from '@/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';

import styles from './styles.module.scss';

interface IProps {
  onClick: () => void;
}

const PostsEmpty: FC<IProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <img src="/images/posts_empty.png" className="w-[326px] h-[300px]" />
      <div className={styles.text}>
        <Typography variant="heading2">{t('search.noPosts')}</Typography>
        <Typography variant="text3" className={styles.grayText}>
          {t('search.changeQuery')}
        </Typography>
      </div>
      <Button onClick={onClick}>{t('search.reset')}</Button>
    </div>
  );
};

export default PostsEmpty;
