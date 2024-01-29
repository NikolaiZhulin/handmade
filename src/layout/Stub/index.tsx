import { FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Stub: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <div className={mergeStyles(style.Stub, className)}>{children}</div>;
};

export default Stub;
