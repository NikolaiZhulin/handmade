import { FC, PropsWithChildren } from 'react';

import { cn } from '@/utils/utils';
import Typography from '@/ui/Typography';
import { useAuthBChanel } from '@/hooks/useAuthBChanel';
import { SOCIAL_AUTH_CHANEL } from '@/constants/base';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';
import { config } from './config';

interface IProps {
  className?: string;
}

const SocialContainer: FC<PropsWithChildren<IProps>> = ({ className }) => {
  useAuthBChanel(SOCIAL_AUTH_CHANEL);

  return (
    <div
      className={cn(
        style.SocialContainer,
        className,
        'gap-[14px] flex-col 2xl:w-full 2xl:overflow-hidden',
      )}
    >
      {config.map((item) => (
        <button
          key={item.id}
          className={cn(
            'w-full h-[44px] flex items-center gap-[14px] [&>div]:hover:bg-[rgba(0,0,0,0)]',
            style[item.className as keyof typeof style] as string,
          )}
          onClick={item.action}
        >
          <div className={cn('h-full w-[100%] gap-[8px] flex items-center justify-center ')}>
            <HomeSvgSelector id={item.id} />
            <Typography variant="heading3" color="white">
              {item.label}
            </Typography>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SocialContainer;
