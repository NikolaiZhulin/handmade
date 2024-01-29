import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';

import style from './style.module.scss';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
}

const ButtonDelete: FC<PropsWithChildren<IProps>> = ({ className, ...rest }) => {
  return (
    <button className={mergeStyles(style.ButtonDelete, className)} {...rest}>
      <HomeSvgSelector id="delete"></HomeSvgSelector>
    </button>
  );
};

export default ButtonDelete;
