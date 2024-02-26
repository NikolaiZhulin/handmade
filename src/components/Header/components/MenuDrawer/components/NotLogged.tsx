import { FC, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { AuthFormType } from '@/constants/enums';
import { ModalContext } from '@/contexts/ModalContext';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/ui/Button';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import Category from '@/ui/Category';

import { config } from '../config';

import Langs from './Langs';

interface IProps {}

const NotLogged: FC<IProps> = ({}) => {
  const [, setModals] = useContext(ModalContext);
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const openModal = (type: AuthFormType) => () => {
    setModals({ authModal: true });
    push({ query: { ...query, type } }, undefined, { shallow: true });
  };

  return (
    <>
      <div className={cn('flex flex-col gap-[14px] items-center h-full')}>
        <div
          className={cn(
            'w-[64px] h-[64px] flex items-center justify-center rounded-[18px] bg-dark-branded',
          )}
        >
          <HomeSvgSelector id="person" />
        </div>
        <div className={cn('flex flex-col gap-[8px] w-full')}>
          <Button
            onClick={openModal(AuthFormType.LOGIN)}
            className="!bg-light-branded hover:!bg-dark-branded xs:!h-[32px]"
            fullWidth={true}
          >
            <Typography variant="heading3" color="white" weight={700}>
              {t('auth.signIn')}
            </Typography>
          </Button>
          <Button
            className="hover:!bg-dark-accent xs:!h-[32px]"
            onClick={openModal(AuthFormType.REGISTRATION)}
            fullWidth={true}
            color="yellow"
          >
            <Typography variant="heading3" weight={700}>
              {t('auth.signUp')}
            </Typography>
          </Button>
        </div>
        <div className="w-full">
          {config[0].map((link, i) => (
            <Link href={link.link(' ')} key={link.title} onClick={close}>
              <Category
                withBorder={i !== config[0].length - 1}
                className={cn(
                  '!border-dark-branded hover:!bg-light-branded',
                  '[&>svg>path]:fill-white [&>svg>circle]:stroke-white',
                )}
              >
                <HomeSvgSelector id={link.icon} />
                <Typography variant="heading3" color="white" weight={500}>
                  {t(link.title)}
                </Typography>
              </Category>
            </Link>
          ))}
        </div>
        <Langs />
      </div>
    </>
  );
};

export default NotLogged;
