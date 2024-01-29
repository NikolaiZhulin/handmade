import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IGetUsersVariables, useGetUsers } from '@/api/admin/users/get-users';
import AdminHeader from '@/components/AdminHeader';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import UsersStatistic from '@/components/UsersStatistic';
import { useTranslation } from '@/hooks/useTranslation';
import AdminLeftBlock from '@/layout/AdminLeftBlock';
import Container from '@/layout/Container';
import Main from '@/layout/Main';
import MainWrapper from '@/layout/MainWrapper';
import RightBlock from '@/layout/RightBlock';
import Input from '@/ui/Input';
import Select from '@/ui/Select';
import Typography from '@/ui/Typography';
import TableUserRow from '@/components/Table/components/TableUserRow';

import { sortOptions } from './config';

const UsersPage = () => {
  const { t } = useTranslation();
  const [rules, setRules] = useState<IGetUsersVariables>({
    filter: {
      search: '',
    },
    page: {
      page: 1,
      limit: 10,
    },
    sort: {
      sortBy: 'createdAt',
      sortAt: 'ASC',
    },
  });
  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const { data: users } = useGetUsers(rules);

  return (
    <Container>
      <AdminHeader />
      <Main className="!pt-[62px]">
        <MainWrapper>
          <AdminLeftBlock />
          <div className="flex flex-col gap-5">
            <UsersStatistic />
            <RightBlock className="flex flex-col gap-[14px]">
              <div className="flex items-center gap-[14px]">
                <Typography variant="heading2" className="w-[370px]">
                  {t('admin.users.title')}
                </Typography>
                <Input
                  controllerProps={{ control, name: 'search' }}
                  placeholder={t('inputs.usersSearch')}
                  className="w-[335px]"
                />
                <Select
                  withTranslate={true}
                  withIcon={false}
                  options={sortOptions}
                  defaultValue={sortOptions.find((el) => el.value === rules.sort?.sortAt)}
                  placeholder=""
                  onChange={(value) =>
                    setRules((prev) => ({
                      ...prev,
                      sort: { ...prev.sort, sortAt: value as 'ASC' | 'DESC' },
                    }))
                  }
                  className="px-0 [&>p]:whitespace-nowrap [&>p]:overflow-hidden [&>p]:text-ellipsis [&>p]:w-[75%] ring-0 w-[117px]"
                  contentClassName="w-min max-h-[230px] overflow-y-scroll shadow-sortShadow"
                />
              </div>
              <Table
                headerItems={['ID', 'Регистрация', 'Телефон', 'Email', 'Город', 'Активность']}
                rows={users?.data.map((user) => <TableUserRow user={user} key={user.id} />) ?? []}
              />
              <Pagination meta={users?.meta} setRules={setRules} />
            </RightBlock>
          </div>
        </MainWrapper>
      </Main>
    </Container>
  );
};

export default UsersPage;
