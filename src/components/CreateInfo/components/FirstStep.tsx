import { useForm } from 'react-hook-form';
import { FC, useContext, useEffect, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/ui/Input';
import Textarea from '@/ui/Textarea';
import ButtonLogin from '@/ui/ButtonLogin';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import FlexContainer from '@/layout/FlexContainer';
import InputImages from '@/ui/InputImages';
import Button from '@/ui/Button';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { Currency } from '@/constants/enums';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { capitalize } from '@/helpers/capitalize';
import Select from '@/ui/CustomSelect';
import { UserContext } from '@/contexts/UserContext';
import { cn } from '@/utils/utils';

import style from '../style.module.scss';
import { CURRENCY_MAP } from '../config';

interface IProps {
  onStep: (direction: number) => void;
}

interface FormState {
  name: string;
  textRu: string;
  textEn: string;
  textGe: string;
  price: number;
  currency: Currency;
  requestCategories: string[];
  files: File[];
}

export const FirstStep: FC<IProps> = ({ onStep }) => {
  const [state, setState] = useContext(CreatePostContext);
  const [{ accessToken }] = useContext(UserContext);
  const [isEngShown, setIsEngShown] = useState(!!state.textEn);
  const [isGeShown, setIsGeShown] = useState(!!state.textGe);
  const [files, setFiles] = useState<(File | string)[]>(state.files);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const schema = z
    .object({
      name: z.string({ required_error: t('errors.required') }).nonempty(t('errors.required')),
      textRu: z.string(),
      textEn: z.string(),
      textGe: z.string(),
      price: z.coerce.number({ invalid_type_error: t('errors.enterNumber') }),
      currency: z.string().nonempty(t('errors.required')),
    })
    .partial({
      textEn: true,
      textGe: true,
      textRu: true,
    });

  const { control, setValue, handleSubmit, watch, reset } = useForm<FormState>({
    defaultValues: {
      name: state.name,
      textRu: state.textRu,
      textEn: state.textEn,
      textGe: state.textGe,
      price: state.price,
      currency: state.currency,
    },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const currency = watch('currency');

  const handleNextClick = () => {
    handleSubmit((values) => {
      setState({ ...values, files: files.filter((el) => el instanceof File) as File[] });
      onStep(1);
    })();
  };

  const handleFilesChange = (files: (File | string)[]) => {
    setFiles(files);
  };

  const handleCurrencyChnage = (newValue: string) => setValue('currency', newValue as Currency);

  const toggleEng = () => setIsEngShown((prev) => !prev);
  const toggleGe = () => setIsGeShown((prev) => !prev);

  const secondaryLangs = ['ru', 'ge', 'en'].filter((el) => el !== language);

  useEffect(() => {
    if (!isGeShown) {
      setValue(`text${capitalize(secondaryLangs[0])}` as keyof FormState, '');
    }

    if (!isEngShown) {
      setValue(`text${capitalize(secondaryLangs[1])}` as keyof FormState, '');
    }
  }, [isGeShown, isEngShown]);

  useEffect(() => {
    reset({
      name: state.name,
      textRu: state.textRu,
      textEn: state.textEn,
      textGe: state.textGe,
      price: state.price,
      currency: state.currency,
    });
  }, [language]);

  return (
    <>
      <Typography variant="heading2" className={style.Heading2}>
        {t('post.addTitle')}
      </Typography>
      <Input
        controllerProps={{ name: 'name', control }}
        placeholder={t('inputs.postName')}
        disabled={!accessToken}
        autoComplete="off"
      />
      <Textarea
        controllerProps={{ name: `text${capitalize(language)}` as keyof FormState, control }}
        placeholder={t('inputs.postDescription')}
        disabled={!accessToken}
      />
      <Typography variant="heading5" className={style.Heading5}>
        {t('post.translateInfo')}
      </Typography>
      <ButtonLogin
        className={cn(style.Button, 'xs:!h-[32px]')}
        onClick={toggleGe}
        disabled={!accessToken}
      >
        <HomeSvgSelector id={secondaryLangs[0]} />
        {t(`post.text${capitalize(secondaryLangs[0])}${isGeShown ? 1 : ''}`)}
      </ButtonLogin>
      {isGeShown && (
        <Textarea
          controllerProps={{
            name: `text${capitalize(secondaryLangs[0])}` as keyof FormState,
            control,
          }}
          placeholder={t(`inputs.postDescription${capitalize(secondaryLangs[0])}`)}
          disabled={!accessToken}
        />
      )}
      <ButtonLogin
        className={cn(style.Button, 'xs:!h-[32px]')}
        onClick={toggleEng}
        disabled={!accessToken}
      >
        <HomeSvgSelector id={secondaryLangs[1]} />
        {t(`post.text${capitalize(secondaryLangs[1])}${isEngShown ? 1 : ''}`)}
      </ButtonLogin>
      {isEngShown && (
        <Textarea
          controllerProps={{
            name: `text${capitalize(secondaryLangs[1])}` as keyof FormState,
            control,
          }}
          placeholder={t(`inputs.postDescription${capitalize(secondaryLangs[1])}`)}
          disabled={!accessToken}
        />
      )}
      <FlexContainer className={style.FlexContainer} align="start">
        <Input
          controllerProps={{ name: 'price', control }}
          placeholder={t('price')}
          type="number"
          disabled={!accessToken}
          className="2xl:w-full"
        />
        <Select
          containerClassname="w-[100px]"
          options={CURRENCY_MAP}
          placeholder={t('currency')}
          onSelect={handleCurrencyChnage}
          showOnlyIcon={true}
          valueWithIcon={true}
          defaultValue={CURRENCY_MAP.find((el) => el.value === currency)}
        />
      </FlexContainer>
      <InputImages initialFiles={files} onFiles={handleFilesChange} disabled={!accessToken} />
      <Button
        className={cn(style.ButtonNext, '2xl:mt-auto')}
        onClick={handleNextClick}
        disabled={!accessToken}
      >
        <Typography variant="heading3" weight={550} color="white">
          {t('continue')}
        </Typography>
      </Button>
    </>
  );
};
