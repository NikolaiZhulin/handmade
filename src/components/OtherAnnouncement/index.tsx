import { FC } from 'react';
import Link from 'next/link';

import { IMainPagePost } from '@/types/posts';
import Typography from '@/ui/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Button from '@/ui/Button';

import AnnouncementContainer from '../AnnouncementContainer';
import Announcement from '../Announcement';

import style from './style.module.scss';

interface IProps {
  posts: IMainPagePost[];
  totalCount: number;
  userId: string;
}

const OtherAnnouncement: FC<IProps> = ({ posts, totalCount, userId }) => {
  const { t } = useTranslation();
  const isLaptop = useMediaQuery('(max-width: 900px)');

  const SHOWED_POSTS = isLaptop ? 2 : 3;
  const diff = totalCount - SHOWED_POSTS;

  return (
    <div
      className={cn(
        style.OtherAnnouncement,
        '2xl:!px-[30px] xs:!px-[14px] xs:!mt-[14px] 2xl:!pt-0',
      )}
    >
      <Typography variant="heading2">{t('post.userPosts')}</Typography>
      <AnnouncementContainer className={style.AnnouncementContainer}>
        {posts.slice(0, SHOWED_POSTS).map((post) => (
          <Announcement post={post} key={post.id} />
        ))}
      </AnnouncementContainer>
      {diff > 0 && (
        <div className="w-full flex justify-center">
          <Link href={`/user/${userId}/posts`}>
            <Button className="text-white font-medium">
              {t('post.showAll')}
              <span className="text-white">({totalCount})</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OtherAnnouncement;
