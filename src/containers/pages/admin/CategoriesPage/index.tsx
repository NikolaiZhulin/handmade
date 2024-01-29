import { FC } from 'react';

import { useGetCategories } from '@/api/posts/get-categories';
import AdminHeader from '@/components/AdminHeader';
import Table from '@/components/Table';
import TableCategoryRow from '@/components/Table/components/TableCategoryRow';
import AdminLeftBlock from '@/layout/AdminLeftBlock';
import Container from '@/layout/Container';
import Main from '@/layout/Main';
import MainWrapper from '@/layout/MainWrapper';
import RightBlock from '@/layout/RightBlock';
import Button from '@/ui/Button';
import Typography from '@/ui/Typography';
import AddCategoryModal from '@/components/modals/AddCategoryModal';

interface IProps {}

const CategoriesPage: FC<IProps> = ({}) => {
  const { data: categories } = useGetCategories();

  return (
    <Container>
      <AdminHeader />
      <Main className="!pt-[62px]">
        <MainWrapper>
          <AdminLeftBlock />
          <RightBlock className="flex flex-col gap-[14px]">
            <div className="flex items-center gap-[14px]">
              <Typography variant="heading2" className="w-[376px]">
                Категории
              </Typography>
            </div>
            <AddCategoryModal>
              <Button color="blue">Добавить новую категорию</Button>
            </AddCategoryModal>
            <Table
              headerItems={['', 'Категория', 'EN', 'GE', '', '']}
              headerClassName="[&:nth-child(1)]:!w-[48px] [&:nth-child(2)]:!w-[223px] [&:nth-child(3)]:!w-[223px] [&:nth-child(4)]:!w-[223px] [&:nth-child(5)]:!w-[88px] [&:nth-child(5)]:!w-[48px]"
              rows={
                categories?.categories.map((el) => (
                  <TableCategoryRow
                    itemsStyles={[
                      '!w-[48px]',
                      '!w-[223px]',
                      '!w-[223px]',
                      '!w-[223px]',
                      '!w-[88px]',
                      '!w-[48px]',
                    ]}
                    key={el.id}
                    category={el}
                  />
                )) ?? []
              }
            />
          </RightBlock>
        </MainWrapper>
      </Main>
    </Container>
  );
};

export default CategoriesPage;
