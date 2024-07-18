import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useGetPostById } from '@/api/posts/post-by-id';
import { useUpdatePost } from '@/api/posts/update-post';
import { cities } from '@/constants/cities';
import { metals } from '@/constants/metals';
import { samples } from '@/constants/sample';
import { sexes } from '@/constants/sex';
import { stones } from '@/constants/stones';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslation } from '@/hooks/useTranslation';
import FlexContainer from '@/layout/FlexContainer';
import { IPostContactInfo } from '@/types/posts';
import Button from '@/ui/Button';
import Checkbox from '@/ui/Checkbox';
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

interface IProps {
  postId: string;
}

const PostEdit: FC<IProps> = ({ postId }) => {
  const router = useRouter();
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
      sex: post?.sex,
      size: post?.size,
      city: post?.city,
      sample: post?.sample,
      recommendations: post?.recommendations,
      requestCategories: post?.categories,
      material: post?.material,
      stone: post?.stone,
      address: post?.address,
      isJewelry: post?.isJewelry,
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

  const {
    currency,
    sex,
    stone,
    isJewelry,
    requestCategories,
    sample,
    material,
    city,
    ...formValues
  } = watch();

  const handleFilesChange = (files: (File | string)[]) => {
    setFiles(files);
    setIsActiveAfterImage(true);
  };

  const toggleEng = () => setIsEngShown((prev) => !prev);
  const toggleGe = () => setIsGeShown((prev) => !prev);

  const handleFieldChange =
    (key: keyof FormState, inArray = false) =>
    (newValue: string | boolean) => {
      if (typeof newValue === 'boolean') {
        setValue(key, newValue, { shouldTouch: true, shouldDirty: true });
      } else {
        setValue(key, inArray ? [newValue] : newValue, { shouldTouch: true, shouldDirty: true });
      }
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
        whatsApp,
        telegram,
        facebook,
        ...rest
      } = values;

      const contacts: IPostContactInfo = {
        phone,
        additionalPhone,
        telegram,
        viber,
        whatsApp: whatsApp,
        facebook,
        contactName: contactName,
        isPhoneActive: !phone ? false : isPhoneActive,
        isViberActive: !viber ? false : isViberActive,
        isAdditionalPhoneActive: !additionalPhone ? false : isAdditionalPhoneActive,
        isFacebookActive: !facebook ? false : isFacebookActive,
        isTelegramActive: !telegram ? false : isTelegramActive,
        isWhatsappActive: !whatsApp ? false : isWhatsappActive,
      };

      const formData = new FormData();

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
    router.push('/');
  };

  const handleCategoriesValue = (newValue: string) => {
    handleFieldChange('requestCategories', true)(newValue);
  };

  const handleMetalValue = (newValue: string) => {
    handleFieldChange('material')(newValue);
  };

  const handleCityValue = (newValue: string) => {
    handleFieldChange('city')(newValue);
  };

  const handleSamplesValue = (newValue: string) => {
    handleFieldChange('sample')(newValue);
  };
  const handleStoneValue = (newValue: string) => {
    handleFieldChange('stone')(newValue);
  };
  const setIsJewelry = (isActive: boolean) => () => {
    const value = !isActive;
    handleFieldChange('isJewelry')(value);
  };

  const handleSelectChange = (value: string) => {
    handleFieldChange('sex')(value);
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
                placeholder={t('inputs.product')}
                onSelect={handleCategoriesValue}
                value={categories.find((el) => requestCategories?.includes(el.value))}
              />
            </div>
            <div className="pt-2">
              <Select
                withTranslate={true}
                options={metals}
                placeholder={t('inputs.metal')}
                onSelect={handleMetalValue}
                value={metals.find((el) => material === el.value)}
              />
            </div>
            <div className="pt-2">
              <Select
                withTranslate={true}
                options={samples}
                placeholder={t('sample')}
                onSelect={handleSamplesValue}
                value={samples.find((el) => sample?.includes(el.value))}
              />
            </div>
            <div className="pt-2">
              <Select
                withTranslate={true}
                options={stones}
                placeholder={t('stone')}
                onSelect={handleStoneValue}
                value={stones.find((el) => stone?.includes(el.value))}
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
              <Select
                withTranslate={true}
                options={cities}
                placeholder={t('inputs.city')}
                onSelect={handleCityValue}
                value={cities.find((el) => city?.includes(el.value))}
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
            defaultValue={!isJewelry}
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
              leftElem={<HomeSvgSelector id="phone-icon" />}
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
                // disabled={!formValues[item.switch] && !!formValues[item.controller]}
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
