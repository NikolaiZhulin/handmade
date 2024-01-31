import { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  color?: keyof typeof COLORS_MAP;
  leftIcon?: ReactNode;
}

const COLORS_MAP = {
  green: style.green,
  blue: style.blue,
  neutral: style.neutral,
  deleteProfile: style.deleteProfile,
  ghost: style.ghost,
  yellow: style.yellow,
  red: style.red,
  white: style.white,
  gold: style.gold,
};

const Button: FC<PropsWithChildren<IProps>> = ({
  children,
  className,
  fullWidth,
  color,
  leftIcon,
  ...rest
}) => {
  return (
    <button
      className={mergeStyles(
        style.Button,
        style.green,
        color && COLORS_MAP[color],
        fullWidth && style.fullWidth,
        className,
      )}
      {...rest}
    >
      {leftIcon}
      {children}
    </button>
  );
};

export default Button;
