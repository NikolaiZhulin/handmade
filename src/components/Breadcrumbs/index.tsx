import { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { mergeStyles } from '@/helpers/mergeStyles';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';
import { config } from './config';

interface IProps {
  className?: string;
  currentPath?: string;
  currentLink?: string;
  isBackButton?: boolean;
}

const Breadcrumbs: FC<PropsWithChildren<IProps>> = ({
  className,
  currentPath,
  isBackButton,
  currentLink,
}) => {
  const { pathname, back } = useRouter();
  const { t } = useTranslation();

  return isBackButton ? (
    <div
      className={cn(
        '2xl:py-[14px] 2xl:px-[24px] 2xl:bg-white xs:px-[14px] xs:py-[10px]',
        className,
      )}
    >
      <button className="flex items-center gap-[8px]" onClick={() => back()}>
        <HomeSvgSelector id="arrow-left" />
        <Typography variant="heading3" weight={500} className="xs:!text-[14px] !text-medium">
          {t('back')}
        </Typography>
      </button>
    </div>
  ) : (
    <ul className={mergeStyles(style.Breadcrumbs, className)}>
      <Link href="/">
        <Typography variant="text3" color="gray">
          {t('breadcrumbs.main')}
        </Typography>
      </Link>
      <HomeSvgSelector id="triangle-icon"></HomeSvgSelector>
      {currentLink ? (
        <Link href={currentLink}>
          <Typography variant="text3" color="gray">
            {t(currentPath ?? config[pathname])}
          </Typography>
        </Link>
      ) : (
        <Typography variant="text3" color="gray">
          {t(currentPath ?? config[pathname])}
        </Typography>
      )}
    </ul>
  );
};

export default Breadcrumbs;
