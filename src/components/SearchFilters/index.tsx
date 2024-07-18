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
import { sexes } from '@/constants/sex';
import Input from '@/ui/Input';
import { PostMadeBy } from '@/constants/enums';

import styles from './style.module.scss';

interface IFormData {
  category: string;
  withPhoto: boolean;
  city: string[];
  metal: string[];
  sample: string[];
  stone: string[];
  sex: string[];
  isJewelry?: boolean;
  priceFrom?: number;
  priceTo?: number;
  isUsed: boolean;
  search: string;
  madeBy?: PostMadeBy;
}
interface IProps {
  onApplyFilters: (data: GetPostsVariables['filter']) => void;
  searchedItems?: number;
  onModalClose?: () => void;
  filters: GetPostsVariables['filter'];
}

const SearchFilters: FC<IProps> = ({ onModalClose, onApplyFilters, filters }) => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect('leftIcon');
  const [isMetalsListOpen, setMetalsListOpen] = useState(false);
  const [isStonesListOpen, setStonesListOpen] = useState(false);
  const [isSamplesListOpen, setSamplesListOpen] = useState(false);

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
      isJewelry: undefined,
      category: (query.category as string) ?? 'all',
      search: (query.search as string) ?? '',
      withPhoto: false,
      priceFrom: undefined,
      priceTo: undefined,
      madeBy: undefined,
    },
  });

  const { city, metal, sample, sex, stone, isJewelry, madeBy, withPhoto, search, category } =
    watch();

  const setIsJewelry = (value: string) => {
    if (value) {
      if (value === 'yes' && isJewelry) {
        setValue('isJewelry', undefined);
      }
      if (value === 'yes' && !isJewelry) {
        setValue('isJewelry', true);
      }
      if (value === 'no' && isJewelry) {
        setValue('isJewelry', false);
      }
      if (value === 'no' && isJewelry === false) {
        setValue('isJewelry', undefined);
      }
      if (value === 'no' && isJewelry === undefined) {
        setValue('isJewelry', false);
      }
    }
  };

  const setMetal = (value: string) => {
    if (value) {
      if (value === 'all_metals') {
        if (metals.length === metal.length) {
          setValue('metal', []);
        } else {
          const values = metals.map((el) => el.value);
          setValue('metal', values);
        }
      } else if (!metal.includes(value)) {
        const nextValue = [...metal, value];
        if (nextValue.length === metals.length - 1) {
          nextValue.push('all_metals');
        }
        setValue('metal', nextValue);
      } else {
        const allIndex = metal.findIndex((el) => el === 'all_metals');
        const nextValues = [...metal];
        if (allIndex >= 0) {
          nextValues.splice(allIndex, 1);
        }
        const existed = nextValues.findIndex((item) => item === value);
        nextValues.splice(existed, 1);
        setValue('metal', nextValues);
      }
    }
  };

  const setSample = (value: string) => {
    if (value) {
      if (value === 'all_samples') {
        if (samples.length === sample.length) {
          setValue('sample', []);
        } else {
          const values = samples.map((el) => el.value);
          setValue('sample', values);
        }
      } else if (!sample.includes(value)) {
        const nextValue = [...sample, value];
        if (nextValue.length === samples.length - 1) {
          nextValue.push('all_samples');
        }
        setValue('sample', nextValue);
      } else {
        const allIndex = sample.findIndex((el) => el === 'all_samples');
        const nextValues = [...sample];
        if (allIndex >= 0) {
          nextValues.splice(allIndex, 1);
        }
        const existed = nextValues.findIndex((item) => item === value);
        nextValues.splice(existed, 1);
        setValue('sample', nextValues);
      }
    }
  };

  const setSex = (value: string) => {
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

  const setMadeBy = (value: PostMadeBy) => {
    if (value) {
      if (value === PostMadeBy.FACTORY && madeBy !== PostMadeBy.FACTORY) {
        setValue('madeBy', PostMadeBy.FACTORY);
      }
      if (value === PostMadeBy.HANDMADE && madeBy !== PostMadeBy.HANDMADE) {
        setValue('madeBy', PostMadeBy.HANDMADE);
      }
      if (value === PostMadeBy.FACTORY && madeBy === PostMadeBy.FACTORY) {
        setValue('madeBy', undefined);
      }
      if (value === PostMadeBy.HANDMADE && madeBy === PostMadeBy.HANDMADE) {
        setValue('madeBy', undefined);
      }
    }
  };

  const setStone = (value: string) => {
    if (value) {
      if (value === 'all_stones') {
        if (stones.length === stone.length) {
          setValue('stone', []);
        } else {
          const values = stones.map((el) => el.value);
          setValue('stone', values);
        }
      } else if (!stone.includes(value)) {
        const nextValue = [...stone, value];
        if (nextValue.length === stones.length - 1) {
          nextValue.push('all_stones');
        }
        setValue('stone', nextValue);
      } else {
        const allIndex = stone.findIndex((el) => el === 'all_stones');
        const nextValues = [...stone];
        if (allIndex >= 0) {
          nextValues.splice(allIndex, 1);
        }
        const existed = nextValues.findIndex((item) => item === value);
        nextValues.splice(existed, 1);
        setValue('stone', nextValues);
      }
    }
  };

  const handleSelectChange = (value: string | string[]) => {
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
      isJewelry: undefined,
      metal: [],
      sample: [],
      priceFrom: undefined,
      priceTo: undefined,
      madeBy: undefined,
      sex: undefined,
      stone: [],
    });
    applyFilters();
  };

  const onReset = (field: string) => {
    switch (field) {
      case 'city':
        setValue('city', ['all']);
        break;
      case 'price':
        setValue('priceTo', undefined);
        setValue('priceFrom', undefined);
        break;
      case 'metal':
        setValue('metal', []);
        break;
      case 'sample':
        setValue('sample', []);
        break;
      case 'stone':
        setValue('stone', []);
      case 'jewelry':
        setValue('isJewelry', undefined);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (query.resetOtherFilters) {
      return;
    }

    if (query.search !== search) {
      setValue('search', query.search as string);
    }
    if (query.category) {
      setValue('category', query.category as string);
    }

    if (query.cities) {
      setValue('city', Array.isArray(query.cities) ? query.cities : query.cities.split(','));
    }

    applyFilters();
  }, [query.search, query.category, query.cities]);

  useEffect(() => {
    setValue('withPhoto', Boolean(filters.withPhoto));
    setValue('isJewelry', filters.isJewelry);
    setValue('sex', filters.sex || []);
    setValue('city', filters.city || []);
    setValue('metal', filters.metal || []);
    setValue('sample', filters.sample || []);
    setValue('stone', filters.stone || []);
    setValue('isJewelry', filters.isJewelry);
    setValue('category', filters.category);
    setValue('madeBy', filters.madeBy);
  }, [filters]);

  return (
    <>
      <div className={cn(styles.wrapper, '2xl:h-full xs:!p-[0px] 2xl:no-scrollbar')}>
        <Button color="green" className="!px-[12px]" fullWidth={true} onClick={handleReset}>
          {t('search.reset')}
        </Button>
        <CustomSelect
          placeholder={t('inputs.product')}
          containerClassname="mt-[14px]"
          options={[...categories]}
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
        <div
          className={cn(
            'grid grid-rows-[0fr] transition-[all] overflow-hidden mt-[-14px]',
            isSamplesListOpen && 'grid-rows-[1fr] mt-[0px]',
          )}
        >
          <div className=" min-h-[0px] flex flex-col gap-[14px]">
            {samples.slice(4, samples.length).map((el) => (
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
          </div>
        </div>
        <ShowAllListButton
          onClick={() => setSamplesListOpen(!isSamplesListOpen)}
          isOpen={isSamplesListOpen}
        />
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
          <button onClick={() => onReset('jewelry')}>
            <Typography variant="text3">{t('reset')}</Typography>
          </button>
        </div>
        <Checkbox
          controllerProps={{ control, name: 'isJewelry' }}
          value={'yes'}
          id={'yes'}
          checked={isJewelry === true}
          onChangeCustom={(_, value) => setIsJewelry(value as string)}
        >
          {t('yes')}
        </Checkbox>
        <Checkbox
          controllerProps={{ control, name: 'isJewelry' }}
          value={'no'}
          id={'no'}
          checked={isJewelry === false}
          onChangeCustom={(_, value) => setIsJewelry(value as string)}
        >
          {t('no')}
        </Checkbox>

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

        <div className={styles.cityReset}>
          <Typography variant="heading2">{t('inputs.product')}</Typography>
        </div>
        {Object.values(PostMadeBy).map((el) => (
          <Checkbox
            key={el}
            controllerProps={{ control, name: 'sex' }}
            id={el}
            value={el}
            checked={madeBy?.includes(el)}
            onChangeCustom={(_, value) => setMadeBy(value as PostMadeBy)}
          >
            {t(el)}
          </Checkbox>
        ))}

        <div className={styles.cityReset}>
          <Typography variant="heading2">{t('price2')}</Typography>
          <button onClick={() => onReset('price')}>
            <Typography variant="text3">{t('reset')}</Typography>
          </button>
        </div>
        <div className={styles.price}>
          <Input
            controllerProps={{ control, name: 'priceFrom' }}
            type="number"
            placeholder={t('inputs.priceFrom')}
          />
          <Input
            controllerProps={{ control, name: 'priceTo' }}
            type="number"
            placeholder={t('inputs.priceTo')}
          />
        </div>

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
            checked={city.includes(el.value)}
            onChangeCustom={(_, value) => handleSelectChange(value as string)}
          >
            {t(el.label)}
          </Checkbox>
        ))}
        <Button className={cn(styles.w100, 'sticky bottom-0 2xl:static')} onClick={applyFilters}>
          {t('search.show')}
        </Button>
      </div>
    </>
  );
};

export default SearchFilters;
