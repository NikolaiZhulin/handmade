import { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import Input from '@/ui/Input';
import Heading5 from '@/ui/Heading5';
import Heading2 from '@/ui/Heading2';
import {
  CODE_LENGTH,
  CODE_LENGTH_VALUE,
  MIN_PASS_LENGTH,
  NEW_PASS_MATCH,
  PASS_LENGTH,
  WRONG_EMAIL,
} from '@/constants/texts/validations';
import { useRequestCode } from '@/api/auth/request-code';
import { CodeType } from '@/constants/enums';
import Button from '@/ui/Button';
import { AuthResponse } from '@/types/auth';
import { usePasswordRecovery } from '@/api/auth/restore-password';
import { UserContext } from '@/contexts/UserContext';
import { mergeStyles } from '@/helpers/mergeStyles';
import Typography from '@/ui/Typography';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ModalContext } from '@/contexts/ModalContext';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';
import { accessTokenService, refreshTokenService } from '@/helpers/tokens/tokenService';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';
import { THREE_MIN } from '../RegistrationForm';

import styles from './styles.module.scss';

interface IProps {
  onClose: () => void;
}

const schema = z
  .object({
    email: z.string().email(WRONG_EMAIL),
    confirmationCode: z
      .string()
      .min(CODE_LENGTH_VALUE, CODE_LENGTH)
      .max(CODE_LENGTH_VALUE, CODE_LENGTH),
    password: z.string().min(MIN_PASS_LENGTH, PASS_LENGTH),
    newPassword: z.string().min(MIN_PASS_LENGTH, PASS_LENGTH),
  })
  .refine((data) => data.password === data.newPassword, {
    message: NEW_PASS_MATCH,
    path: ['newPassword'],
  });

const RestorePasswordForm: FC<IProps> = ({ onClose }) => {
  const [code, setCode] = useState(1);
  const [, changeState] = useContext(UserContext);
  const isLaptop = useMediaQuery('(max-width: 1200px)');
  const [, setModal] = useContext(ModalContext);
  const { t } = useTranslation();
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [runningTime, setRunningTime] = useState(0);

  const {
    control,
    formState: {
      errors: { newPassword },
    },
    getValues,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: '',
      confirmationCode: '',
      password: '',
      newPassword: '',
      sameCode: false,
    },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const { confirmationCode, email: emailValue } = watch();

  const { mutate: requestCode } = useRequestCode(
    () => {},
    () => {
      setError('email', { message: 'Указанный email не существует' });
    },
  );
  const { mutate: changePassword } = usePasswordRecovery();

  const handleSuccessLogin = (data: AuthResponse) => {
    onClose();
    reset();
    changeState?.({ ...data.auth, ...data.user });
    accessTokenService.setToken({ token: data.auth.accessToken });
    refreshTokenService.setToken({ token: data.auth.refreshToken });
  };

  const handleRequestCode = () => {
    const { email } = getValues();
    clearErrors('email');
    setRunningTime(THREE_MIN);
    setIsTimeRunning(true);
    requestCode(
      { email, type: CodeType.FORGOT_PASSWORD },
      {
        onSuccess: (data) => {
          setCode(data);
          toast.success('Код отправлен');
        },
        onError: () => {
          setIsTimeRunning(false);
          setRunningTime(0);
        },
      },
    );
  };

  const handleChangePassword = () => {
    handleSubmit((values) => {
      changePassword(values, {
        onSuccess: (data) => {
          handleSuccessLogin(data);
          setCode(1);
          toast.warn('Пароль успешно обновлен', {
            className: 'w-[97vw]',
            position: 'top-left',
          });
        },
      });
    })();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimeRunning && runningTime > 0) {
      timer = setTimeout(() => {
        setRunningTime((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else {
      setIsTimeRunning(false);
      setRunningTime(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimeRunning, runningTime]);
  const currentWidth = (THREE_MIN - runningTime) * (100 / THREE_MIN);

  return (
    <>
      {isLaptop && (
        <button
          className="flex items-center gap-[14px] self-start -order-1"
          onClick={() => {
            setModal({ authModal: false });
            onClose();
          }}
        >
          <HomeSvgSelector id="arrow-left" />
          <Typography variant="heading3" className="xs:!text-[14px]">
            {t('back')}
          </Typography>
        </button>
      )}
      <div className={cn(styles.restorePasswordForm, '2xl:!w-[410px] xs:!w-full')}>
        <div className={styles.textWrapper}>
          <Heading2>{t('auth.restorePass')}</Heading2>
          <Heading5>{t('auth.emailBound')}</Heading5>
        </div>
        <Input
          className={styles.Input}
          controllerProps={{ name: 'email', control }}
          leftElem={<HomeSvgSelector id="mail" />}
          placeholder="Email"
          type="text"
        />
        <Input
          className={mergeStyles(styles.Input, '!pr-[4px]')}
          controllerProps={{ name: 'confirmationCode', control }}
          placeholder={t('auth.confirmationCode')}
          autoComplete="off"
          maxLength={4}
          rightElem={
            <Button
              disabled={!emailValue}
              onClick={handleRequestCode}
              className="-m-t-[10px] !h-[32px] relative overflow-hidden min-w-[122px]"
              color={isTimeRunning ? 'neutral' : 'blue'}
            >
              {isTimeRunning ? (
                <>
                  <div
                    style={{ backgroundColor: '#3875ea', width: `${currentWidth}%` }}
                    className="absolute left-0 top-0 flex items-center justify-center h-full z-0"
                  />
                  <div className="relative z-10 text-white">
                    {Math.floor(runningTime / 60)
                      .toString()
                      .padStart(2, '0')}
                    :{(runningTime % 60).toString().padStart(2, '0')}
                  </div>
                </>
              ) : (
                t('auth.sendCode')
              )}
            </Button>
          }
          type="text"
        />
        {+confirmationCode === +code && (
          <>
            <Heading2>Придумайте новый пароль</Heading2>
            <Input
              className={styles.Input}
              controllerProps={{ name: 'password', control }}
              placeholder={t('auth.createPassword')}
              type="password"
              rightElem={(handler) => (
                <button onClick={handler}>
                  <HomeSvgSelector id="peephole" />
                </button>
              )}
            />
            <Input
              className={styles.Input}
              controllerProps={{ name: 'newPassword', control }}
              placeholder={t('inputs.repeatPassword')}
              type="password"
              rightElem={(handler) => (
                <button onClick={handler}>
                  <HomeSvgSelector id="peephole" />
                </button>
              )}
            />
            <Button onClick={handleChangePassword} disabled={!!newPassword} className={styles.full}>
              {t('save')}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default RestorePasswordForm;
