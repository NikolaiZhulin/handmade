import { FC, ReactNode, useEffect, useState } from 'react';

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select as ShadSelect,
} from '@/components/ui/select';
import { cn } from '@/utils/utils';
import { useTranslation } from '@/hooks/useTranslation';

import FloatLabel from '../FloatLabel';

interface IOption {
  value: string;
  label: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  valueIcon?: ReactNode;
}

interface IProps {
  options: IOption[];
  placeholder: string;
  valueWithIcon?: boolean;
  className?: string;
  showOnlyIcon?: boolean;
  value?: IOption;
  contentClassName?: string;
  defaultValue?: IOption;
  onChange?: (value: string) => void;
  withDividers?: boolean;
  withIcon?: boolean;
  withTranslate?: boolean;
}

const Select: FC<IProps> = ({
  options,
  placeholder,
  valueWithIcon,
  className,
  value,
  onChange,
  defaultValue,
  contentClassName,
  withDividers,
  showOnlyIcon = false,
  withIcon = true,
  withTranslate,
}) => {
  const [currentOption, setCurrentOption] = useState<IOption | undefined>(defaultValue);
  const [isFocussed, setIsFocussed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setCurrentOption(value);
    }
  }, [value]);

  useEffect(() => {
    if (isFocussed) {
      document.body.className = '!overflow-auto !mr-0';
    }
  }, [isFocussed]);

  const handleChange = (newValue: string) => {
    setCurrentOption(options.find((el) => el.value === newValue) ?? undefined);
    onChange?.(newValue);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setIsFocussed(true);
    } else {
      setIsFocussed(false);
    }
  };

  return (
    <ShadSelect
      value={currentOption?.value}
      onValueChange={handleChange}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className={cn('relative', className)}>
        <FloatLabel label={placeholder} isFloating={!!currentOption || isFocussed} />
        <p className="flex items-center gap-[4px] text-[14px] leading-[18px] font-montserrat font-semibold">
          {valueWithIcon && currentOption?.valueIcon}
          {!showOnlyIcon && t(currentOption?.label ?? '')}
        </p>
      </SelectTrigger>
      <SelectContent
        sideOffset={2}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={contentClassName}
      >
        {options.map((option, i) => (
          <SelectItem
            value={option.value}
            key={option.value}
            className={cn(
              withDividers &&
                i !== options.length &&
                'border-b-[1px] border-solid border-light-gray',
            )}
          >
            <div className={cn('flex gap-[8px] items-center w-full')}>
              {withIcon && option.leftIcon}
              {withTranslate ? t(option.label) : option.label}
            </div>
            {option.rightIcon}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadSelect>
  );
};

export default Select;
