import { FC, PropsWithChildren, useContext } from 'react';
import Link from 'next/link';

import { MODAL_CONTEXT_VALUES, ModalContext } from '@/contexts/ModalContext';
import { cn } from '@/utils/utils';

import style from './style.module.scss';

interface IProps {}

const Logo: FC<PropsWithChildren<IProps>> = () => {
  const [modals, setModal] = useContext(ModalContext);

  return (
    <div className={cn(style.logo, 'xs:!mr-auto')}>
      <Link
        href="/"
        onClick={() => {
          if (Object.values(modals).some((el) => el)) {
            setModal(MODAL_CONTEXT_VALUES);
          }
        }}
        className="[&>svg]:hidden 2xl:[&>svg]:block"
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-[77px] h-[auto] 2xl:w-[46px] xs:w-[31px]"
        />
      </Link>
    </div>
  );
};
export default Logo;
