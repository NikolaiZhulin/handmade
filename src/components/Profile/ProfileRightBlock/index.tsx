import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { GET_ME_QUERY, useGetMe } from '@/api/auth/get-me';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';
import FlexContainer from '@/layout/FlexContainer';
import Input from '@/ui/Input';
import { useUpdateProfile } from '@/api/profile/update-profile';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { useDeleteProfile } from '@/api/profile/delete-profile';
import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';
import { useTranslation } from '@/hooks/useTranslation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/utils';
import { getCreatedAtDatePhrase } from '@/helpers/getTime';
import Button from '@/ui/Button';
import Modal from '@/components/modals/Modal';

import NameBlock from '../components/NameBlock';

import ImageLoader from './components/ImageLoader';
import { FIRST_INPUT_BLOCK, SECOND_INPUT_BLOCK, THIRD_INPUT_BLOCK } from './config';
import styles from './styles.module.scss';

const ProfileRightBlock: FC = () => {
  const [file, setFile] = useState<File>();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState('');
  const { t } = useTranslation();
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  const schema = z
    .object({
      name: z.string({ required_error: t('errors.required') }),
      phone: z.string(),
      city: z.string(),
      password: z.string(),
      newPassword: z.string(),
      repeatPassword: z.string(),
      viber: z.string(),
      additionalPhone: z.string(),
      telegram: z.string(),
      whatsApp: z.string(),
      facebook: z.string(),
    })
    .superRefine(({ newPassword, repeatPassword, password }, cxt) => {
      if (newPassword !== repeatPassword) {
        cxt.addIssue({
          code: 'custom',
          message: t('errors.passwordEqual'),
          path: ['repeatPassword'],
        });
      }
      if (newPassword === password && newPassword) {
        cxt.addIssue({
          code: 'custom',
          message: t('errors.passwordDifference'),
          path: ['newPassword'],
        });
      }
    });
  const { push } = useRouter();

  const { data: me, refetch } = useGetMe();
  const { mutate: updateProfile } = useUpdateProfile(() => {
    refetch();
    toast.success(t('toasts.dataUpdated'));
    queryClient.invalidateQueries([GET_ME_QUERY]);
  }, getErrorToast);
  const { mutate: deleteProfile } = useDeleteProfile(() => {
    push('/');
    toast.success(t('toast.profileDelete'));
    accessTokenCookie.remove();
    refreshTokenCookie.remove();
  }, getErrorToast);

  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      name: me?.name ?? '',
      phone: me?.phone ?? '',
      city: me?.city ?? '',
      password: '',
      newPassword: '',
      repeatPassword: '',
      additionalPhone: me?.additionalPhone ?? '',
      telegram: me?.telegram ?? '',
      whatsapp: me?.whatsApp ?? '',
      viber: me?.viber ?? '',
      facebook: me?.facebook ?? '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (me) {
      reset({ ...me });
    }
  }, [me]);

  const onFileChange = (file?: File) => {
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
    }
  };

  const handleSubmitClick = () => {
    handleSubmit((values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (formState.dirtyFields[key as keyof typeof formState.defaultValues] && value) {
          formData.append(key, value);
        }
      });

      if (file) {
        formData.append('images', file);
      }

      updateProfile(formData);
    })();
  };

  const Contacts = ({ className }: { className?: string }) => (
    <FlexContainer direction="column" gap={14} align="start" className={cn(styles.w50, className)}>
      <Typography variant="heading2">{t('profile.contactsTitle')}</Typography>
      {THIRD_INPUT_BLOCK.map((item) => (
        <Input
          controllerProps={{
            control,
            name: item.name as keyof typeof formState.defaultValues,
          }}
          placeholder={t(item.placeholder)}
          leftElem={item.icon && <HomeSvgSelector id={item.icon} />}
          className={styles.w100}
          key={item.name}
        />
      ))}
    </FlexContainer>
  );

  return (
    <FlexContainer gap={30} align="start" className="2xl:!w-full">
      <FlexContainer
        gap={14}
        direction="column"
        align="start"
        className={cn(styles.w50, '2xl:!w-full')}
      >
        <NameBlock
          name={me?.name ?? 'U'}
          subtext={`${t('profile.registered')} ${getCreatedAtDatePhrase(me?.createdAt ?? '', t)}`}
          image={me?.image}
          preview={preview}
        />
        <ImageLoader label={t('profile.loadImage')} onChange={onFileChange} />
        <Typography variant="heading2">{t('profile.mainInfo')}</Typography>
        {FIRST_INPUT_BLOCK.map((item) => (
          <Input
            controllerProps={{
              control,
              name: item.name as keyof typeof formState.defaultValues,
            }}
            placeholder={t(item.placeholder)}
            leftElem={item.icon && <HomeSvgSelector id={item.icon} />}
            className={styles.w100}
            key={item.name}
          />
        ))}
        {isLaptop && <Contacts className="2xl:!w-full" />}
        <Typography variant="heading2">{t('profile.changePassTitle')}</Typography>
        {SECOND_INPUT_BLOCK.map((item) => (
          <Input
            controllerProps={{
              control,
              name: item.name as keyof typeof formState.defaultValues,
            }}
            placeholder={t(item.placeholder)}
            rightElem={(handler, type) => (
              <button onClick={handler}>
                <HomeSvgSelector id={type === 'password' ? item.icon : 'peephole_open'} />
              </button>
            )}
            className={styles.w100}
            key={item.name}
            type="password"
          />
        ))}
        <Button
          fullWidth={true}
          onClick={handleSubmitClick}
          disabled={Object.values(formState.dirtyFields).every((el) => !el) && !file}
        >
          <Typography variant="heading3" weight={550} color="white">
            {t('save')}
          </Typography>
        </Button>
        <Modal
          trigger={
            <Button fullWidth={true} color="neutral">
              <HomeSvgSelector id="trashcan" />
              <Typography variant="heading4" color="gray">
                {t('profile.delete')}
              </Typography>
            </Button>
          }
          triggerClassName="w-full"
          header={t('profile.deleteWarn1')}
          dialogClassName="max-w-[420px] gap-2 xs:w-[calc(100%-40px)] xs:rounded-[12px]"
          subheader={t('profile.deleteWarn2')}
          confirmHandler={() => deleteProfile()}
        />
      </FlexContainer>
      {!isLaptop && <Contacts />}
    </FlexContainer>
  );
};

export default ProfileRightBlock;
