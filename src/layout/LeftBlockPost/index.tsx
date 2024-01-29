import { FC, PropsWithChildren } from 'react';

import { cn } from '@/utils/utils';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const LeftBlockPost: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <div className={cn(style.LeftBlockPost, className)}>{children}</div>;
};

export default LeftBlockPost;
