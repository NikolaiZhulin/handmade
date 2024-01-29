import { FC } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { IAdminPost } from '@/types/admin/posts';
import { useTranslation } from '@/hooks/useTranslation';
import { capitalize } from '@/helpers/capitalize';
import Select from '@/ui/Select';
import { useUpdateAdminPost } from '@/api/admin/posts/update-post';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { useDeleteAdminPost } from '@/api/admin/posts/delete-post';
import ConfirmBeforeClick from '@/components/ConfirmBeforeClick';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';

import style from '../style.module.scss';

import PostPreview from './PostPreview';

interface IProps {
  post: IAdminPost;
  refetch: () => void;
}

const TableRow: FC<IProps> = ({ post, refetch }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const categories = useGetCategoriesForSelect();
  const { mutate: updatePost } = useUpdateAdminPost(() => {
    refetch();
    toast.success(t('post.postUpdated'));
  }, getErrorToast);
  const { mutate: deletePost } = useDeleteAdminPost(() => {
    refetch();
    toast.success(t('post.postDeleted'));
  }, getErrorToast);

  const langs = [post.textRu, post.textEn, post.textGe];
  let currentLangText = post[`text${capitalize(language)}` as keyof typeof post] as string;
  if (!currentLangText) {
    currentLangText = langs.find((el) => el) as string;
  }

  const updateCategory = (value: string, cb?: () => void) => {
    updatePost({ id: post.id, category: value });
    cb?.();
    refetch();
  };

  return (
    <div className={style.TableItem}>
      <div className={style.Item}>
        <PostPreview post={post} update={updateCategory} />
      </div>
      <div className={style.Item}>
        <span>
          {new Date(post.createdAt).toLocaleDateString('ru-RU', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}
        </span>
        <span>
          {new Date(post.createdAt).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: 'numeric',
          })}
        </span>
      </div>
      <div className={style.Item}>
        <p className="max-h-full overflow-hidden">{currentLangText}</p>
      </div>
      <div className={style.Item}>
        <Select
          options={categories}
          placeholder=""
          withIcon={false}
          value={categories.find((el) => el.value === post.categories[0])}
          className="[&>p]:whitespace-nowrap [&>p]:overflow-hidden [&>p]:text-ellipsis [&>p]:w-[75%] ring-0"
          contentClassName="w-[150px] max-h-[230px] overflow-y-scroll shadow-sortShadow"
          onChange={updateCategory}
        />
      </div>
      <div className={style.Item}>
        <span>{capitalize(post.source)}</span>
      </div>
      <div className={style.Item}>
        <Link href={`/admin/dashboard/users/${post.userId}`} prefetch={false}>
          {post.userId}
        </Link>
      </div>
      <div className={style.Item}>
        <ConfirmBeforeClick
          confirmHandler={() => deletePost(post.id)}
          text={t('profile.postDeleteWarn')}
        >
          <button>
            <HomeSvgSelector id="closed-admin" />
          </button>
        </ConfirmBeforeClick>
      </div>
    </div>
  );
};

export default TableRow;
