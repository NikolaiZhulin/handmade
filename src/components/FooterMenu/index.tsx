import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useGetMe } from '@/api/auth/get-me';
import { useTranslation } from '@/hooks/useTranslation';
import { ModalContext } from '@/contexts/ModalContext';

import { FOOTER_MENU_ITEM } from './constants';

const FooterMenu = () => {
  const router = useRouter();
  const { data: me } = useGetMe();
  const { t } = useTranslation();
  const [, setModals] = useContext(ModalContext);

  return (
    <div className="hidden bg-white 2xl:flex 2xl:pt-[10px] fixed bottom-0 left-0 right-0 z-[49] justify-between px-[60px] pb-[15px] items-center xs:px-[30px]">
      {FOOTER_MENU_ITEM.map(({ icon, text, href }) => {
        const hrefValue = typeof href === 'string' ? href : href('[id]');
        const isActive = hrefValue === router.pathname;
        return (
          <Link
            href={typeof href === 'string' ? href : href(me?.id ?? '')}
            key={text}
            onClick={(e) => {
              if (!me?.id && href !== 'string') {
                e.preventDefault();
                setModals({ authModal: true });
              }
            }}
            className={cn(
              'flex gap-[6px] flex-col items-center',
              isActive
                ? '[&>svg]:fill-main-green [&>svg]:stroke-main-green [&>svg>path]:stroke-white [&>svg>path]:fill-main-green'
                : undefined,
            )}
          >
            <HomeSvgSelector id={icon} />
            {isActive ? (
              <Typography variant={'text3'} className="text-main-green">
                {t(text)}
              </Typography>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterMenu;
