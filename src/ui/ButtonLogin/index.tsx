import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const ButtonLogin: FC<PropsWithChildren<IProps>> = ({ children, className, disabled, ...rest }) => {
  return (
    <button className={mergeStyles(style.ButtonLogin, className)} {...rest} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonLogin;
