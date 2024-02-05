import { PropsWithChildren } from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { cn } from '@/utils/utils';

import style from './style.module.scss';

interface IProps<T extends FieldValues> {
  controllerProps: UseControllerProps<T>;
  className?: string;
}

const Switch = <T extends FieldValues>({
  controllerProps,
  className,
}: PropsWithChildren<IProps<T>>) => {
  const { field } = useController(controllerProps);

  return (
    <input
      type="checkbox"
      className={cn(style.Switch, className)}
      {...field}
      checked={field.value}
    />
  );
};

export default Switch;
