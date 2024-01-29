import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FC, PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { useCreateCategory } from '@/api/admin/categories/create-category';
import { useUpdateCategory } from '@/api/admin/categories/update-category';
import { CATEGORIES_KEY } from '@/api/posts/get-categories';
import ImageLoader from '@/components/Profile/ProfileRightBlock/components/ImageLoader';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getImage } from '@/helpers/getImage';
import { ICategoryItem } from '@/types/posts';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Typography from '@/ui/Typography';

interface IProps {
  category?: ICategoryItem;
}

const schema = z.object({
  nameRu: z.string({ required_error: 'Укажите название' }).nonempty(),
  nameEn: z.string({ required_error: 'Укажите название' }).nonempty(),
  nameGe: z.string({ required_error: 'Укажите название' }).nonempty(),
  slug: z.string({ required_error: 'Укажите slug слово' }).nonempty(),
});

const AddCategoryModal: FC<PropsWithChildren<IProps>> = ({ children, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      nameRu: category?.nameRu ?? '',
      nameEn: category?.nameEn ?? '',
      nameGe: category?.nameGe ?? '',
      slug: category?.slug ?? '',
    },
    resolver: zodResolver(schema),
    mode: 'all',
  });
  const { mutate: createCategory } = useCreateCategory(() => {
    reset();
    setFile(undefined);
    setIsOpen(false);
    toast.success('Категория добавленна');
    queryClient.invalidateQueries([CATEGORIES_KEY]);
  });
  const { mutate: updateCategory } = useUpdateCategory(() => {
    reset();
    setFile(undefined);
    setIsOpen(false);
    toast.success('Категория обновленна');
    queryClient.invalidateQueries([CATEGORIES_KEY]);
  });

  const handleClick = () => {
    handleSubmit((values) => {
      const formData = new FormData();

      formData.append('nameRu', values.nameRu);
      formData.append('nameEn', values.nameEn);
      formData.append('nameGe', values.nameGe);
      formData.append('slug', values.slug);

      if (!file) {
        toast.error('Загрузите картинку');
        return;
      }

      formData.append('images', file);

      category
        ? updateCategory({
            id: category.id,
            data: formData,
          })
        : createCategory(formData);
    })();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[420px] gap-[14px]">
        <Typography variant="heading2">Добавление категории</Typography>
        <div className="flex flex-col gap-[16px]">
          <Input controllerProps={{ control, name: 'nameRu' }} placeholder="Название (RU)" />
          <Input controllerProps={{ control, name: 'nameEn' }} placeholder="EN" />
          <Input controllerProps={{ control, name: 'nameGe' }} placeholder="GE" />
          <Input controllerProps={{ control, name: 'slug' }} placeholder="Slug" />
          <div className="flex gap-[14px] items-center">
            {(category || file) && (
              <img
                src={file ? URL.createObjectURL(file as File) : getImage(category?.icon ?? '')}
                className="w-[24px] h-[24px]"
              />
            )}
            <ImageLoader
              label="asd"
              onChange={(file) => {
                setFile(file);
              }}
            />
          </div>
        </div>
        <Button onClick={handleClick} fullWidth={true}>
          {!category ? 'Добавить' : 'Сохранить'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
