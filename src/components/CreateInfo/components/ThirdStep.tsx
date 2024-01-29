import { FC, useContext, useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Input from '@/ui/Input';
import Switch from '@/ui/Switch';
import Button from '@/ui/Button';
import { mergeStyles } from '@/helpers/mergeStyles';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { useCreatePost } from '@/api/posts/create-post';
import { IPostContactInfo } from '@/types/posts';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import StatusModal from '@/components/modals/StatusModal';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import style from '../style.module.scss';
import { thirdStepConfig } from '../config';

interface IProps {
  onStep: (direction: number) => void;
}

const ThirdStep: FC<IProps> = ({ onStep }) => {
  const [state] = useContext(CreatePostContext);
  const [modalType, setModalType] = useState('');
  const [errorText, setErrorText] = useState('');
  const { mutate: createPost, isLoading } = useCreatePost();
  const { push } = useRouter();
  const { t } = useTranslation();
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  const schema = z
    .object({
      phone: z.string().optional(),
      contactName: z.string({ required_error: t('error.required') }),
      additionalPhone: z.string().optional(),
      telegram: z.string().optional(),
      facebook: z.string().optional(),
      viber: z.string().optional(),
      whatsapp: z.string().optional(),
      isPhoneActive: z.boolean(),
      isAdditionalPhoneActive: z.boolean(),
      isTelegramActive: z.boolean(),
      isWhatsappActive: z.boolean(),
      isViberActive: z.boolean(),
      isFacebookActive: z.boolean(),
    })
    .superRefine((values, ctx) => {
      if (values.isPhoneActive) {
        if (!/\+995 \(\d{2}\) \d{3}-\d{2}-\d{2}/.test(values.phone ?? '')) {
          ctx.addIssue({
            code: 'custom',
            path: ['phone'],
            message: t('errors.phone'),
          });
        }
      }
      if (values.isAdditionalPhoneActive) {
        if (!/\+995 \(\d{2}\) \d{3}-\d{2}-\d{2}/.test(values.additionalPhone ?? '')) {
          ctx.addIssue({
            code: 'custom',
            path: ['additionalPhone'],
            message: t('errors.phone'),
          });
        }
      }
      if (
        [
          values.isAdditionalPhoneActive,
          values.isPhoneActive,
          values.isFacebookActive,
          values.isTelegramActive,
          values.isViberActive,
          values.isWhatsappActive,
        ].every((el) => !el)
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['phone'],
          message: t('errors.atleastOneContact'),
        });
      }
    });

  const { control, watch, handleSubmit, clearErrors, setValue } = useForm({
    defaultValues: {
      phone: state.phone,
      contactName: state.contactName,
      additionalPhone: state.additionalPhone,
      telegram: state.telegram,
      whatsapp: state.whatsApp,
      viber: state.viber,
      facebook: state.facebook,
      isPhoneActive: state.isPhoneActive,
      isAdditionalPhoneActive: false,
      isTelegramActive: false,
      isWhatsappActive: false,
      isViberActive: false,
      isFacebookActive: false,
    },
    resolver: zodResolver(schema),
    shouldFocusError: false,
    mode: 'all',
  });

  const formValues = watch();

  const handleBack = () => {
    onStep(-1);
  };

  useEffect(() => {
    if (!formValues.isAdditionalPhoneActive) {
      clearErrors('additionalPhone');
      setValue('additionalPhone', '');
    }
    if (!formValues.isPhoneActive) {
      clearErrors('phone');
      setValue('phone', '');
    }
  }, [formValues.isAdditionalPhoneActive, formValues.isPhoneActive]);

  const handlePost = () => {
    handleSubmit((values) => {
      const payload = new FormData();

      const dataToMap = { ...state, ...values };

      Object.keys(values).forEach((key) => {
        delete dataToMap[key as keyof typeof dataToMap];
      });

      Object.entries(dataToMap).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (key === 'files') {
            value.forEach((file) => {
              payload.append('images', file);
            });
          } else {
            payload.append(key, JSON.stringify(value));
          }
        } else if (typeof value === 'object') {
          payload.append(key, JSON.stringify(value));
        } else {
          value !== undefined && payload.append(key, `${value}`);
        }
      });

      const contacts: IPostContactInfo = {
        phone: values.phone,
        additionalPhone: values.additionalPhone,
        telegram: values.telegram,
        viber: values.viber,
        whatsApp: values.whatsapp,
        facebook: values.facebook,
        name: values.contactName,
        isPhoneActive: !values.phone ? false : values.isPhoneActive,
        isViberActive: !values.viber ? false : values.isViberActive,
        isAdditionalPhoneActive: !values.additionalPhone ? false : values.isAdditionalPhoneActive,
        isFacebookActive: !values.facebook ? false : values.isFacebookActive,
        isTelegramActive: !values.telegram ? false : values.isTelegramActive,
        isWhatsappActive: !values.whatsapp ? false : values.isWhatsappActive,
      };

      payload.append('contacts', JSON.stringify(contacts));
      payload.append('source', 'web');

      createPost(payload, {
        onSuccess: () => {
          push('/');
          toast.success(t('modals.post.createSuccessTitle'));
        },
        onError: (e) => {
          setModalType('error');
          setErrorText(
            `${e.response?.data.errors?.[0].field} ${e.response?.data.errors?.[0].message}`,
          );
        },
      });
    })();
  };

  return (
    <>
      {modalType && (
        <StatusModal
          title={
            modalType === 'error'
              ? t('modals.post.createErrorTitle')
              : t('modals.post.createSuccessTitle')
          }
          subtitle={(modalType === 'error' && errorText) || ''}
          type={modalType as 'error' | 'success'}
          isOpen={!!modalType}
          action={() => (modalType === 'error' ? setModalType('') : push('/'))}
        />
      )}
      <div className={style.back}>
        <button onClick={handleBack} className={cn(style['back-btn'], '2xl:!gap-[14px]')}>
          <HomeSvgSelector id="arrow-left" />
          <Typography variant="heading4">{t('back')}</Typography>
        </button>
      </div>
      <Typography variant="heading2">{t('post.howToContact')}</Typography>
      <div className={style.switchInput}>
        <Input
          controllerProps={{ name: 'phone', control }}
          leftElem={<HomeSvgSelector id="tube" />}
          className={cn(style.w85, '2xl:!w-full')}
          placeholder={t('inputs.phone')}
          disabled={!formValues.isPhoneActive}
          mask="phone"
        />
        <Switch controllerProps={{ name: 'isPhoneActive', control }} />
      </div>
      <Input controllerProps={{ name: 'contactName', control }} placeholder={t('inputs.name')} />
      <Typography variant="heading2">{t('profile.contactsTitle')}</Typography>
      {thirdStepConfig.map((item) => (
        <div className={style.switchInput} key={item.controller}>
          <Input
            controllerProps={{ name: item.controller, control }}
            leftElem={<HomeSvgSelector id={item.icon} />}
            className={mergeStyles(style.w100)}
            placeholder={t(item.placeholder)}
            disabled={!formValues[item.switch]}
            mask={item.mask}
          />
          <Switch controllerProps={{ name: item.switch, control }} />
        </div>
      ))}
      <Button
        className={cn(style.ButtonNext, '2xl:mt-auto')}
        onClick={isLaptop ? () => onStep(1) : handlePost}
        disabled={isLoading}
      >
        {isLaptop ? 'Продолжить' : t('post.post')}
      </Button>
    </>
  );
};

export default ThirdStep;
