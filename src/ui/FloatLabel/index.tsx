import { FC } from 'react';

import { cn } from '@/utils/utils';

interface IProps {
  label: string;
  isFloating: boolean;
  className?: string;
  floatClassName?: string;
  isError?: boolean;
  withIcon?: boolean;
}

const FloatLabel: FC<IProps> = ({
  label,
  isFloating,
  className,
  floatClassName,
  isError,
  withIcon,
}) => {
  return (
    <span
      className={cn(
        'absolute -top-[6px] left-[14px] px-[6px] translate-y-[90%] transition-all duration-150 ease-in -translate-x-[6px]',
        'text-[14px] leading-[18px] font-montserrat text-text-gray pointer-events-none font-normal',
        withIcon && !isFloating && 'left-[42px]',
        isFloating && '-translate-y-[54%] top-0 bg-white text-[12px] leading-[14px]',
        className,
        isFloating && floatClassName,
        isError && isFloating && 'text-red',
      )}
    >
      {label}
    </span>
  );
};

export default FloatLabel;
