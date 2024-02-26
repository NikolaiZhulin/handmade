import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Checkbox from '@/ui/Checkbox';
import { cities } from '@/constants/cities';
import Button from '@/ui/Button';
import { GetPostsVariables } from '@/api/posts/get-posts';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import CustomSelect from '@/ui/CustomSelect';
import { cn } from '@/utils/utils';
import { metals } from '@/constants/metals';
import { ShowAllListButton } from '@/ui/ShowAllListButton';
import { samples } from '@/constants/sample';
import { stones } from '@/constants/stones';
import SliderButton from '@/components/SliderButton';
import { sexes } from '@/constants/sex';

import styles from './style.module.scss';

interface IFormData {
  category: string;
  withPhoto: boolean;
  city: string[];
  metal: string[];
  sample: string[];
  stone: string[];
  sex: string[];
  isJewelry: boolean;
  priceFrom: number;
  priceTo: number;
  isUsed: boolean;
  search: string;
}
interface IProps {
  onApplyFilters: (data: GetPostsVariables['filter']) => void;
  searchedItems?: number;
  onModalClose?: () => void;
}

const SearchFilters: FC<IProps> = ({ onModalClose, onApplyFilters, searchedItems }) => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect('leftIcon');
  const [isMetalsListOpen, setMetalsListOpen] = useState(false);
  const [isStonesListOpen, setStonesListOpen] = useState(false);

  const { control, handleSubmit, setValue, watch, reset } = useForm<IFormData>({
    defaultValues: {
      city: query.cities
        ? query.cities === 'all'
          ? ['all']
          : (query.cities as string).split(',')
        : [],
      metal: [],
      sample: [],
      stone: [],
      sex: [],
      isJewelry: false,
      category: (query.category as string) ?? 'all',
      search: (query.search as string) ?? '',
      withPhoto: false,
      priceFrom: undefined,
      priceTo: undefined,
    },
  });

  const { city, metal, sample, sex, stone, isUsed, withPhoto, search, category } = watch();

  const setIsJewelry = (isActive: boolean) => () => {
    setValue('isJewelry', !isActive);
  };

  const setMetal = (value: string) => {
    if(!Array.isArray(metal)){
      return
    }
    if (value) {
      if (!metal.includes(value)) {
        const nextValue = [...metal, value];
        setValue('metal', nextValue);
      } else {
        const nextValues = [...metal];

        const existed = nextValues.findIndex((item) => item === value);
        nextValues.splice(existed, 1);
        setValue('metal', nextValues);
      }
    }
  };

  const setSample = (value: string) => {
    if(!Array.isArray(sample)){
      return
    }
    if (value) {
      if (!sample?.includes(value)) {
        const nextValue = [...sample, value];
        setValue('sample', nextValue);
      } else {
        const nextValues = [...sample];

        const existed = nextValues.findIndex((item) => item === value);
        nextValues.splice(existed, 1);
        setValue('sample', nextValues);
      }
    }
  };

  const setSex = (value: string) => {
    if(!Array.isArray(sex)){
      return
    }
    if (value) {
      if (!sex.includes(value)) {
        const nextValue = [...sex, value];
        setValue('sex', nextValue);
      } else {
        const nextValues = [...sex];

        const existed = nextValues.findIndex((item) => item === value);
        nextValues.splice(existed, 1);
        setValue('sex', nextValues);
      }
    }
  };

  const setStone = (value: string) => {
    if (!value || !Array.isArray(stone)) {
      return;
    }

    if (value === 'none' && stone.includes(value)) {
      const emptyArr: string[] = [];
      setValue('stone', emptyArr);
      return;
    }
    if (value === 'none') {
      setValue('stone', [value]);
      return;
    }

    if (!stone.includes(value)) {
      const nextValue = [...stone.filter((s) => s !== 'none'), value];
      setValue('stone', nextValue);
    } else {
      const nextValues = [...stone];

      const existed = nextValues.findIndex((item) => item === value);
      nextValues.splice(existed, 1);
      setValue('stone', nextValues);
    }
  };

  const handleSelectChange = (value: string | string[]) => {
    if(!Array.isArray(city)){
      return
    }
    if (Array.isArray(value)) {
      setValue('city', value);
      return;
    }
    if (value) {
      if (value === 'all') {
        if (cities.length === city.length) {
          setValue('city', []);
        } else {
          const values = cities.map((el) => el.value);
          setValue('city', values);
        }
      } else if (!city.includes(value)) {
        const nextValue = [...city, value];
        if (nextValue.length === cities.length - 1) {
          nextValue.push('all');
        }
        setValue('city', nextValue);
      } else {
        const allIndex = city.findIndex((el) => el === 'all');
        const nextValues = [...city];
        if (allIndex >= 0) {
          nextValues.splice(allIndex, 1);
        }
        const existed = nextValues.findIndex((item) => item === value);
        nextValues.splice(existed, 1);
        setValue('city', nextValues);
      }
    }
  };

  const applyFilters = () => {
    handleSubmit((values) => {
      onApplyFilters({ ...values });
    })();
    onModalClose?.();
  };

  const handleReset = () => {
    reset({
      city: [],
      category: 'all',
      search: '',
      withPhoto: false,
      isUsed: false,
      priceFrom: undefined,
      priceTo: undefined,
      metal: undefined,
      sample: [],
    });
    applyFilters();
  };

  const onReset = (field: string) => {
    switch (field) {
      case 'city':
        setValue('city', ['all']);
        break;
      case 'metal':
        setValue('metal', []);
        break;
      case 'sample':
        setValue('sample', []);
        break;
      case 'stone':
        setValue('stone', []);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (query.search !== search) {
      setValue('search', query.search as string);
      applyFilters();
    }
    if (query.category) {
      setValue('category', query.category as string);
    }
  }, [query.search, query.category]);

  return (
    <>
      <div className={cn(styles.wrapper, '2xl:h-full xs:!p-[20px] 2xl:no-scrollbar')}>
        <Button color="green" fullWidth={true} onClick={handleReset}>
          {t('search.reset')}
        </Button>
        <CustomSelect
          placeholder={t('inputs.product')}
          containerClassname="mt-[14px]"
          options={[{ value: 'all', label: t('inputs.allCategories') }, ...categories]}
          onSelect={(value) => setValue('category', value)}
          value={categories.find((el) => el.value === category)}
          withoutDialog
        />
        <Checkbox controllerProps={{ control, name: 'withPhoto' }} checked={withPhoto}>
          {t('inputs.onlyImage')}
        </Checkbox>
        <div className={styles.cityReset}>
          <Typography variant="heading2">{t('metal')}</Typography>
          <button onClick={() => onReset('metal')}>
            <Typography variant="text3">{t('reset')}</Typography>
          </button>
        </div>
        {metals.slice(0, 4).map((el) => (
          <Checkbox
            key={el.value}
            controllerProps={{ control, name: 'metal' }}
            id={el.value}
            value={el.value}
            checked={metal?.includes(el.value)}
            onChangeCustom={(_, value) => setMetal(value as string)}
          >
            {t(el.label)}
          </Checkbox>
        ))}
        <div
          className={cn(
            'grid grid-rows-[0fr] transition-[all] overflow-hidden mt-[-14px]',
            isMetalsListOpen && 'grid-rows-[1fr] mt-[0px]',
          )}
        >
          <div className=" min-h-[0px] flex flex-col gap-[14px]">
            {metals.slice(4, metals.length).map((el) => (
              <Checkbox
                key={el.value}
                controllerProps={{ control, name: 'metal' }}
                id={el.value}
                value={el.value}
                checked={metal?.includes(el.value)}
                onChangeCustom={(_, value) => setMetal(value as string)}
              >
                {t(el.label)}
              </Checkbox>
            ))}
          </div>
        </div>
        <ShowAllListButton
          onClick={() => setMetalsListOpen(!isMetalsListOpen)}
          isOpen={isMetalsListOpen}
        />
        <div className={cn(styles.cityReset)}>
          <Typography variant="heading2">{t('sample')}</Typography>
          <button onClick={() => onReset('sample')}>
            <Typography variant="text3">{t('reset')}</Typography>
          </button>
        </div>
        {samples.slice(0, 4).map((el) => (
          <Checkbox
            key={el.value}
            controllerProps={{ control, name: 'sample' }}
            id={el.value}
            value={el.value}
            checked={sample?.includes(el.value)}
            onChangeCustom={(_, value) => setSample(value as string)}
          >
            {t(el.label)}
          </Checkbox>
        ))}

        <div className={styles.cityReset}>
          <Typography variant="heading2">{t('stone')}</Typography>
          <button onClick={() => onReset('stone')}>
            <Typography variant="text3">{t('reset')}</Typography>
          </button>
        </div>
        {stones.slice(0, 5).map((el) => (
          <Checkbox
            key={el.value}
            controllerProps={{ control, name: 'stone' }}
            id={el.value}
            value={el.value}
            checked={stone?.includes(el.value)}
            onChangeCustom={(_, value) => setStone(value as string)}
          >
            {t(el.label)}
          </Checkbox>
        ))}
        <div
          className={cn(
            'grid grid-rows-[0fr] transition-[all] overflow-hidden mt-[-14px]',
            isStonesListOpen && 'grid-rows-[1fr] mt-[0px]',
          )}
        >
          <div className=" min-h-[0px] flex flex-col gap-[14px]">
            {stones.slice(5, stones.length).map((el) => (
              <Checkbox
                key={el.value}
                controllerProps={{ control, name: 'stone' }}
                id={el.value}
                value={el.value}
                checked={stone?.includes(el.value)}
                onChangeCustom={(_, value) => setStone(value as string)}
              >
                {t(el.label)}
              </Checkbox>
            ))}
          </div>
        </div>
        <ShowAllListButton
          onClick={() => setStonesListOpen(!isStonesListOpen)}
          isOpen={isStonesListOpen}
        />

        <div className={styles.cityReset}>
          <Typography variant="heading2">{t('jewelry')}</Typography>
        </div>
        <SliderButton
          leftText={t('yes')}
          rightText={t('no')}
          variant="gray"
          onClick={setIsJewelry}
          className={styles.w100}
          defaultValue={!isUsed}
        />

        <div className={styles.cityReset}>
          <Typography variant="heading2">{t('sex')}</Typography>
        </div>
        {sexes.map((el) => (
          <Checkbox
            key={el.value}
            controllerProps={{ control, name: 'sex' }}
            id={el.value}
            value={el.value}
            checked={sex?.includes(el.value)}
            onChangeCustom={(_, value) => setSex(value as string)}
          >
            {t(el.label)}
          </Checkbox>
        ))}

        {/*<div className={styles.divider} />*/}
        {/*<Typography variant="heading2">{t('price2')}</Typography>*/}
        {/*<div className={styles.price}>*/}
        {/*  <Input*/}
        {/*    controllerProps={{ control, name: 'priceFrom' }}*/}
        {/*    type="number"*/}
        {/*    placeholder={t('inputs.priceFrom')}*/}
        {/*  />*/}
        {/*  <Input*/}
        {/*    controllerProps={{ control, name: 'priceTo' }}*/}
        {/*    type="number"*/}
        {/*    placeholder={t('inputs.priceTo')}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<Checkbox controllerProps={{ control, name: 'isUsed' }} id="isUsed" checked={isUsed}>*/}
        {/*  {t('search.new1')}*/}
        {/*</Checkbox>*/}

        <div className={styles.cityReset}>
          <Typography variant="heading2">{t('header.city')}</Typography>
          <button onClick={() => onReset('city')}>
            <Typography variant="text3">{t('reset')}</Typography>
          </button>
        </div>
        {cities.map((el) => (
          <Checkbox
            key={el.value}
            controllerProps={{ control, name: 'city' }}
            id={el.value}
            value={el.value}
            checked={city?.includes(el.value)}
            onChangeCustom={(_, value) => handleSelectChange(value as string)}
          >
            {t(el.label)}
          </Checkbox>
        ))}
        <Button className={styles.w100} onClick={applyFilters}>
          {t('search.show')} ({searchedItems || 0})
        </Button>
      </div>
    </>
  );
};

export default SearchFilters;
