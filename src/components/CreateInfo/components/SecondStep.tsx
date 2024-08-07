import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import SliderButton from '@/components/SliderButton';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { cities } from '@/constants/cities';
import { metals } from '@/constants/metals';
import { samples } from '@/constants/sample';
import { sexes } from '@/constants/sex';
import { stones } from '@/constants/stones';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/ui/Button';
import Checkbox from '@/ui/Checkbox';
import CustomSelect from '@/ui/CustomSelect';
import Input from '@/ui/Input';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import { PostMadeBy } from '@/constants/enums';

import style from '../style.module.scss';

interface IProps {
  onStep: (direction: number) => void;
}

interface FormState {
  size: string;
  isJewelry: boolean;
  sex: string;
  recommendations: string;
  requestCategories: string[];
  material: string;
  stone: string;
  city: string;
  sample: string;
  address: string;
  madeBy: PostMadeBy;
}

const schema = z.object({
  isJewelry: z.boolean(),
  requestCity: z.array(z.string()),
  requestCategories: z.array(z.string()),
  material: z.array(z.string()),
  stone: z.array(z.string()),
  sample: z.array(z.string()),
  size: z.string(),
  address: z.string(),
  madeBy: z.string(),
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
      isJewelry: true,
      sex: state.sex,
      size: state.size,
      city: state.city,
      sample: state.sample,
      recommendations: state.recommendations,
      requestCategories: state.requestCategories,
      material: state.material,
      stone: state.stone,
      address: state.address,
      madeBy: state.madeBy,
    },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const { sex, city, requestCategories, material, stone, madeBy, sample } = watch();

  const handleMove = (direction: number) => () => {
    setState(getValues());
    onStep(direction);
  };

  const handleCategoriesValue = (newValue: string) => {
    setValue('requestCategories', [newValue], { shouldTouch: true });
  };

  const handleMetalValue = (newValue: string) => {
    setValue('material', newValue, { shouldTouch: true });
  };

  const handleCityValue = (newValue: string) => {
    setValue('city', newValue, { shouldTouch: true });
  };

  const handleSamplesValue = (newValue: string) => {
    setValue('sample', newValue, { shouldTouch: true });
  };
  const handleStoneValue = (newValue: string) => {
    setValue('stone', newValue, { shouldTouch: true });
  };
  const setIsJewelry = (isActive: boolean) => () =>
    setValue('isJewelry', !isActive, { shouldTouch: true });

  const handleSelectChange = (value: string) => {
    setValue('sex', value, { shouldTouch: true });
  };

  const setMadeBy = (value: PostMadeBy) => {
    setValue('madeBy', value, { shouldTouch: true });
  };

  return (
    <>
      <div className="flex flex-col gap-[14px]">
        <div className={style.back}>
          <button onClick={handleMove(-1)} className={cn(style['back-btn'], '2xl:!gap-[14px]')}>
            <HomeSvgSelector id="arrow-left" />
            <Typography variant="heading3">{t('back')}</Typography>
          </button>
        </div>
        <div className="2xl:flex 2xl:flex-col 2xl:gap-[4px]">
          <Typography variant="heading2">{t('post.addDescription')}</Typography>
          <Typography variant="heading3">{t('post.willFaster')}</Typography>
        </div>
        <div className="flex flex-col gap-2 px-[2px]">
          <div className="pt-2">
            <CustomSelect
              options={categories}
              placeholder={t('inputs.product')}
              onSelect={handleCategoriesValue}
              value={categories.find((el) => requestCategories?.includes(el.value))}
              withoutDialog
            />
          </div>
          <div className="pt-2">
            <CustomSelect
              withTranslate={true}
              options={metals}
              placeholder={t('inputs.metal')}
              onSelect={handleMetalValue}
              value={metals.find((el) => el.value === material)}
              withoutDialog
            />
          </div>
          <div className="pt-2">
            <CustomSelect
              withTranslate={true}
              options={samples}
              placeholder={t('sample')}
              onSelect={handleSamplesValue}
              value={samples.find((el) => el.value === sample)}
              withoutDialog
            />
          </div>
          <div className="pt-2">
            <CustomSelect
              withTranslate={true}
              options={stones}
              placeholder={t('stone')}
              onSelect={handleStoneValue}
              value={stones.find((el) => el.value === stone)}
              withoutDialog
            />
          </div>
          <div className="pt-2">
            <Input controllerProps={{ control, name: 'size' }} placeholder={t('size')} />
          </div>
          <div className="pt-2">
            <Input
              controllerProps={{ control, name: 'recommendations' }}
              placeholder={t('careRecommendations')}
            />
          </div>
          <div className="pt-2">
            <CustomSelect
              withTranslate={true}
              options={cities}
              placeholder={t('inputs.city')}
              onSelect={handleCityValue}
              value={cities.find((el) => el.value === city)}
              withoutDialog
            />
          </div>
          <div className="pt-2">
            <Input
              controllerProps={{ control, name: 'address' }}
              placeholder={t('inputs.address')}
            />
          </div>
        </div>

        <div className="2xl:flex 2xl:flex-col 2xl:gap-[4px]">
          <Typography variant="heading2">{t('post.bijouterie')}</Typography>
        </div>
        <SliderButton
          leftText={t('yes')}
          rightText={t('no')}
          variant="gray"
          onClick={setIsJewelry}
          className="!w-full"
          defaultValue={true}
        />
        <div className="2xl:flex 2xl:flex-col 2xl:gap-[4px]">
          <Typography variant="heading2">{t('sex')}</Typography>
        </div>
        <div className=" min-h-[0px] flex flex-col gap-[14px]">
          {sexes.map(({ label, value }) => (
            <Checkbox
              key={value}
              controllerProps={{ control, name: 'sex' }}
              id={value}
              value={value}
              checked={sex?.includes(value)}
              onChangeCustom={(_, value) => handleSelectChange(value as string)}
            >
              {t(label)}
            </Checkbox>
          ))}
        </div>
        <div className="2xl:flex 2xl:flex-col 2xl:gap-[4px]">
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
        <Button
          className={cn(style.ButtonNext, '2xl:mt-auto !w-full mt-8')}
          onClick={handleMove(1)}
        >
          {Object.keys(touchedFields).length === 0 ? t('skip') : t('continue')}
        </Button>
      </div>
    </>
  );
};

export default SecondStep;
