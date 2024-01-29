import { FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const LeftBlock: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <div className={mergeStyles(style.LeftBlock, className)}>{children}</div>;
};

export default LeftBlock;
