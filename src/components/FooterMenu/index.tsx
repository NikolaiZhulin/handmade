import Link from 'next/link';
import { useRouter } from 'next/router';

import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';

import { FOOTER_MENU_ITEM } from './constants';

const FooterMenu = () => {
  const router = useRouter();

  return (
    <div className="hidden bg-white 2xl:flex 2xl:pt-[10px] fixed bottom-0 left-0 right-0 z-[49] justify-between px-[60px] pb-[15px] items-center xs:px-[30px]">
      {FOOTER_MENU_ITEM.map(({ icon, text, href }) => {
        const isActive =
          href === '/search'
            ? href === router.pathname || router.pathname === '/'
            : href === router.pathname;
        return (
          <Link
            href={href}
            key={text}
            className={cn(
              'flex gap-[6px] flex-col items-center',
              isActive ? '[&>svg]:fill-main-green [&>svg>path]:stroke-white' : undefined,
            )}
          >
            <HomeSvgSelector id={icon} />
            {isActive ? (
              <Typography variant={'text3'} className="text-main-green">
                {text}
              </Typography>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterMenu;
