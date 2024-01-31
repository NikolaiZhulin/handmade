import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { mergeStyles } from '@/helpers/mergeStyles';

import FloatLabel from '../FloatLabel';
import Typography from '../Typography';

import style from './style.module.scss';

interface IProps<T extends FieldValues> extends HTMLAttributes<HTMLTextAreaElement> {
  controllerProps: UseControllerProps<T>;
  disabled?: boolean;
}

const Textarea = <T extends FieldValues>({
  controllerProps,
  placeholder,
  disabled,
  ...rest
}: PropsWithChildren<IProps<T>>) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 11 + 'px';
    }
  }, [field.value]);

  return (
    <div className={mergeStyles(style.TextareaWrapper, error && style.errorState)}>
      <textarea
        className={mergeStyles(
          style.Textarea,
          !field.value && style.empty,
          error && style.errorState,
        )}
        {...field}
        {...rest}
        ref={ref}
        disabled={disabled}
      />
      {error && (
        <span className={style.error}>
          <Typography variant="heading3" color="red">
            {error.message}
          </Typography>
        </span>
      )}
      <FloatLabel
        label={placeholder ?? ''}
        isFloating={!!field.value || field.value === 0}
        isError={!!error}
      />
    </div>
  );
};
export default Textarea;
