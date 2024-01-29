import { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useRequestCode } from '@/api/auth/request-code';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import { CODE_LENGTH_VALUE } from '@/constants/texts/validations';
import { useSignUp } from '@/api/auth/sign-up';
import { accessTokenService, refreshTokenService } from '@/helpers/tokens/tokenService';
import { UserContext } from '@/contexts/UserContext';
import { CodeType } from '@/constants/enums';
import { AuthResponse, CallModalChange } from '@/types/auth';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ModalContext } from '@/contexts/ModalContext';
import SocialContainer from '@/components/SocialContainer';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';

export const THREE_MIN = 180;

interface IProps {
  onClose: () => void;
  onModalChange?: CallModalChange;
  hideBackButton?: boolean;
}

const RegistrationForm: FC<IProps> = ({ onClose, onModalChange, hideBackButton }) => {
  const { t } = useTranslation();
  const { mutate: requestCode } = useRequestCode(() => {
    toast.success(t('toasts.codeSent'));
  });
  const { mutate: signUp } = useSignUp();
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [runningTime, setRunningTime] = useState(0);
  const [, changeState] = useContext(UserContext);
  const isLaptop = useMediaQuery('(max-width: 1200px)');
  const [, setModal] = useContext(ModalContext);
  const { query, push } = useRouter();

  const signUpSchema = zod.object({
    email: zod.string().email(t('errors.wrongEmail')),
    confirmationCode: zod
      .string()
      .min(CODE_LENGTH_VALUE, t('errors.codeLenght'))
      .max(CODE_LENGTH_VALUE, t('errors.codeLenght')),
    password: zod.string().min(8, t('errors.passLenght')),
  });
  const {
    control,
    formState: { isValid },
    watch,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: { email: '', confirmationCode: '', password: '' },
    resolver: zodResolver(signUpSchema),
    mode: 'all',
  });

  const email = watch('email');

  const handleRequestCode = () => {
    const { email } = getValues();
    setRunningTime(THREE_MIN);
    setIsTimeRunning(true);
    requestCode(
      { email, type: CodeType.SIGN_UP },
      {
        onError: () => {
          setIsTimeRunning(false);
          setRunningTime(0);
        },
      },
    );
  };

  const handleSuccessSignUp = (data: AuthResponse) => {
    onClose();
    accessTokenService.setToken({ token: data.auth.accessToken });
    refreshTokenService.setToken({ token: data.auth.refreshToken });
    changeState?.({ ...data.auth, ...data.user });
    if (query.action) {
      push(`/${query.action}`);
    }
  };

  const handleSignUp = () => {
    handleSubmit((values) => {
      signUp(values, { onSuccess: handleSuccessSignUp });
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
      {/*{isLaptop && !hideBackButton && (*/}
      {/*  <button*/}
      {/*    className="flex items-center gap-[14px] self-start -order-1"*/}
      {/*    onClick={() => {*/}
      {/*      setModal({ authModal: false });*/}
      {/*      onClose();*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <HomeSvgSelector id="arrow-left" />*/}
      {/*    <Typography variant="heading3" className="xs:!text-[14px]">*/}
      {/*      {t('back')}*/}
      {/*    </Typography>*/}
      {/*  </button>*/}
      {/*)}*/}
      <Typography variant={'text2'} color={'black'}>
        {t('auth.registration_sms_info')}
      </Typography>
      <div className={cn(style.RegistrationForm, 'xs:!w-full', hideBackButton && 'xs:!w-full')}>
        <Input
          className={cn(style.Input)}
          controllerProps={{ name: 'email', control }}
          leftElem={<HomeSvgSelector id="phone-icon" />}
          placeholder={t('auth.phone_placeholder')}
          type="text"
        />
        <Input
          className={cn(style.Input)}
          controllerProps={{ name: 'confirmationCode', control }}
          placeholder={t('auth.confirmationCode')}
          maxLength={4}
          autoComplete="off"
          rightElem={
            <Button
              disabled={!email}
              onClick={handleRequestCode}
              className={style.ButtonSendSms}
              // color={isTimeRunning ? 'neutral' : 'blue'}
              color={'gold'}
            >
              {isTimeRunning ? (
                <>
                  <div
                    style={{ backgroundColor: '#435894', width: `${currentWidth}%` }}
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
          type="number"
        />
        <Input
          className={cn(style.Input)}
          controllerProps={{ name: 'password', control }}
          rightElem={(handler, type) => (
            <button onClick={handler}>
              <HomeSvgSelector id={type === 'password' ? 'peephole' : 'peephole_open'} />
            </button>
          )}
          placeholder={t('auth.createPassword')}
          type="password"
        />
        <Button onClick={handleSignUp} className={cn(style.Button)} disabled={!isValid}>
          {t('auth.signUp')}
        </Button>
        {isValid && (
          <Typography variant={'text3'} className="text-center">
            {t('auth.registration_conditions')}
          </Typography>
        )}
        <Typography variant={'heading3'} className="text-center">
          {t('auth.socialSignIn')}
        </Typography>
        <SocialContainer />

        {/*<Typography*/}
        {/*  variant="heading3"*/}
        {/*  className={cn(style.Heading5, '2xl:order-9 2xl:mb-[28px]', hideBackButton && '2xl:mb-0')}*/}
        {/*>*/}
        {/*  {t('auth.acceptRules1')} <a href="#">«{t('auth.acceptRules2')}»</a>*/}
        {/*</Typography>*/}
        {/* <Typography
          variant={isLaptop ? 'heading2' : 'heading4'}
          className={cn(style.Heading4, isLaptop && 'order-1')}
        >
          {isLaptop
            ? capitalize(t('auth.oneClick').split(' ').slice(1).join(' '))
            : t('auth.oneClick')}
        </Typography> */}
        {/*{isLaptop && !hideBackButton && (*/}
        {/*  <>*/}
        {/*    <div className="h-[1px] w-full bg-light-gray order-3" />*/}
        {/*    <div className="h-[1px] w-full bg-light-gray order-10" />*/}
        {/*    /!* <Typography variant="heading2" className={cn(style.Heading4, isLaptop && 'order-4')}>*/}
        {/*      {t('auth.phone')}*/}
        {/*    </Typography> *!/*/}
        {/*    <div className="flex flex-col order-11 gap-[14px] items-center">*/}
        {/*      <Typography variant="heading2">{t('auth.alreadyHave')}</Typography>*/}
        {/*      <button*/}
        {/*        onClick={onModalChange?.(true)}*/}
        {/*        className="font-helvetica text-text-gray underline text-[14px] leading-[18px]"*/}
        {/*      >*/}
        {/*        {t('header.signIn')}*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </>*/}
        {/*)}*/}
        {/* <SocialContainer className="2xl:order-2" /> */}
      </div>
    </>
  );
};

export default RegistrationForm;
