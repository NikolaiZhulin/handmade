import { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  withBorder?: boolean;
  rightItem?: ReactNode;
  isActive?: boolean;
}

const Category: FC<PropsWithChildren<IProps>> = ({
  children,
  withBorder,
  rightItem,
  isActive,
  className,
  ...rest
}) => {
  return (
    <button
      className={mergeStyles(
        style.Category,
        withBorder && style.withBorder,
        withBorder === false && style.noBorder,
        isActive && style.active,
        className,
      )}
      {...rest}
    >
      {children}
      <div className={style.rightItem}>{rightItem}</div>
    </button>
  );
};
export default Category;
