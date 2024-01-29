import { Dispatch, FC, SetStateAction, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { cities as citiesData } from '@/constants/cities';
import { useTranslation } from '@/hooks/useTranslation';
import Checkbox from '@/ui/Checkbox';
import Select from '@/ui/CustomSelect';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { cn } from '@/utils/utils';
import { MODAL_CONTEXT_VALUES, ModalContext } from '@/contexts/ModalContext';

interface FormState {
  cities: string[];
  empty: string;
}

interface IProps {
  setCities: Dispatch<SetStateAction<string[]>>;
}

export const HeaderSelect: FC<IProps> = ({ setCities }) => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const [modals, setModal] = useContext(ModalContext);

  const { control, setValue, watch } = useForm<FormState>({
    defaultValues: {
      cities: query.cities
        ? query.cities === 'all'
          ? ['all']
          : (query.cities as string).split(',')
        : [],
      empty: '',
    },
  });

  useEffect(() => {
    const values = citiesData.map((el) => el.value);
    const cities = query.cities
      ? query.cities === 'all'
        ? values
        : (query.cities as string).split(',')
      : values;
    handleSelectChange(cities);
  }, []);

  const formValues = watch();

  const handleSelectChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setValue('cities', value);
      setCities(value);
      return;
    }
    if (value) {
      if (value === 'all') {
        if (citiesData.length === formValues.cities.length) {
          setValue('cities', []);
          setCities([]);
        } else {
          const values = citiesData.map((el) => el.value);
          setValue('cities', values);
          setCities(values);
        }
      } else if (!formValues.cities.includes(value)) {
        const nextValue = [...formValues.cities, value];
        if (nextValue.length === citiesData.length - 1) {
          nextValue.push('all');
        }
        setValue('cities', nextValue);
        setCities(nextValue);
      } else {
        const allIndex = formValues.cities.findIndex((el) => el === 'all');
        const nextValues = [...formValues.cities];
        if (allIndex >= 0) {
          nextValues.splice(allIndex, 1);
        }
        const existed = nextValues.findIndex((item) => item === value);
        nextValues.splice(existed, 1);
        setCities(nextValues);
        setValue('cities', nextValues);
      }
    }
  };

  return (
    <Select
      onSelect={() => {}}
      containerClassname="w-auto"
      trigger={({ isOpen, toggleOpen, triggerRef }) => (
        <div className="relative flex items-center justify-between pl-[16px] pr-[4px] w-[87px] h-[36px] text-[14px] leading-[18px] bg-light-gray font-helvetica font-normal gap-[6px] ring-0 focus:ring-0">
          <button
            ref={triggerRef}
            onClick={() => {
              if (Object.values(modals).some((el) => el)) {
                setModal(MODAL_CONTEXT_VALUES);
              }
              toggleOpen((prev) => !prev);
            }}
            className="w-full flex items-center gap-[4px] text-[14px] leading-[18px] font-montserrat font-normal whitespace-nowrap"
          >
            {t('header.city')}
            <span
              className={cn(
                '[&>svg>path]:fill-[#888D97] transition-transform origin-center',
                isOpen && 'rotate-180 [&>svg>path]:fill-[#000]',
              )}
            >
              <HomeSvgSelector id="select_arrow" />
            </span>
          </button>
        </div>
      )}
      dropdownClassname={cn('w-[204px] top-[115%] left-[-4px]', '2xl:w-full')}
      options={({ isHovered }) =>
        citiesData.map((option) => (
          <div
            key={option.value}
            className={cn(
              'group transition-all duration-300 ease-out hover:bg-green-light py-[4px] pl-[12px] [&:not(:last-child)]:border-b-[1px] border-solid border-light-gray',
              isHovered && 'bg-white',
            )}
          >
            <Checkbox
              controllerProps={{ control, name: 'empty' }}
              checked={formValues.cities.includes(option.value)}
              onChangeCustom={(_, value, e) => {
                e?.stopPropagation();
                handleSelectChange(value as string);
              }}
              value={option.value}
              id={`header-${option.value}`}
              className="!w-full h-[34px] items-center flex"
              labelClassName="w-full"
            >
              {t(option.label)}
            </Checkbox>
          </div>
        ))
      }
    />
  );
};
