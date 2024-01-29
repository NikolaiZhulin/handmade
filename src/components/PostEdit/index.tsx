import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import FlexContainer from '@/layout/FlexContainer';
import Input from '@/ui/Input';
import Textarea from '@/ui/Textarea';
import Typography from '@/ui/Typography';
import InputImages from '@/ui/InputImages';
import Button from '@/ui/Button';
import { post as postConfig } from '@/constants/post.common';
import { useGetPostById } from '@/api/posts/post-by-id';
import { cities } from '@/constants/cities';
import { mergeStyles } from '@/helpers/mergeStyles';
import Switch from '@/ui/Switch';
import { IPostContactInfo } from '@/types/posts';
import { useUpdatePost } from '@/api/posts/update-post';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { useTranslation } from '@/hooks/useTranslation';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import Select from '@/ui/CustomSelect';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import SliderButton from '../SliderButton';
import { CURRENCY_MAP, thirdStepConfig } from '../CreateInfo/config';
import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import styles from './styles.module.scss';
import { FormState, schema, setDefaultValues } from './utils';

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

  const { currency, isUsed, usedPeriod, city, requestCategories, ...formValues } = watch();

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
          <Typography variant="heading4">{t('post.translateInfo')}</Typography>
          <Button fullWidth={true} color="neutral" onClick={toggleGe}>
            <HomeSvgSelector id="ge" />
            <Typography variant="heading3" color="black">
              {t('post.textGe')}
            </Typography>
          </Button>
          {isGeShown && (
            <Textarea
              controllerProps={{ name: 'textGe', control }}
              placeholder={t('inputs.postDescription')}
            />
          )}
          <Button fullWidth={true} color="neutral" onClick={toggleEng}>
            <HomeSvgSelector id="en" />
            <Typography variant="heading3" color="black">
              {t('post.textEn')}
            </Typography>
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
          <Select
            options={categories}
            placeholder={t('inputs.category')}
            onSelect={handleFieldChange('requestCategories', true)}
            value={categories.find((el) => requestCategories?.includes(el.value))}
          />
          <Select
            withTranslate={true}
            options={cities}
            placeholder={t('inputs.city')}
            onSelect={handleFieldChange('city')}
            value={cities.find((el) => el.value === city)}
          />
          <SliderButton
            leftText={t('post.used')}
            rightText={t('post.new')}
            variant="green"
            onClick={handleUsedChange}
            className={styles.w100}
            defaultValue={!isUsed}
          />
          {isUsed && (
            <FlexContainer gap={8} className="w-full">
              <Input
                controllerProps={{ name: 'usedAmount', control }}
                type="number"
                className="w-full"
                placeholder={t('inputs.usedPeriod')}
              />
              <Select
                withTranslate={true}
                containerClassname="w-[150px]"
                options={postConfig.usedPeriod}
                placeholder={t('inputs.period')}
                onSelect={handleFieldChange('usedPeriod')}
                value={postConfig.usedPeriod.find((el) => el.value === usedPeriod)}
              />
            </FlexContainer>
          )}
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
              <Switch controllerProps={{ name: item.switch, control }} />
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
