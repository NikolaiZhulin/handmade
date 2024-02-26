import { useState } from 'react';

import Main from '@/layout/Main';
import AdminLeftBlock from '@/layout/AdminLeftBlock';
import Container from '@/layout/Container';
import RightBlock from '@/layout/RightBlock';
import MainWrapper from '@/layout/MainWrapper';
import Statistics from '@/components/Statistics';
import Table from '@/components/Table';
import { useGetStatistic } from '@/api/admin/posts/get-statistic';
import { useTranslation } from '@/hooks/useTranslation';
import Pagination from '@/components/Pagination';
import { GetAdminPostsVariables, useGetAdminPosts } from '@/api/admin/posts/get-posts';
import TableRow from '@/components/Table/components/TablePostRow';

const PostsPage = () => {
  const { t } = useTranslation();
  const { data: statistic } = useGetStatistic();
  const [rules, setRules] = useState<GetAdminPostsVariables>({
    filter: {
      category: 'all',
      source: 'all',
      search: '',
    },
    page: {
      page: 1,
      limit: 9,
    },
  });
  const { data, refetch } = useGetAdminPosts(rules);

  return (
    <Container>
      <Main className="!pt-[62px]">
        <MainWrapper>
          <AdminLeftBlock />
          <div className="flex flex-col gap-[20px] w-full">
            <div className="w-full flex gap-[20px]">
              {statistic && (
                <>
                  <Statistics
                    text={t('admin.posts.totalCount')}
                    tg={statistic.sourceTg}
                    total={statistic.sourceTotal}
                    web={statistic.sourceWeb}
                  />
                  <Statistics
                    text={t('admin.posts.day')}
                    tg={statistic.todayTg}
                    total={statistic.todayTotal}
                    web={statistic.todayWeb}
                  />
                  <Statistics
                    text={t('admin.posts.week')}
                    tg={statistic.weekTg}
                    total={statistic.weekTotal}
                    web={statistic.weekWeb}
                  />
                  <Statistics
                    text={t('admin.posts.month')}
                    tg={statistic.monthTg}
                    total={statistic.monthTotal}
                    web={statistic.monthWeb}
                  />
                </>
              )}
            </div>
            <RightBlock>
              <Table
                headerItems={[
                  'ID',
                  t('admin.posts.dateTime'),
                  t('admin.posts.description'),
                  t('admin.posts.category'),
                  t('admin.posts.source'),
                  t('admin.posts.author'),
                  '-',
                ]}
                rows={
                  (data &&
                    data.data.map((post) => (
                      <TableRow post={post} key={post.id} refetch={refetch} />
                    ))) ??
                  []
                }
              />
              <Pagination meta={data?.meta} setRules={setRules} />
            </RightBlock>
          </div>
        </MainWrapper>
      </Main>
    </Container>
  );
};

export default PostsPage;
