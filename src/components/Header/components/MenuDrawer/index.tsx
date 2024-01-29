import { FC, useContext } from 'react';

import { UserContext } from '@/contexts/UserContext';
import Drawer from '@/ui/Drawer';
import { cn } from '@/utils/utils';

import NotLogged from './components/NotLogged';
import Logged from './components/Logged';

interface IProps {
  isOpen: boolean;
  close: () => void;
}

const MenuDrawer: FC<IProps> = ({ isOpen, close }) => {
  const [state] = useContext(UserContext);

  return (
    <Drawer
      isOpen={isOpen}
      close={close}
      overlayClassName="bg-transparent"
      bodyActiveClassName="bg-main-brand"
    >
      <div className={cn('py-[28px] px-[24px] h-full xs:p-[20px]')}>
        {state.accessToken ? <Logged /> : <NotLogged />}
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
