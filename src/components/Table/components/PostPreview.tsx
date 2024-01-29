import { FC, useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IAdminPost } from '@/types/admin/posts';
import Typography from '@/ui/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { capitalize } from '@/helpers/capitalize';
import Button from '@/ui/Button';
import Select from '@/ui/Select';
import NewKeyWordForm from '@/components/NewKeyWordForm';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
interface IProps {
  post: IAdminPost;
  update: (value: string, cb: () => void) => void;
}

const PostPreview: FC<IProps> = ({ post, update }) => {
  const [selectedValue, setSelectedValue] = useState(post.categories[0]);
  const categories = useGetCategoriesForSelect('leftIcon');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const textKey = `text${capitalize(language)}`;

  const handleCategoryChange = () => update(selectedValue, () => setIsPreviewOpen(false));

  return (
    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
      <DialogTrigger className="underline max-w-full whitespace-nowrap text-ellipsis overflow-hidden">
        {post.id}
      </DialogTrigger>
      <DialogContent className="w-[800px] flex p-0">
        <div className="p-[30px] w-[529px] shrink-0 flex flex-col gap-[20px]">
          <div className="flex gap-2 mb-2">
            <Typography variant="heading5" color="gray" className="underline">
              {post.id}
            </Typography>
            <Typography variant="heading5" color="gray">
              {new Date(post.createdAt).toLocaleDateString('ru-RU', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </Typography>
          </div>
          <Typography variant="heading4">{post[textKey as keyof typeof post]}</Typography>
          <Select
            options={categories}
            placeholder={t('inputs.category')}
            value={categories.find((el) => el.value === selectedValue)}
            onChange={setSelectedValue}
          />
          <Button
            fullWidth={true}
            disabled={selectedValue === post.categories[0]}
            onClick={handleCategoryChange}
          >
            <Typography variant="heading3">Ок</Typography>
          </Button>
        </div>
        <div className="w-full border-l-[1px] border-light-gray border-solid">
          <NewKeyWordForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostPreview;
