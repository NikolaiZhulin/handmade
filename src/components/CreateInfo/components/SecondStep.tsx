import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import SliderButton from '@/components/SliderButton';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { UsedPeriod } from '@/constants/enums';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/ui/Button';
import Select from '@/ui/CustomSelect';
import Input from '@/ui/Input';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import { cities } from '@/constants/cities';
import { metals } from '@/constants/metals';
import { samples } from '@/constants/sample';
import { sexes } from '@/constants/sex';
import { stones } from '@/constants/stones';
import Checkbox from '@/ui/Checkbox';
import CustomSelect from '@/ui/CustomSelect';

import style from '../style.module.scss';

interface IProps {
  onStep: (direction: number) => void;
}

interface FormState {
  isUsed: boolean;
  usedAmount: number;
  usedPeriod: UsedPeriod;
  city: string;
  metal: string;
  jewel: string;
  sample: string;
  stone: string;
  size: string;
  isJewelry: boolean;
  sex: string[];
  careRecommendations: string;
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
      isJewelry: true,
      usedAmount: state.usedAmount,
      usedPeriod: state.usedPeriod,
      metal: state.metal,
      sex: state.sex,
      jewel: state.jewel,
      sample: state.sample,
      stone: state.stone,
      size: state.size,
      careRecommendations: state.careRecommendations,
      city: state.city,
      requestCategories: state.requestCategories,
      address: state.address,
    },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const { sex, isUsed, usedPeriod, city, requestCategories } = watch();

  const handleMove = (direction: number) => () => {
    setState(getValues());
    onStep(direction);
  };

  const handleCategoriesValue = (newValue: string) => {
    setValue('requestCategories', [newValue], { shouldTouch: true });
  };

  const handleCityValue = (newValue: string) => {
    setValue('metal', newValue, { shouldTouch: true });
  };

  const handleSamplesValue = (newValue: string) => {
    setValue('sample', newValue, { shouldTouch: true });
  };
  const handleStoneValue = (newValue: string) => {
    setValue('stone', newValue, { shouldTouch: true });
  };
  const setIsJewelry = (isActive: boolean) => () => setValue('isJewelry', !isActive);

  const handleSelectChange = (value: string) => {
    setValue('sex', [...sex, value]);
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
          <Typography variant="heading3" className={style['gray-text']}>
            {t('post.willFaster')}
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <div className="pt-2">
            <CustomSelect
              options={categories}
              placeholder={t('inputs.jewel')}
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
              onSelect={handleCityValue}
              value={metals.find((el) => requestCategories?.includes(el.value))}
              withoutDialog
            />
          </div>
          <div className="pt-2">
            <CustomSelect
              withTranslate={true}
              options={samples}
              placeholder={t('inputs.sample')}
              onSelect={handleSamplesValue}
              value={samples.find((el) => requestCategories?.includes(el.value))}
              withoutDialog
            />
          </div>
          <div className="pt-2">
            <CustomSelect
              withTranslate={true}
              options={stones}
              placeholder={t('inputs.stone')}
              onSelect={handleStoneValue}
              value={stones.find((el) => requestCategories?.includes(el.value))}
              withoutDialog
            />
          </div>
          <div className="pt-2">
            <Input controllerProps={{ control, name: 'size' }} placeholder={t('inputs.size')} />
          </div>
          <div className="pt-2">
            <Input
              controllerProps={{ control, name: 'careRecommendations' }}
              placeholder={t('inputs.careRecommendations')}
            />
          </div>
          <div className="pt-2">
            <CustomSelect
              withTranslate={true}
              options={cities}
              placeholder={t('inputs.city')}
              onSelect={handleCityValue}
              value={cities.find((el) => requestCategories?.includes(el.value))}
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
          <Typography variant="heading2">{t('post.sex')}</Typography>
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
