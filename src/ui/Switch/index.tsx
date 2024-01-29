import { PropsWithChildren } from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import style from './style.module.scss';

interface IProps<T extends FieldValues> {
  controllerProps: UseControllerProps<T>;
}

const Switch = <T extends FieldValues>({ controllerProps }: PropsWithChildren<IProps<T>>) => {
  const { field } = useController(controllerProps);

  return <input type="checkbox" className={style.Switch} {...field} checked={field.value} />;
};

export default Switch;
