import {
  Dispatch,
  FC,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { capitalize } from '@/helpers/capitalize';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useClickOutside } from '@/hooks/useOnClickOutside';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';

import FloatLabel from '../FloatLabel';
import Typography from '../Typography';

import Dropdown from './components/Dropdown';

export interface IOption {
  value: string;
  label: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  valueIcon?: ReactNode;
}

interface IProps {
  trigger?: (props: {
    currentOption: IOption | undefined;
    toggleOpen: Dispatch<SetStateAction<boolean>>;
    triggerRef: RefObject<HTMLButtonElement>;
    isOpen: boolean;
  }) => ReactNode;
  triggerClassname?: string;
  placeholder?: string;
  defaultValue?: IOption;
  dropdownClassname?: string;
  dropdownInnerContainerClassname?: string;
  optionClassname?: string;
  containerClassname?: string;
  withTranslate?: boolean;
  withIcon?: boolean;
  valueWithIcon?: boolean;
  showOnlyIcon?: boolean;
  onSelect?: (value: string) => void;
  error?: string;
  value?: IOption;
  options: IOption[] | ((props: { isHovered: boolean; close: () => void }) => ReactNode);
  asDropdown?: boolean;
  keepOpen?: boolean;
  withoutDialog?: boolean;
  withCheckBox?: boolean;
}

const Select: FC<IProps> = ({
  options,
  trigger,
  triggerClassname,
  placeholder,
  defaultValue,
  dropdownClassname,
  optionClassname,
  containerClassname,
  dropdownInnerContainerClassname,
  withTranslate,
  onSelect,
  error,
  value,
  valueWithIcon,
  asDropdown,
  withIcon = true,
  showOnlyIcon = false,
  keepOpen = false,
  withoutDialog,
  withCheckBox = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState<IOption | undefined>(defaultValue);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useClickOutside(listRef, () => setIsOpen(false), triggerRef, keepOpen);
  const inDialog = useMediaQuery('(max-width: 1200px)');

  useEffect(() => {
    if (value) {
      setCurrentOption(value);
    } else {
      setCurrentOption(undefined);
    }
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      setCurrentOption(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={cn('relative flex justify-center w-full', containerClassname)}>
      {trigger ? (
        trigger({ currentOption, toggleOpen: setIsOpen, triggerRef, isOpen })
      ) : (
        <button
          ref={triggerRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'px-[14px] py-[10px] ring-dark-gray ring-1 w-[calc(100%-2px)]',
            'flex justify-between bg-white transition-shadow',
            isOpen && 'ring-main-green',
            error && 'ring-red',
            triggerClassname,
          )}
        >
          {placeholder && (
            <FloatLabel isError={!!error} label={placeholder} isFloating={!!currentOption} />
          )}
          <p
            className={cn(
              'font-montserrat text-[14px] leading-[18px]',
              !currentOption ? 'text-light-gray' : 'text-black font-semibold',
            )}
          >
            {valueWithIcon && currentOption?.valueIcon}
            {!showOnlyIcon &&
              (withTranslate
                ? t(currentOption?.label ?? '')
                : capitalize(currentOption?.label ?? ''))}
          </p>
          <span
            className={cn(
              '[&>svg>path]:fill-black transition-transform origin-center',
              isOpen && 'rotate-180',
            )}
          >
            <HomeSvgSelector id="select_arrow" />
          </span>
        </button>
      )}
      {error && (
        <span className="absolute top-[104%] left-0">
          <Typography variant="heading3" color="red">
            {error}
          </Typography>
        </span>
      )}
      {isOpen &&
        (inDialog && !withoutDialog ? (
          <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogContent className="w-[405px] rounded-0 2xl:py-[10px] 2xl:px-0 xs:w-[calc(100%-40px)] xs:mx-[20px] xs:translate-x-[calc(-50%-20px)]">
              <Dropdown
                dropdownClassname={cn('static shadow-none', dropdownClassname)}
                isOpen={isOpen}
                setIsHovered={setIsHovered}
                dropdownInnerContainerClassname={dropdownInnerContainerClassname}
                options={options}
                isHovered={isHovered}
                setIsOpen={setIsOpen}
                currentOption={currentOption}
                setCurrentOption={setCurrentOption}
                withIcon={withIcon}
                optionClassname={optionClassname}
                asDropdown={asDropdown}
                onSelect={onSelect}
                withTranslate={withTranslate}
                withCheckBox={withCheckBox}
                ref={listRef}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Dropdown
            dropdownClassname={cn('shadow-sortShadow', dropdownClassname)}
            isOpen={isOpen}
            setIsHovered={setIsHovered}
            dropdownInnerContainerClassname={dropdownInnerContainerClassname}
            options={options}
            isHovered={isHovered}
            setIsOpen={setIsOpen}
            currentOption={currentOption}
            setCurrentOption={setCurrentOption}
            withIcon={withIcon}
            optionClassname={optionClassname}
            asDropdown={asDropdown}
            onSelect={onSelect}
            withTranslate={withTranslate}
            withCheckBox={withCheckBox}
            ref={listRef}
          />
        ))}
    </div>
  );
};

export default Select;
