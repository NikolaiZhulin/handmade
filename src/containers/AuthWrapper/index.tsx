import { FC, ReactNode, useEffect, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

import AuthorizationFormButton from '@/components/SliderButton';
import RegistrationForm from '@/components/RegistrationForm';
import LoginForm from '@/components/LoginForm';
import { AuthFormType } from '@/constants/enums';
import RestorePasswordForm from '@/components/RestorePasswordForm';
import { CallModalChange } from '@/types/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/utils';
import Typography from '@/ui/Typography';

import styles from './styles.module.scss';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  title?: ReactNode;
  defaultState?: AuthFormType;
  successAction?: () => void;
  keepButton?: boolean;
  hideBackButton?: boolean;
  className?: string;
}

const Forms: Record<
  AuthFormType,
  (
    onClose: () => void,
    options: {
      callModalChange?: CallModalChange;
      successAction?: () => void;
      hideBackButton?: boolean;
      setError?: (error?: string) => void;
    },
  ) => JSX.Element
> = {
  registration: (onClose, options) => (
    <RegistrationForm
      onClose={onClose}
      onModalChange={options.callModalChange}
      hideBackButton={options.hideBackButton}
    />
  ),
  login: (onClose, options) => (
    <LoginForm
      onClose={onClose}
      changeModal={options.callModalChange}
      successAction={options.successAction}
      hideBackButton={options.hideBackButton}
      setModalError={options.setError}
    />
  ),
  'reset-password': (onClose, options) => (
    <RestorePasswordForm onClose={onClose} setModalError={options.setError} />
  ),
};

const modalTitles = {
  registration: 'auth.signUp',
  login: 'auth.signIn',
  'reset-password': 'auth.restorePass',
};

const AuthWrapper: FC<IProps> = ({
  onClose,
  isOpen,
  title,
  successAction,
  className,
  hideBackButton,
  defaultState = AuthFormType.REGISTRATION,
}) => {
  const [currentType, setCurrentType] = useState<AuthFormType>(defaultState);
  const { t } = useTranslation();
  const { query } = useRouter();
  const isLaptop = useMediaQuery('(max-width: 1200px)');
  const [error, setError] = useState<string | undefined>('');

  useLayoutEffect(() => {
    if (query.type) {
      const item = Object.values(AuthFormType).find((el) => el === query.type);
      if (item) {
        setCurrentType(item);
      }
    }
  }, [query.type]);

  useLayoutEffect(() => {
    setCurrentType(defaultState);
  }, [defaultState]);

  const handleClick = (isLeftActive: boolean | null) => () => {
    if (isLeftActive === null) {
      setCurrentType(AuthFormType.RESET_PASSWORD);
    } else if (!isLeftActive) {
      setCurrentType(AuthFormType.LOGIN);
    } else {
      setCurrentType(AuthFormType.REGISTRATION);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isOpen && currentType === AuthFormType.RESET_PASSWORD) {
      timer = setTimeout(() => setCurrentType(AuthFormType.REGISTRATION), 500);
    }

    return () => clearTimeout(timer);
  }, [isOpen, currentType]);

  return (
    <div className={cn(styles.AuthForm, '2xl:items-center', className)}>
      <div>
        {error ? (
          <Typography
            className="w-[100%] flex justify-center"
            variant={'text2'}
            weight={400}
            color="red"
          >
            {error}
          </Typography>
        ) : (
          <Typography className="w-[100%] flex justify-center " variant={'heading2'} weight={700}>
            {t(modalTitles[currentType])}
          </Typography>
        )}
      </div>
      {currentType !== AuthFormType.RESET_PASSWORD && title}
      {((currentType !== AuthFormType.RESET_PASSWORD && !isLaptop) ||
        currentType !== AuthFormType.RESET_PASSWORD) && (
        <AuthorizationFormButton
          onClick={handleClick}
          rightText={t('auth.signUp')}
          leftText={t('auth.signIn')}
          defaultValue={currentType !== AuthFormType.LOGIN}
          className="xs:w-full"
          small={isLaptop}
        />
      )}
      {Forms[currentType](onClose, {
        callModalChange: handleClick,
        successAction,
        hideBackButton,
        setError,
      })}
    </div>
  );
};

export default AuthWrapper;
