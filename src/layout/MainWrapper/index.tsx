import { FC, PropsWithChildren } from 'react';

import { cn } from '@/utils/utils';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const MainWrapper: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <div className={cn(style.MainWrapper, className)}>{children}</div>;
};

export default MainWrapper;
