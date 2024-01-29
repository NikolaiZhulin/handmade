import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateKeyWord } from '@/api/admin/key-words/create-word';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Select from '@/ui/Select';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';

interface IProps {
  defaultValue?: string;
}

const NewKeyWordForm: FC<IProps> = ({ defaultValue }) => {
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect();
  const { control, setValue, handleSubmit, reset } = useForm({
    defaultValues: {
      word: '',
      category: defaultValue ?? '',
    },
  });
  const { mutate: createWord } = useCreateKeyWord(() => {
    toast.success(t('toasts.wordCreated'));
    reset();
  }, getErrorToast);

  const handleSelect = (value: string) => setValue('category', value);

  const handleSubmitClick = () => {
    handleSubmit((values) => {
      createWord(values);
    })();
  };

  return (
    <div className="p-[30px] w-[270px] flex flex-col gap-[14px] bg-white rounded-[6px]">
      <Input
        controllerProps={{ control, name: 'word' }}
        placeholder={t('admin.posts.newKeyWord')}
      />
      <Select
        options={categories}
        placeholder={t('inputs.category')}
        defaultValue={categories.find((el) => el.value === defaultValue)}
        withIcon={false}
        onChange={handleSelect}
      />
      <Button fullWidth={true} onClick={handleSubmitClick}>
        {t('add')}
      </Button>
    </div>
  );
};

export default NewKeyWordForm;
