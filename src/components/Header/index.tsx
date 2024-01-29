import { FC, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from '@/layout/Container';
import Logo from '@/ui/Logo';
import Search from '@/ui/Search';
import Button from '@/ui/Button';
import ButtonLogin from '@/ui/ButtonLogin';
import Lang from '@/ui/Lang';
import Modal from '@/containers/Modal';
import { UserContext } from '@/contexts/UserContext';
import AuthWrapper from '@/containers/AuthWrapper';
import { useGetMe } from '@/api/auth/get-me';
import Typography from '@/ui/Typography';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useTranslation } from '@/hooks/useTranslation';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import Select from '@/ui/CustomSelect';
import { cn } from '@/utils/utils';
import { MODAL_CONTEXT_VALUES, ModalContext } from '@/contexts/ModalContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Categories from '@/components/Header/components/Categories';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';
import Counter from '../Counter';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';

import HeaderAccount from './components/HeaderAccount';
import style from './style.module.scss';
import MenuDrawer from './components/MenuDrawer';

interface IProps {
  isHideSearch?: boolean;
  isHideCounter?: boolean;
  className?: string;
}

const Header: FC<IProps> = ({ isHideSearch, isHideCounter, className }) => {
  const [state, setState] = useContext(UserContext);
  const [modals, setModal] = useContext(ModalContext);
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect();
  const isLaptop = useMediaQuery('(max-width: 1200px)');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { push, query } = useRouter();

  const { data: me, refetch } = useGetMe();
  const handleOpenLoginModal = () => {
    if (Object.values(modals).some((el) => el)) {
      setModal(MODAL_CONTEXT_VALUES);
    }
    setModal({ authModal: true });
  };
  const handleCloseModal = () => {
    setModal({ authModal: false });
  };

  useEffect(() => {
    if (state.accessToken) {
      refetch();
    }
  }, [state.accessToken]);

  useEffect(() => {
    if (me) {
      setState({ ...state, ...me });
    }
  }, [me]);

  return (
    <header
      className={cn(
        style.Header,
        className,
        '2xl:!py-[10px] 2xl:!px-[30px] xs:!pb-[10px] xs:!px-[15px] xs:!pt-[8px] xs:gap-[18px]',
      )}
    >
      <Modal
        isVisible={modals.authModal}
        onClose={handleCloseModal}
        backdropClassName="xs:!h-[calc(var(--app-height))] xs:!top-0 2xl:!overflow-auto xs:!z-[48]"
        innerWrapperClassName="!w-[420px] xs:!w-full xs:!h-[calc(var(--app-height))] xs:overflow-auto"
      >
        <AuthWrapper onClose={handleCloseModal} isOpen={modals.authModal} />
      </Modal>
      <Container className="xs:!w-full">
        <div style={{ height: '0px', overflow: 'hidden', background: 'transparent' }}>
          <input type="password"></input>
        </div>
        <div className={cn(style.HeaderWrapper, 'xs:!justify-between xs:gap-[15px]')}>
          {/*<MenuDrawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)} />*/}
          <div className="flex items-center gap-[20px] xs:gap-[15px]">
            {/*<button*/}
            {/*  className={cn(*/}
            {/*    'hidden 2xl:block',*/}
            {/*    isDrawerOpen ? '[&>svg]:rotate-180' : '[&>svg]:rotate-0',*/}
            {/*  )}*/}
            {/*  onClick={() => setIsDrawerOpen(true)}*/}
            {/*>*/}
            {/*  <HomeSvgSelector id={'chevron-down'} />*/}
            {/*</button>*/}
            <Logo />
            <Categories />
          </div>
          {!isMobile && <Search />}
          {!isLaptop &&
            (state.accessToken && me ? (
              <HeaderAccount id={me.id} />
            ) : (
              <ButtonLogin onClick={handleOpenLoginModal}>
                <HomeSvgSelector id="user-icon" />
              </ButtonLogin>
            ))}
          <Link
            href="/create"
            onClick={(e) => {
              if (!me && !state.accessToken) {
                e.stopPropagation();
                e.preventDefault();
                setModal({ authModal: true });
                push({ query: { ...query, action: 'create' } }, undefined, { shallow: true });
              }
              if (Object.values(modals).some((el) => el)) {
                setModal(MODAL_CONTEXT_VALUES);
              }
            }}
          >
            <Button className="2xl:!px-[10px] text-[14px] xs:!h-[35px] xs:w-[100%]">
              <HomeSvgSelector id={'plus'} />
              {t('header.createPost')}
            </Button>
          </Link>
          <Lang />
        </div>
      </Container>
      {/*<Counter isHideCounter={isHideCounter} />*/}
      {isMobile && !isHideSearch && <Search />}
    </header>
  );
};

export default Header;
