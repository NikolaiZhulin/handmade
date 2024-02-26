import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { useCreateKeyWord } from '@/api/admin/key-words/create-word';
import { useDeleteWord } from '@/api/admin/key-words/delete-word';
import { IGetWordsVariables, useGetWords } from '@/api/admin/key-words/get-words';
import Table from '@/components/Table';
import TableWordRow from '@/components/Table/components/TableWordRow';
import { categories } from '@/constants/categories';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { useTranslation } from '@/hooks/useTranslation';
import AdminLeftBlock from '@/layout/AdminLeftBlock';
import Container from '@/layout/Container';
import Main from '@/layout/Main';
import MainWrapper from '@/layout/MainWrapper';
import RightBlock from '@/layout/RightBlock';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Select from '@/ui/Select';
import Typography from '@/ui/Typography';
import Pagination from '@/components/Pagination';

const KeyWordsPage = ({}) => {
  const [rules, setRules] = useState<IGetWordsVariables>({
    filter: {
      category: 'all',
    },
    page: {
      page: 1,
      limit: 24,
    },
  });
  const { t } = useTranslation();
  const schema = z.object({
    newWords: z.string({ required_error: t('errors.required') }).nonempty(t('errors.required')),
    category: z.string({ required_error: t('errors.required') }).nonempty(t('errors.required')),
    search: z.string(),
  });
  const { control, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      search: '',
      newWords: '',
      category: '',
    },
    resolver: zodResolver(schema),
    mode: 'onSubmit',
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

  const { data: words, refetch } = useGetWords(rules);
  const { mutate: deleteWord } = useDeleteWord(() => {
    toast.success(t('toasts.wordDeleted'));
    refetch();
  }, getErrorToast);
  const { mutate: createWords } = useCreateKeyWord(() => {
    toast.success(t('toasts.wordCreated'));
    refetch();
    reset();
  }, getErrorToast);

  const handleDeleteWord = (id: string) => () => {
    deleteWord(id);
  };

  const handleAddWords = () => {
    handleSubmit((values) => {
      createWords({ word: values.newWords, category: values.category });
    })();
  };

  return (
    <Container>
      <Main className="!pt-[62px]">
        <MainWrapper>
          <AdminLeftBlock />
          <RightBlock className="flex flex-col gap-[14px]">
            <div className="flex items-center gap-[14px]">
              <Typography variant="heading2" className="w-[376px]">
                {t('admin.words.title')}
              </Typography>
              <Select
                withIcon={false}
                options={[{ label: t('inputs.allCategories'), value: 'all' }, ...categories]}
                placeholder=""
                onChange={(value) =>
                  setRules((prev) => ({ ...prev, filter: { ...prev.filter, category: value } }))
                }
                className="px-0 [&>p]:whitespace-nowrap [&>p]:overflow-hidden [&>p]:text-ellipsis [&>p]:w-[75%] ring-0 w-[111px]"
                contentClassName="w-[150px] max-h-[230px] overflow-y-scroll shadow-sortShadow"
                defaultValue={{ label: t('inputs.allCategories'), value: 'all' }}
              />
              <Input
                controllerProps={{ control, name: 'search' }}
                placeholder={t('inputs.searchWord')}
                className="w-[335px]"
              />
            </div>
            <div className="flex gap-[14px]">
              <Input
                controllerProps={{ control, name: 'newWords' }}
                placeholder={t('inputs.addManyWords')}
                className="w-full"
              />
              <Select
                withIcon={false}
                options={[...categories]}
                placeholder={t('inputs.category')}
                onChange={(value) => setValue('category', value)}
                className="[&>p]:whitespace-nowrap [&>p]:overflow-hidden [&>p]:text-ellipsis [&>p]:w-[75%] min-w-[210px] max-w-[210px]"
                contentClassName="max-h-[230px] overflow-y-scroll shadow-sortShadow"
              />
            </div>
            <Button onClick={handleAddWords} color="blue">
              {t('add')}
            </Button>
            <Table
              headerItems={[t('admin.words.word'), t('admin.words.category'), '']}
              headerClassName="[&:nth-child(1)]:!w-[404px] [&:nth-child(2)]:!w-[404px] [&:nth-child(3)]:!w-[42px]"
              rows={
                (words &&
                  words.data.map((word) => (
                    <TableWordRow
                      word={word}
                      key={word.id}
                      deleteWord={handleDeleteWord(word.id)}
                    />
                  ))) ??
                []
              }
            />
            <Pagination meta={words?.meta} setRules={setRules} />
          </RightBlock>
        </MainWrapper>
      </Main>
    </Container>
  );
};

export default KeyWordsPage;
