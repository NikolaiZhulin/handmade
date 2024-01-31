import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import SliderButton from '@/components/SliderButton';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { cities } from '@/constants/cities';
import { UsedPeriod } from '@/constants/enums';
import { post } from '@/constants/post.common';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { useTranslation } from '@/hooks/useTranslation';
import FlexContainer from '@/layout/FlexContainer';
import Button from '@/ui/Button';
import Select from '@/ui/CustomSelect';
import Input from '@/ui/Input';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

import style from '../style.module.scss';

interface IProps {
  onStep: (direction: number) => void;
}

interface FormState {
  isUsed: boolean;
  usedAmount: number;
  usedPeriod: UsedPeriod;
  city: string;
  requestCategories: string[];
  address: string;
}

const schema = z.object({
  isUsed: z.boolean(),
  usedAmount: z.string(),
  usedPeriod: z.string(),
  city: z.string(),
  requestCategories: z.array(z.string()),
  address: z.string(),
});

const SecondStep: FC<IProps> = ({ onStep }) => {
  const [state, setState] = useContext(CreatePostContext);
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect('leftIcon');

  const {
    watch,
    control,
    setValue,
    getValues,
    formState: { touchedFields },
  } = useForm<FormState>({
    defaultValues: {
      isUsed: state.isUsed,
      usedAmount: state.usedAmount,
      usedPeriod: state.usedPeriod,
      city: state.city,
      requestCategories: state.requestCategories,
      address: state.address,
    },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const [isUsed, usedPeriod, city, requestCategories] = watch([
    'isUsed',
    'usedPeriod',
    'city',
    'requestCategories',
  ]);
  const changeUsed = (value: boolean) => () => setValue('isUsed', !value);

  const handleMove = (direction: number) => () => {
    setState(getValues());
    onStep(direction);
  };

  const handleCategoriesValue = (newValue: string) => {
    setValue('requestCategories', [newValue], { shouldTouch: true });
  };

  const handleCityValue = (newValue: string) => {
    setValue('city', newValue, { shouldTouch: true });
  };

  const handlePeriodChange = (newValue: string) => {
    setValue('usedPeriod', newValue as UsedPeriod, { shouldTouch: true });
  };

  return (
    <>
      <div className={style.back}>
        <button onClick={handleMove(-1)} className={cn(style['back-btn'], '2xl:!gap-[14px]')}>
          <HomeSvgSelector id="arrow-left" />
          <Typography variant="heading3">{t('back')}</Typography>
        </button>
      </div>
      <div className="mb-[8px] 2xl:flex 2xl:flex-col 2xl:gap-[4px]">
        <Typography variant="heading2">{t('post.addDescription')}</Typography>
        <Typography variant="heading3" className={style['gray-text']}>
          {t('post.willFaster')}
        </Typography>
      </div>
      <Select
        options={categories}
        placeholder={t('inputs.category')}
        onSelect={handleCategoriesValue}
        value={categories.find((el) => requestCategories?.includes(el.value))}
      />
      <Select
        withTranslate={true}
        options={cities}
        placeholder={t('inputs.city')}
        onSelect={handleCityValue}
        value={cities.find((el) => el.value === city)}
      />
      <Input controllerProps={{ control, name: 'address' }} placeholder={t('inputs.address')} />
      <SliderButton
        onClick={changeUsed}
        leftText={t('post.used')}
        rightText={t('post.new')}
        className="!w-full"
        variant="gray"
        small={true}
        defaultValue={!isUsed}
      />
      {isUsed && (
        <FlexContainer className={style.gap8} align="start">
          <Input
            controllerProps={{ name: 'usedAmount', control }}
            placeholder={t('inputs.usedPeriod')}
            className="!w-full"
            type="number"
          />
          <Select
            withTranslate={true}
            containerClassname="!w-full"
            options={post.usedPeriod}
            placeholder={t('inputs.period')}
            onSelect={handlePeriodChange}
            value={post.usedPeriod.find((el) => el.value === usedPeriod)}
          />
        </FlexContainer>
      )}
      <Button className={cn(style.ButtonNext, '2xl:mt-auto')} onClick={handleMove(1)}>
        {Object.keys(touchedFields).length <= 0 ? t('skip') : t('continue')}
      </Button>
    </>
  );
};

export default SecondStep;
