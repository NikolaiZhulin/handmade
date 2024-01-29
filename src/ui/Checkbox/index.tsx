import { ChangeEvent, HTMLAttributes, PropsWithChildren } from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { cn } from '@/utils/utils';

import style from './style.module.scss';

interface IProps<T extends FieldValues> extends HTMLAttributes<HTMLInputElement> {
  controllerProps: UseControllerProps<T>;
  value?: string | number | boolean;
  checked?: boolean;
  onChangeCustom?: (
    fieldName: string,
    value: IProps<T>['value'],
    e?: ChangeEvent<HTMLInputElement>,
  ) => void;
  labelClassName?: string;
}

const Checkbox = <T extends FieldValues>({
  children,
  controllerProps,
  id,
  onChangeCustom,
  value,
  checked,
  className,
  labelClassName,
  ...rest
}: PropsWithChildren<IProps<T>>) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  const localOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeCustom) {
      onChangeCustom(field.name, value ?? e.target.checked, e);
    } else {
      field.onChange(e);
    }
  };

  return (
    <div className={cn(style.Checkbox, className)}>
      <input
        id={id ?? 'cbx'}
        className={style.Input}
        {...field}
        type="checkbox"
        {...rest}
        onChange={localOnChange}
        checked={checked}
      />
      <label className={cn(style.Label, labelClassName)} htmlFor={id ?? 'cbx'}>
        <div className={style.Wrapper}>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </div>
        <span
          className={cn(
            style['Title'],
            checked && '!font-[600]',
            'group-hover:!text-white transition-all duration-300 ease-out',
          )}
        >
          {children}
        </span>
      </label>
      {error && <span className={style.error}>{error.message}</span>}
    </div>
  );
};

export default Checkbox;
