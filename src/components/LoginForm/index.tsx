import { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import Input from '@/ui/Input';
import Checkbox from '@/ui/Checkbox';
import Button from '@/ui/Button';
import { useLogin } from '@/api/auth/login';
import { getBackRuError } from '@/helpers/getBackRuError';
import { accessTokenService, refreshTokenService } from '@/helpers/tokens/tokenService';
import { UserContext } from '@/contexts/UserContext';
import { AuthResponse, CallModalChange } from '@/types/auth';
import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';
import { MY_FAVOURITE_POSTS } from '@/api/posts/get-favourite';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';
import SocialContainer from '../SocialContainer';

import styles from './styles.module.scss';

interface IProps {
  onClose: () => void;
  changeModal?: CallModalChange;
  successAction?: () => void;
  hideBackButton?: boolean;
  setModalError?: (error?: string) => void;
}

const LoginForm: FC<IProps> = ({
  onClose,
  changeModal,
  setModalError,
  successAction,
  hideBackButton,
}) => {
  const { t } = useTranslation();
  const loginSchema = zod.object({
    email: zod.string().email(t('errors.wrongEmail')),
    password: zod.string().min(8, t('errors.passLenght')),
    checked: zod.boolean(),
  });
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { defaultValues, errors },
    watch,
  } = useForm({
    defaultValues: { email: '', password: '', checked: false },
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });
  const queryClient = useQueryClient();
  const { mutate: handleLogin } = useLogin();
  const [, changeState] = useContext(UserContext);
  // const isLaptop = useMediaQuery('(max-width: 1200px)');
  // const [, setModal] = useContext(ModalContext);
  const { query, push } = useRouter();

  const checked = watch('checked');

  const handleSuccessLogin = (data: AuthResponse) => {
    onClose();
    reset();
    accessTokenService.setToken({ token: data.auth.accessToken });
    refreshTokenService.setToken({ token: data.auth.refreshToken });
    if (checked) {
      accessTokenCookie.create(data.auth.accessToken);
      refreshTokenCookie.create(data.auth.refreshToken);
    }
    changeState?.({ ...data.auth, ...data.user });
    queryClient.invalidateQueries([MY_FAVOURITE_POSTS]);
    successAction?.();
    if (query.action) {
      push(`/${query.action}`);
    }
  };

  const handleLoginClick = () => {
    handleSubmit((values) => {
      handleLogin(values, {
        onSuccess: handleSuccessLogin,
        onError: (error) => {
          error.response?.data.errors?.forEach((err) => {
            const [key, value] = getBackRuError<typeof defaultValues>(
              err,
              'login',
              t,
              error.response?.status,
            );
            setError(key, { message: value });
            setModalError?.(value);
          });
        },
      });
    })();
  };

  return (
    <>
      <div
        className={cn(
          styles.loginForm,
          'xs:items-center xs:!w-full',
          hideBackButton && '2xl:!w-full',
        )}
      >
        <Input
          className={cn(styles.Input, '2xl:w-full')}
          controllerProps={{ name: 'email', control }}
          leftElem={<HomeSvgSelector id="mail" />}
          placeholder="Email"
          type="text"
        />
        <Input
          className={cn(styles.Input, '2xl:w-full')}
          controllerProps={{ name: 'password', control }}
          rightElem={(handler, type) => (
            <button onClick={handler}>
              <HomeSvgSelector id={type === 'password' ? 'peephole' : 'peephole_open'} />
            </button>
          )}
          placeholder={t('auth.password')}
          type="password"
        />
        <div className={cn(styles.checkboxWrapper, '2xl:w-full')}>
          <Checkbox controllerProps={{ name: 'checked', control }} id="login">
            {t('auth.rememberMe')}
          </Checkbox>
        </div>
        <Button
          className={cn(styles.Button, !hideBackButton && 'xs:mb-[14px]')}
          onClick={handleLoginClick}
          disabled={Object.keys(errors).length > 0}
        >
          {t('header.signIn')}
        </Button>
        <Typography variant={'heading3'} className="text-center">
          {t('auth.socialSignIn')}
        </Typography>
        <SocialContainer />
        <button onClick={changeModal?.(null)} className={styles.linkButton}>
          {t('auth.forgotPass')}
        </button>
      </div>
    </>
  );
};

export default LoginForm;
