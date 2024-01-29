import { FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Heading1: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <h1 className={mergeStyles(style.Heading1, className)}>{children}</h1>;
};

export default Heading1;
