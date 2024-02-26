import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getImage } from '@/helpers/getImage';
import ConfirmBeforeClick from '@/components/ConfirmBeforeClick';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { cn } from '@/utils/utils';
import AddCategoryModal from '@/components/modals/AddCategoryModal';
import { useDeleteCategory } from '@/api/admin/categories/delete-category';
import { CATEGORIES_KEY } from '@/api/posts/get-categories';
import { ICategoryItem } from '@/types/posts';
import { ImageService } from '@/constants/enums';

import style from '../style.module.scss';

interface IProps {
  category: ICategoryItem;
  itemsStyles?: string[];
}

const TableCategoryRow: FC<IProps> = ({ category, itemsStyles }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory } = useDeleteCategory(() => {
    queryClient.invalidateQueries([CATEGORIES_KEY]);
    toast.success('Категория удалена');
  });

  const handleDelete = () => deleteCategory(category.id);

  return (
    <div className={style.TableItem}>
      <div className={cn(style.Item, itemsStyles?.[0])}>
        <img src={getImage(ImageService.POSTS, category.icon)} className="w-[24px] h-[24px]" />
      </div>
      <div className={cn(style.Item, itemsStyles?.[1])}>
        <p>{category.nameRu}</p>
      </div>
      <div className={cn(style.Item, itemsStyles?.[2])}>
        <p>{category.nameEn}</p>
      </div>
      <div className={cn(style.Item, itemsStyles?.[3])}>
        <p>{category.nameGe}</p>
      </div>
      <div className={cn(style.Item, itemsStyles?.[4])}>
        <AddCategoryModal category={category}>
          <button className="underline">Изменить</button>
        </AddCategoryModal>
      </div>
      <div className={cn(style.Item, itemsStyles?.[5])}>
        <ConfirmBeforeClick confirmHandler={handleDelete} text="Удалить категорию?">
          <button>
            <HomeSvgSelector id="closed-admin" />
          </button>
        </ConfirmBeforeClick>
      </div>
    </div>
  );
};

export default TableCategoryRow;
