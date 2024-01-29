import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Category from '@/ui/Category';
import { mergeStyles } from '@/helpers/mergeStyles';
import Badge from '@/components/Profile/components/Badge';
import Typography from '@/ui/Typography';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useTranslation } from '@/hooks/useTranslation';
import NewKeyWordForm from '@/components/NewKeyWordForm';

import { ADMIN_SIDE_LINKS } from './config';
import style from './style.module.scss';

interface IProps {
  className?: string;
}

const AdminLeftBlock: FC<PropsWithChildren<IProps>> = ({ className }) => {
  const data = [2];
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[20px] sticky top-[82px] left-0 h-max">
      <div className={mergeStyles(style.AdminLeftBlock, className)}>
        {ADMIN_SIDE_LINKS.map((link, i) => (
          <Link href={link.link()} key={link.title}>
            <Category
              isActive={link.regexp && link.regexp.test(pathname)}
              withBorder={i !== ADMIN_SIDE_LINKS.length - 1}
              rightItem={
                link.badge &&
                data &&
                !!data.length && (
                  <Badge>
                    <Typography variant="heading4">{data.length}</Typography>
                  </Badge>
                )
              }
            >
              <HomeSvgSelector id={link.icon} />
              {t(link.title)}
            </Category>
          </Link>
        ))}
      </div>
      <NewKeyWordForm />
    </div>
  );
};

export default AdminLeftBlock;
