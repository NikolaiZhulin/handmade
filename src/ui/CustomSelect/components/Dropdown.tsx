import { Dispatch, ReactNode, SetStateAction, forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '@/utils/utils';
import { useTranslation } from '@/hooks/useTranslation';
import Checkbox from '@/ui/Checkbox';

import { IOption } from '..';

interface IProps {
  dropdownClassname?: string;
  isOpen: boolean;
  setIsHovered: Dispatch<SetStateAction<boolean>>;
  dropdownInnerContainerClassname?: string;
  options: IOption[] | ((props: { isHovered: boolean; close: () => void }) => ReactNode);
  isHovered: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentOption?: IOption;
  withIcon?: boolean;
  optionClassname?: string;
  asDropdown?: boolean;
  onSelect?: (value: string) => void;
  withTranslate?: boolean;
  setCurrentOption: Dispatch<SetStateAction<IOption | undefined>>;
  withCheckBox?: boolean;
}

const Dropdown = forwardRef<HTMLDivElement, IProps>(
  (
    {
      dropdownClassname,
      isOpen,
      setIsHovered,
      dropdownInnerContainerClassname,
      options,
      isHovered,
      setIsOpen,
      currentOption,
      withIcon,
      optionClassname,
      asDropdown,
      withTranslate,
      onSelect,
      setCurrentOption,
      withCheckBox,
    },
    listRef,
  ) => {
    const { t } = useTranslation();

    const { control } = useForm({
      defaultValues: { checked: false },
    });

    return (
      <div
        ref={listRef}
        className={cn(
          'w-full absolute z-[1000] top-[115%] left-0 bg-white overflow-hidden',
          dropdownClassname,
          'slide-in-from-top-2 duration-250',
          isOpen ? 'fade-in-1 animate-in zoom-in-95' : 'fade-in-0 animate-out zoom-out-95',
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn('max-h-[263px] overflow-auto', dropdownInnerContainerClassname)}>
          {typeof options === 'function'
            ? options({ isHovered, close: () => setIsOpen(false) })
            : options.map((option, i) => (
                <div
                  key={i}
                  className={cn(
                    'group w-full flex items-center gap-[8px] cursor-pointer font-[500] h-[34px] pl-[6px] font-montserrat',
                    'hover:font-[500] transition-all ease-out font-montserrat hover:bg-green-light',
                    '[&:not(:last-child)]:border-b-[1px] border-solid border-light-gray hover:text-white',
                    options.some((el) => el.leftIcon) &&
                      withIcon &&
                      !option.leftIcon &&
                      'pl-[24px]',
                    currentOption?.value === option.value && !isHovered && 'bg-light-gray',
                    optionClassname,
                  )}
                  onClick={() => {
                    if (!asDropdown) {
                      setCurrentOption(option);
                      onSelect?.(option.value);
                      setIsOpen(false);
                      setIsHovered(false);
                    }
                  }}
                >
                  {withCheckBox && (
                    <Checkbox
                      checked={option.value === currentOption?.value}
                      controllerProps={{ name: 'checked', control }}
                      id="select"
                    />
                  )}

                  {withIcon && option.leftIcon}
                  {withTranslate ? t(option.label) : option.label}
                </div>
              ))}
        </div>
      </div>
    );
  },
);

Dropdown.displayName = 'SelectDropdown';

export default Dropdown;
