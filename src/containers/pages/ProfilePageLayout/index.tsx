import { FC, ReactNode } from 'react';

import Container from '@/layout/Container';
import LeftBlock from '@/layout/LeftBlock';
import Main from '@/layout/Main';
import MainWrapper from '@/layout/MainWrapper';
import RightBlock from '@/layout/RightBlock';
import Breadcrumbs from '@/components/Breadcrumbs';

interface IProps {
  left: ReactNode;
  right: ReactNode;
}

const ProfilePageLayout: FC<IProps> = ({ left, right }) => {
  return (
    <Main>
      <Container>
        <Breadcrumbs className="xs:pt-0" />
        <MainWrapper className="2xl:!mt-0">
          <LeftBlock className="2xl:hidden">{left}</LeftBlock>
          <RightBlock className="2xl:!w-full 2xl:!pt-0 2xl:!pb-[14px] 2xl:!min-h-[calc(100vh-228px)] 2xl:!h-auto xs:!px-[20px]">
            {right}
          </RightBlock>
        </MainWrapper>
      </Container>
    </Main>
  );
};

export default ProfilePageLayout;
