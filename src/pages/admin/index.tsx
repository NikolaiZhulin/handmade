import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import zod from 'zod';

import { useLogin } from '@/api/auth/login';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { UserContext } from '@/contexts/UserContext';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { getBackRuError } from '@/helpers/getBackRuError';
import { accessTokenService, refreshTokenService } from '@/helpers/tokens/tokenService';
import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/ui/Button';
import Checkbox from '@/ui/Checkbox';
import Input from '@/ui/Input';
import Typography from '@/ui/Typography';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { locale, defaultLocale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale ?? '', ['common'])),
    },
  };
};

const Page = () => {
  const { t } = useTranslation();
  const { mutate: login } = useLogin();
  const [, changeState] = useContext(UserContext);
  const { push } = useRouter();

  const schema = zod.object({
    email: zod.string().email(t('errors.wrongEmail')),
    password: zod.string().min(8, t('errors.passLenght')),
    rememberMe: zod.boolean(),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { defaultValues, isValid, isSubmitted },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const handleLogin = () => {
    handleSubmit((values) => {
      login(
        { email: values.email, password: values.password, isAdmin: true },
        {
          onSuccess: (data) => {
            accessTokenService.setToken({ token: data.auth.accessToken });
            refreshTokenService.setToken({ token: data.auth.refreshToken });
            if (values.rememberMe) {
              accessTokenCookie.create(data.auth.accessToken);
              refreshTokenCookie.create(data.auth.refreshToken);
            }
            changeState?.({ ...data.auth, ...data.user });
            push('/admin/dashboard');
          },
          onError: (error) => {
            getErrorToast(error);
            error.response?.data.errors?.forEach((err) => {
              const [key, value] = getBackRuError<typeof defaultValues>(
                err,
                'login',
                t,
                error.response?.status,
              );
              setError(key, { message: t(value) });
            });
          },
        },
      );
    })();
  };

  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen">
      <div className="p-[30px] w-[420px] flex flex-col gap-[14px] rounded-[12px] bg-white">
        {!isValid && isSubmitted && (
          <Typography className="text-center" color="red" variant="heading3">
            {t('errors.wrongLoginAndPass')}
          </Typography>
        )}
        <div className="flex items-center gap-[10px]">
          <HomeSvgSelector id="logo_admin" />
          <Typography variant="heading2">Admin</Typography>
        </div>
        <Input controllerProps={{ control, name: 'email' }} placeholder={t('inputs.login')} />
        <Input
          controllerProps={{ control, name: 'password' }}
          type="password"
          rightElem={(handler, type) => (
            <button onClick={handler}>
              <HomeSvgSelector id={type === 'password' ? 'peephole' : 'peephole_open'} />
            </button>
          )}
          placeholder={t('auth.password')}
        />
        <Checkbox controllerProps={{ control, name: 'rememberMe' }}>
          {t('auth.rememberMe')}
        </Checkbox>
        <Button fullWidth={true} onClick={handleLogin}>
          <Typography variant="heading3" color="white">
            {t('header.signIn')}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Page;
