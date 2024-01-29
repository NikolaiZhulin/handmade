import { ChangeEvent, FocusEvent, HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import MaskedInput, { conformToMask } from 'react-text-mask';

import { mergeStyles } from '@/helpers/mergeStyles';
import { cn } from '@/utils/utils';

import FloatLabel from '../FloatLabel';
import Typography from '../Typography';

import style from './style.module.scss';

const MASKS = {
  phone: [
    '+',
    '9',
    '9',
    '5',
    ' ',
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
};

interface IProps<T extends FieldValues> extends HTMLAttributes<HTMLInputElement> {
  controllerProps: UseControllerProps<T>;
  className?: string;
  rightElem?: ReactNode | ((handler: () => void, localType?: string) => JSX.Element);
  leftElem?: ReactNode;
  type?: string;
  disabled?: boolean;
  mask?: keyof typeof MASKS;
  maxLength?: number;
  autoComplete?: string;
  wrapperClassName?: string;
}

const Input = <T extends FieldValues>({
  className,
  controllerProps,
  rightElem,
  leftElem,
  placeholder,
  disabled,
  type,
  mask,
  maxLength,
  wrapperClassName,
  ...rest
}: IProps<T>) => {
  const {
    field: { onChange, ...fields },
    fieldState: { error },
  } = useController(controllerProps);
  const [localType, setLocalType] = useState(type);
  const [localDisabled, setLocalDisabled] = useState(disabled);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalDisabled(disabled);
  }, [disabled]);

  const handleLocalTypeChange = () => {
    if (localType === 'password') {
      setLocalType('text');
    } else {
      setLocalType('password');
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (mask && !e.target.value) {
      e.target.value = conformToMask(' ', MASKS[mask], { currentCaretPosition: 1 }).conformedValue;
      onChange(e);
    }
  };

  const handleBlur = () => setIsFocused(false);

  const localOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength) {
      onChange(e.target.value.slice(0, maxLength));
    } else {
      onChange(e);
    }
  };

  return (
    <div className={cn('flex flex-col gap-[4px] w-full', wrapperClassName)}>
      <div
        className={mergeStyles(
          style.Input,
          isFocused && style.focus,
          className,
          error && style.errorState,
          disabled && 'bg-dark-gray',
        )}
      >
        {leftElem}
        <FloatLabel
          label={placeholder ?? ''}
          isFloating={!!fields.value || fields.value === 0}
          isError={!!error}
          withIcon={!!leftElem}
        />
        {mask ? (
          <MaskedInput
            mask={MASKS[mask]}
            type={localType}
            {...fields}
            {...rest}
            min={0}
            onFocus={handleFocus}
            disabled={localDisabled}
            onBlur={handleBlur}
            onChange={localOnChange}
            className="disabled:!text-text-gray"
          />
        ) : (
          <input
            type={localType}
            {...fields}
            {...rest}
            value={fields.value ?? ''}
            min={0}
            disabled={localDisabled}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={localOnChange}
            className="disabled:!text-text-gray"
          />
        )}
        {typeof rightElem === 'function' ? rightElem(handleLocalTypeChange, localType) : rightElem}
      </div>
      {error && (
        <span className={style.error}>
          <Typography variant="text3" color="red">
            {error.message}
          </Typography>
        </span>
      )}
    </div>
  );
};

export default Input;
