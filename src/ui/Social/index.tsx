import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import style from './style.module.scss';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Social: FC<PropsWithChildren<IProps>> = ({ children, className, ...rest }) => {
  return (
    <button className={`${style.Social} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Social;
