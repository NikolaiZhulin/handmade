import { FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Heading3: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <h3 className={mergeStyles(style.Heading3, className)}>{children}</h3>;
};

export default Heading3;
