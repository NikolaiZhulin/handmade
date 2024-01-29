import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/ui/Input';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import Select from '@/ui/Select';
import { PostSource } from '@/constants/enums';
import { GetAdminPostsVariables } from '@/api/admin/posts/get-posts';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';

import style from './style.module.scss';

interface IProps {
  setRules: Dispatch<SetStateAction<GetAdminPostsVariables>>;
}

const AdminTopBlock: FC<IProps> = ({ setRules }) => {
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect('leftIcon');

  const { control, watch } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const search = watch('search');

  useEffect(() => {
    const timer = setTimeout(() => {
      setRules((prev) => ({ ...prev, filter: { ...prev.filter, search } }));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className={style.AdminTopBlock}>
      <Typography variant="heading2" className={style.Heading2}>
        Объявления
      </Typography>
      <Input
        className="w-[335px] shrink-0"
        controllerProps={{ control, name: 'search' }}
        placeholder={t('admin.posts.search')}
        wrapperClassName="w-min"
      />
      <div className='flex gap-[14px] ml-auto'>
        <Select
          withIcon={false}
          options={[{ label: t('inputs.allCategories'), value: 'all' }, ...categories]}
          placeholder=""
          onChange={(value) =>
            setRules((prev) => ({ ...prev, filter: { ...prev.filter, category: value } }))
          }
          className="px-0 [&>p]:whitespace-nowrap [&>p]:overflow-hidden [&>p]:text-ellipsis [&>p]:w-[75%] ring-0 w-[150px]"
          contentClassName="w-[150px] max-h-[230px] overflow-y-scroll shadow-sortShadow"
          defaultValue={{ label: t('inputs.allCategories'), value: 'all' }}
        />
        <Select
          withIcon={false}
          options={[
            { label: t('admin.posts.sources'), value: 'all' },
            { label: 'Telegram', value: PostSource.TG },
            { label: 'Web', value: PostSource.WEB },
          ]}
          onChange={(value) =>
            setRules((prev) => ({ ...prev, filter: { ...prev.filter, source: value } }))
          }
          placeholder=""
          className="px-0 [&>p]:whitespace-nowrap [&>p]:overflow-hidden [&>p]:text-ellipsis [&>p]:w-[75%] ring-0 w-[150px]"
          contentClassName="w-[150px] max-h-[230px] overflow-y-scroll overflow-x-hidden shadow-sortShadow"
          defaultValue={{ label: t('admin.posts.sources'), value: 'all' }}
        />
      </div>
    </div>
  );
};

export default AdminTopBlock;
