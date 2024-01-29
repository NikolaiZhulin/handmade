import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { IGetWordsVariables } from '@/api/admin/key-words/get-words';
import AdminHeader from '@/components/AdminHeader';
import Table from '@/components/Table';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { useTranslation } from '@/hooks/useTranslation';
import AdminLeftBlock from '@/layout/AdminLeftBlock';
import Container from '@/layout/Container';
import Main from '@/layout/Main';
import MainWrapper from '@/layout/MainWrapper';
import RightBlock from '@/layout/RightBlock';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Typography from '@/ui/Typography';
import Pagination from '@/components/Pagination';
import { useGetFilterWords } from '@/api/admin/filter-words/get-words';
import { useDeleteFilterWord } from '@/api/admin/filter-words/delete-word';
import { useCreateFilterWord } from '@/api/admin/filter-words/create-word';
import TableFilterWordRow from '@/components/Table/components/TableFilterWordRow';

const FilterWordsPage = ({}) => {
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
    search: z.string(),
  });
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      search: '',
      newWords: '',
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

  const { data: words, refetch } = useGetFilterWords(rules);
  const { mutate: deleteWord } = useDeleteFilterWord(() => {
    toast.success(t('toasts.wordDeleted'));
    refetch();
  }, getErrorToast);
  const { mutate: createWords } = useCreateFilterWord(() => {
    toast.success(t('toasts.wordCreated'));
    refetch();
    reset();
  }, getErrorToast);

  const handleDeleteWord = (id: string) => () => {
    deleteWord(id);
  };

  const handleAddWords = () => {
    handleSubmit((values) => {
      createWords({ word: values.newWords });
    })();
  };

  return (
    <Container>
      <AdminHeader />
      <Main className="!pt-[62px]">
        <MainWrapper>
          <AdminLeftBlock />
          <RightBlock className="flex flex-col gap-[14px]">
            <div className="flex items-center gap-[14px] w-full">
              <Typography variant="heading2" className="w-[376px]">
                {t('admin.words.filter.title')}
              </Typography>
              <Input
                controllerProps={{ control, name: 'search' }}
                placeholder={t('inputs.searchWord')}
                className="w-full"
              />
            </div>
            <div className="flex gap-[14px]">
              <Input
                controllerProps={{ control, name: 'newWords' }}
                placeholder={t('inputs.addManyWords')}
                className="w-full"
              />
            </div>
            <Button onClick={handleAddWords} color="blue">
              {t('add')}
            </Button>
            <Table
              headerItems={[t('admin.words.filter.word')]}
              headerClassName="[&:nth-child(1)]:!w-[708px] [&:nth-child(2)]:!w-[42px]"
              rows={
                (words &&
                  words.data.map((word) => (
                    <TableFilterWordRow
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

export default FilterWordsPage;
