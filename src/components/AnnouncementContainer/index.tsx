import { FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  className?: string;
  isGrid?: boolean;
}

const AnnouncementContainer: FC<PropsWithChildren<IProps>> = ({ children, className, isGrid }) => {
  return (
    <div className={mergeStyles(style.AnnouncementContainer, className, style.Grid)}>
      {children}
    </div>
  );
};

export default AnnouncementContainer;
