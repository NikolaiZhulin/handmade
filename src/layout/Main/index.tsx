import { FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Main: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <main className={mergeStyles(style.Main, className)}>{children}</main>;
};

export default Main;
