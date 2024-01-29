import { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { mergeStyles } from '@/helpers/mergeStyles';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/utils';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';
import { config } from './config';

interface IProps {
  className?: string;
  currentPath?: string;
  currentLink?: string;
}

const Breadcrumbs: FC<PropsWithChildren<IProps>> = ({ className, currentPath, currentLink }) => {
  const { pathname, back } = useRouter();
  const { t } = useTranslation();
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  return isLaptop ? (
    <div
      className={cn(
        '2xl:py-[10px] 2xl:px-[24px] 2xl:bg-white xs:px-[14px] xs:py-[10px]',
        className,
      )}
    >
      <button className="flex items-center gap-[14px]" onClick={() => back()}>
        <HomeSvgSelector id="arrow-left" />
        <Typography variant="heading3" className="xs:!text-[14px]">
          {t('back')}
        </Typography>
      </button>
    </div>
  ) : (
    <ul className={mergeStyles(style.Breadcrumbs, className)}>
      <Link href="/">
        <Typography variant="heading5" color="gray">
          {t('breadcrumbs.main')}
        </Typography>
      </Link>
      <HomeSvgSelector id="triangle-icon"></HomeSvgSelector>
      {currentLink ? (
        <Link href={currentLink}>
          <Typography variant="heading5" color="gray">
            {t(currentPath ?? config[pathname])}
          </Typography>
        </Link>
      ) : (
        <Typography variant="heading5" color="gray">
          {t(currentPath ?? config[pathname])}
        </Typography>
      )}
    </ul>
  );
};

export default Breadcrumbs;
