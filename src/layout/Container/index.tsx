import { FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Container: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <div className={mergeStyles(style.Container, '2xl:!w-full', className)}>{children}</div>;
};

export default Container;
