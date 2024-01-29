import { FC } from 'react';
import Link from 'next/link';

import ButtonLogin from '@/ui/ButtonLogin';
import { IMainPagePost } from '@/types/posts';
import Typography from '@/ui/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';

import AnnouncementContainer from '../AnnouncementContainer';
import Announcement from '../Announcement';

import style from './style.module.scss';

interface IProps {
  posts: IMainPagePost[];
  totalCount: number;
  userId: string;
}

const OtherAnnouncement: FC<IProps> = ({ posts, totalCount, userId }) => {
  const diff = totalCount - posts.length;
  const { t } = useTranslation();

  return (
    <div className={cn(style.OtherAnnouncement, 'xs:!p-[14px] 2xl:!pt-0')}>
      <Typography variant="heading2">{t('post.userPosts')}</Typography>
      <AnnouncementContainer className={style.AnnouncementContainer}>
        {posts.map((post) => (
          <Announcement post={post} key={post.id} />
        ))}
      </AnnouncementContainer>
      {diff > 0 && (
        <Link href={`/user/${userId}/posts`}>
          <ButtonLogin className={style.ButtonLogin}>
            <span>({totalCount})</span>
            {t('post.showAll')}
          </ButtonLogin>
        </Link>
      )}
    </div>
  );
};

export default OtherAnnouncement;
