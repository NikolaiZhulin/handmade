import { FC, useEffect, useState } from 'react';

import Button from '@/ui/Button';
import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  onClick?: (isActive: boolean) => () => void;
  leftText: string;
  rightText: string;
  variant?: 'green' | 'gray';
  className?: string;
  defaultValue?: boolean;
  small?: boolean;
}

const SliderButton: FC<IProps> = ({
  onClick,
  leftText,
  rightText,
  className,
  variant = 'green',
  defaultValue = false,
}) => {
  const [isActive, setIsActive] = useState(defaultValue);

  useEffect(() => {
    setIsActive(defaultValue);
  }, [defaultValue]);

  const handleClickLeft = () => {
    setIsActive(false);
    onClick?.(false)();
  };

  const handleClickRight = () => {
    setIsActive(true);
    onClick?.(true)();
  };

  return (
    <div
      className={mergeStyles(
        style.AuthorizationFormButton,
        isActive && style.login,
        variant === 'gray' ? style.afterGray : style.afterGreen,
        'w-[100%]',
        className,
      )}
    >
      <Button
        className={mergeStyles(
          style.Button,
          isActive ? style.notActive : style.active,
          variant === 'gray' && style.gray,
          '!h-[28px]',
        )}
        onClick={handleClickLeft}
        color={variant === 'gray' ? 'neutral' : 'green'}
      >
        {leftText}
      </Button>
      <Button
        className={mergeStyles(
          style.Button,
          isActive ? style.active : style.notActive,
          variant === 'gray' && style.gray,
          '!h-[28px]',
        )}
        onClick={handleClickRight}
      >
        {rightText}
      </Button>
    </div>
  );
};

export default SliderButton;
