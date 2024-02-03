import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useGetPostById } from '@/api/posts/post-by-id';
import { useUpdatePost } from '@/api/posts/update-post';
import { cities } from '@/constants/cities';
import { post as postConfig } from '@/constants/post.common';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslation } from '@/hooks/useTranslation';
import FlexContainer from '@/layout/FlexContainer';
import { IPostContactInfo } from '@/types/posts';
import Button from '@/ui/Button';
import Select from '@/ui/CustomSelect';
import Input from '@/ui/Input';
import InputImages from '@/ui/InputImages';
import Switch from '@/ui/Switch';
import Textarea from '@/ui/Textarea';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

import { CURRENCY_MAP, thirdStepConfig } from '../CreateInfo/config';
import SliderButton from '../SliderButton';
import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import styles from './styles.module.scss';
import { FormState, schema, setDefaultValues } from './utils';
import { sexes } from '@/constants/sex';
import Checkbox from '@/ui/Checkbox';
import { metals } from '@/constants/metals';
import { samples } from '@/constants/sample';
import { stones } from '@/constants/stones';
import { CreatePostContext } from '@/contexts/CreatePostContext';

interface IProps {
  postId: string;
}

const PostEdit: FC<IProps> = ({ postId }) => {
  const { data: post, refetch } = useGetPostById(postId);
  const { mutate: updatePost } = useUpdatePost(() => {
    refetch();
    toast.success(t('post.postUpdated'));
  }, getErrorToast);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const categories = useGetCategoriesForSelect('leftIcon');
  const [state, setState] = useContext(CreatePostContext);

  const [isEngShown, setIsEngShown] = useState(!!post?.textEn);
  const [isGeShown, setIsGeShown] = useState(!!post?.textGe);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [isActiveAfterImage, setIsActiveAfterImage] = useState(false);
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  useEffect(() => {
    if (post && post.images.length) {
      setFiles(post.images);
    }
  }, [post]);

  const { control, setValue, handleSubmit, watch, reset, formState } = useForm<FormState>({
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

  useEffect(() => {
    if (!isGeShown) {
      setValue('textGe', '');
    }

    if (!isEngShown) {
      setValue('textEn', '');
    }
  }, [isGeShown, isEngShown]);

  useEffect(() => {
    if (post) {
      setDefaultValues(post, reset, language);
    }
  }, [post]);

  const { currency, isJewelry, sex, isUsed, usedPeriod, city, requestCategories, ...formValues } =
    watch();

  const handleFilesChange = (files: (File | string)[]) => {
    setFiles(files);
    setIsActiveAfterImage(true);
  };

  const toggleEng = () => setIsEngShown((prev) => !prev);
  const toggleGe = () => setIsGeShown((prev) => !prev);
  const handleUsedChange = (value: boolean) => () =>
    setValue('isUsed', !value, { shouldTouch: true, shouldDirty: true });

  const handleFieldChange =
    (key: keyof FormState, inArray = false) =>
    (newValue: string) => {
      setValue(key, inArray ? [newValue] : newValue, { shouldTouch: true, shouldDirty: true });
    };

  const handleSave = () => {
    handleSubmit((values) => {
      const {
        isPhoneActive,
        isViberActive,
        isAdditionalPhoneActive,
        isFacebookActive,
        isTelegramActive,
        isWhatsappActive,
        contactName,
        phone,
        additionalPhone,
        viber,
        whatsapp,
        telegram,
        facebook,
        ...rest
      } = values;

      const contacts: IPostContactInfo = {
        phone,
        additionalPhone,
        telegram,
        viber,
        whatsApp: whatsapp,
        facebook,
        name: contactName,
        isPhoneActive: !phone ? false : isPhoneActive,
        isViberActive: !viber ? false : isViberActive,
        isAdditionalPhoneActive: !additionalPhone ? false : isAdditionalPhoneActive,
        isFacebookActive: !facebook ? false : isFacebookActive,
        isTelegramActive: !telegram ? false : isTelegramActive,
        isWhatsappActive: !whatsapp ? false : isWhatsappActive,
      };

      const formData = new FormData();
      console.log('formData', formData);

      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && formState.dirtyFields[key as keyof FormState]) {
          formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value.toString());
        }
      });
      formData.append('contacts', JSON.stringify(contacts));

      const imagesToDelete =
        post?.images.length !== files.length
          ? post?.images.filter((el) => !files.includes(el))
          : [];

      formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

      if (post?.images[0] !== files[0] && typeof files[0] === 'string') {
        formData.append('replaceMainImage', files[0]);
      }

      files.filter((el) => el instanceof File).forEach((file) => formData.append('images', file));

      updatePost({ id: post?.id ?? '', data: formData });
    })();
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
    if (Array.isArray(value)) {
      console.log('value', value);

      setValue('sex', value);
      return;
    }
  };

  return (
    <FlexContainer className={cn(styles.w100, '2xl:flex-col')} align="start" gap={30}>
      <FlexContainer direction="column" align="start" className={cn(styles.w50, '2xl:!w-full')}>
        <Typography variant="heading2" weight={700} className={styles.mb22}>
          {t('post.edditing')}
        </Typography>
        <FlexContainer direction="column" align="start" gap={16} className="2xl:!w-full">
          <Input
            controllerProps={{ name: 'name', control }}
            placeholder={t('inputs.postName')}
            className={styles.w100}
          />
          <Textarea
            controllerProps={{ name: 'textRu', control }}
            placeholder={t('inputs.postDescription')}
          />
          <Typography variant="heading3" color="gray">
            {t('post.translateInfo')}
          </Typography>
          <Button className={cn(styles.Button, '!w-full')} fullWidth={true} onClick={toggleGe}>
            {t('post.textGe')}
          </Button>
          {isGeShown && (
            <Textarea
              controllerProps={{ name: 'textGe', control }}
              placeholder={t('inputs.postDescription')}
            />
          )}
          <Button className={cn(styles.Button, '!w-full')} fullWidth={true} onClick={toggleEng}>
            {t('post.textEn')}
          </Button>
          {isEngShown && (
            <Textarea
              controllerProps={{ name: 'textEn', control }}
              placeholder={t('inputs.postDescription')}
            />
          )}
          <FlexContainer className={styles.w100} gap={8}>
            <Input
              controllerProps={{ name: 'price', control }}
              placeholder={t('price')}
              className="w-Full"
            />
            <Select
              containerClassname="w-[150px]"
              options={CURRENCY_MAP}
              placeholder={t('currency')}
              valueWithIcon={true}
              showOnlyIcon={true}
              onSelect={handleFieldChange('currency')}
              value={CURRENCY_MAP.find((el) => el.value === currency)}
            />
          </FlexContainer>
          <InputImages className={styles.w100} initialFiles={files} onFiles={handleFilesChange} />
          <div className="flex flex-col gap-2 w-full">
            <div className="pt-2">
              <Select
                options={categories}
                placeholder={t('inputs.jewel')}
                onSelect={handleCategoriesValue}
                value={categories.find((el) => requestCategories?.includes(el.value))}
              />
            </div>
            <div className="pt-2">
              <Select
                withTranslate={true}
                options={metals}
                placeholder={t('inputs.metal')}
                onSelect={handleCityValue}
                value={metals.find((el) => requestCategories?.includes(el.value))}
              />
            </div>
            <div className="pt-2">
              <Select
                withTranslate={true}
                options={samples}
                placeholder={t('inputs.sample')}
                onSelect={handleSamplesValue}
                value={samples.find((el) => requestCategories?.includes(el.value))}
              />
            </div>
            <div className="pt-2">
              <Select
                withTranslate={true}
                options={stones}
                placeholder={t('inputs.stone')}
                onSelect={handleStoneValue}
                value={stones.find((el) => requestCategories?.includes(el.value))}
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
              <Select
                withTranslate={true}
                options={cities}
                placeholder={t('inputs.city')}
                onSelect={handleCityValue}
                value={cities.find((el) => requestCategories?.includes(el.value))}
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
          {!isLaptop && (
            <Button
              fullWidth={true}
              onClick={handleSave}
              disabled={
                !formState.isDirty &&
                Object.values(formState.touchedFields).every((el) => !el) &&
                !isActiveAfterImage
              }
            >
              {t('save')}
            </Button>
          )}
        </FlexContainer>
      </FlexContainer>
      <FlexContainer
        direction="column"
        align="start"
        justify="start"
        className={cn(styles.w50, '2xl:!w-full')}
      >
        <Typography variant="heading2" weight={700} className={styles.mb22}>
          {t('post.contacts')}
        </Typography>
        <FlexContainer direction="column" align="start" gap={16} className={styles.w100}>
          <FlexContainer gap={8} className={styles.w100}>
            <Input
              controllerProps={{ name: 'phone', control }}
              leftElem={<HomeSvgSelector id="tube" />}
              className={mergeStyles(styles.w100)}
              placeholder={t('inputs.phone')}
              disabled={!formValues.isPhoneActive}
            />
            <Switch controllerProps={{ name: 'isPhoneActive', control }} />
          </FlexContainer>
          <Input
            controllerProps={{ name: 'contactName', control }}
            className={mergeStyles(styles.w100)}
            placeholder={t('inputs.name')}
          />
          {thirdStepConfig.map((item) => (
            <FlexContainer gap={8} align="center" key={item.controller} className={styles.w100}>
              <Input
                controllerProps={{ name: item.controller, control }}
                leftElem={<HomeSvgSelector id={item.icon} />}
                className={mergeStyles(styles.w100)}
                placeholder={t(item.placeholder)}
                disabled={!formValues[item.switch] && !!formValues[item.controller]}
              />
            </FlexContainer>
          ))}
        </FlexContainer>
      </FlexContainer>
      {isLaptop && (
        <Button
          fullWidth={true}
          onClick={handleSave}
          disabled={
            !formState.isDirty &&
            Object.values(formState.touchedFields).every((el) => !el) &&
            !isActiveAfterImage
          }
        >
          {t('save')}
        </Button>
      )}
    </FlexContainer>
  );
};

export default PostEdit;
