import { FC } from 'react';

import { IPostResponse } from '@/types/posts';
import Typography from '@/ui/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import Announcement from '@/components/Announcement';

interface IProps {
  posts: IPostResponse['posts'];
}

const PostsBlock: FC<IProps> = ({ posts }) => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 border-2 2xl:w-full">
      <Typography variant="heading2" weight={700} className="mb-[14px]">
        {t('userPosts.title')}: {posts.length}
      </Typography>
      <div className="grid grid-cols-2 gap-[20px] w-full">
        {posts.map((post) => (
          <Announcement key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsBlock;
