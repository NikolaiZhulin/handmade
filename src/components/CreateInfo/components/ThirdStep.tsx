import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { useCreatePost } from '@/api/posts/create-post';
import StatusModal from '@/components/modals/StatusModal';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { IPostContactInfo } from '@/types/posts';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

import { thirdStepConfig } from '../config';
import style from '../style.module.scss';

interface IProps {
  onStep: (direction: number) => void;
}

const ThirdStep: FC<IProps> = ({ onStep }) => {
  const [state, setState] = useContext(CreatePostContext);
  const [modalType, setModalType] = useState('');
  const [errorText, setErrorText] = useState('');
  const { mutate: createPost, isLoading } = useCreatePost();
  const { push } = useRouter();
  const { t } = useTranslation();
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  const schema = z
    .object({
      phone: z.string({ required_error: t('errors.required') }),
      contactName: z.string({ required_error: t('errors.required') }),
      additionalPhone: z.string().optional(),
      telegram: z.string().optional(),
      facebook: z.string().optional(),
      viber: z.string().optional(),
      whatsApp: z.string().optional(),
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

  const { control, watch, getValues, handleSubmit } = useForm({
    defaultValues: {
      phone: state.contacts.phone,
      contactName: state.contacts.contactName,
      additionalPhone: state.contacts.additionalPhone,
      telegram: state.contacts.telegram,
      whatsApp: state.contacts.whatsApp,
      viber: state.contacts.viber,
      facebook: state.contacts.facebook,
      isPhoneActive: state.isPhoneActive,
      isAdditionalPhoneActive: Boolean(state.contacts.additionalPhone),
      isTelegramActive: Boolean(state.contacts.telegram),
      isWhatsappActive: Boolean(state.contacts.whatsApp),
      isViberActive: Boolean(state.contacts.viber),
      isFacebookActive: Boolean(state.contacts.facebook),
    },
    resolver: zodResolver(schema),
    shouldFocusError: false,
    mode: 'all',
  });

  const formValues = watch();

  const handleBack = () => {
    onStep(-1);
  };

  // useEffect(() => {
  //   if (!formValues.isAdditionalPhoneActive) {
  //     clearErrors('additionalPhone');
  //     setValue('additionalPhone', '');
  //   }
  //   if (!formValues.isPhoneActive) {
  //     clearErrors('phone');
  //     setValue('phone', '');
  //   }
  // }, [clearErrors, formValues.isAdditionalPhoneActive, formValues.isPhoneActive, setValue]);

  const handlePost = () => {
    handleSubmit((values) => {
      const payload = new FormData();

      const dataToMap = { ...state, ...values };

      const contacts: IPostContactInfo = {
        phone: values.phone,
        additionalPhone: values.additionalPhone,
        telegram: values.telegram,
        viber: values.viber,
        whatsApp: values.whatsApp,
        facebook: values.facebook,
        contactName: values.contactName,
        isPhoneActive: !values.phone ? false : values.isPhoneActive,
        isViberActive: !values.viber ? false : values.isViberActive,
        isAdditionalPhoneActive: !values.additionalPhone ? false : values.isAdditionalPhoneActive,
        isFacebookActive: !values.facebook ? false : values.isFacebookActive,
        isTelegramActive: !values.telegram ? false : values.isTelegramActive,
        isWhatsappActive: !values.whatsApp ? false : values.isWhatsappActive,
      };

      dataToMap.contacts = contacts;

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

  const handleMove = (direction: number) => () => {
    setState({ ...state, contacts: getValues() });
    onStep(direction);
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
      <div className="flex flex-col gap-[14px]">
        <div className={style.back}>
          <button onClick={handleBack} className={cn(style['back-btn'], '2xl:!gap-[14px]')}>
            <HomeSvgSelector id="arrow-left" />
            <Typography variant="heading3">{t('back')}</Typography>
          </button>
        </div>
        <Typography variant="heading2">{t('post.howToContact')}</Typography>
        <div className={style.switchInput}>
          <Input
            controllerProps={{ name: 'phone', control }}
            className={cn(style.w100, '2xl:!w-full')}
            placeholder={t('inputs.phone')}
            disabled={!formValues.isPhoneActive}
            mask="phone"
          />
        </div>
        <Input controllerProps={{ name: 'contactName', control }} placeholder={t('inputs.name')} />
        <div className={style.switchInput}>
          <Input
            controllerProps={{ name: thirdStepConfig[0].controller, control }}
            className={mergeStyles(style.w100)}
            placeholder={t(thirdStepConfig[0].placeholder)}
            // disabled={formValues[thirdStepConfig[0].switch]}
            mask={thirdStepConfig[0].mask}
          />
        </div>
        <Typography variant="heading2">{t('profile.contactsTitle')}</Typography>

        {thirdStepConfig.slice(1).map((item) => (
          <div className={style.switchInput} key={item.controller}>
            <Input
              controllerProps={{ name: item.controller, control }}
              leftElem={<HomeSvgSelector id={item.icon} />}
              className={mergeStyles(style.w100)}
              placeholder={t(item.placeholder)}
              // disabled={formValues[item.switch]}
              mask={item.mask}
            />
          </div>
        ))}
        <Button
          className={cn(style.ButtonNext, '2xl:mt-auto !w-full')}
          onClick={isLaptop ? handleMove(1) : handlePost}
          disabled={isLoading}
        >
          {isLaptop ? 'Продолжить' : t('post.post')}
        </Button>
      </div>
    </>
  );
};

export default ThirdStep;
