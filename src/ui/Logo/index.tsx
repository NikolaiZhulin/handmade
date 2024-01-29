import { FC, PropsWithChildren, useContext } from 'react';
import Link from 'next/link';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
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
        <img src="/images/logo.png" alt="logo" className="w-[77px] h-[70px] 2xl:hidden"/>
        <HomeSvgSelector id="mini-logo" />
      </Link>
    </div>
  );
};
export default Logo;
