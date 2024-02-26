import Link from 'next/link';
import { FC, useContext } from 'react';

import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import NameBlock from '@/components/Profile/components/NameBlock';
import { useGetMe } from '@/api/auth/get-me';
import Category from '@/ui/Category';
import { useGetFavouritePosts } from '@/api/posts/get-favourite';
import Badge from '@/components/Profile/components/Badge';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { cn } from '@/utils/utils';
import { UserContext } from '@/contexts/UserContext';

import { config } from '../config';

import Langs from './Langs';

interface IProps {}

const Logged: FC<IProps> = ({}) => {
  const [, setState] = useContext(UserContext);
  const { data: me } = useGetMe();
  const { data } = useGetFavouritePosts();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[14px] w-full h-full items-center xs:items-start">
      <NameBlock
        nameColor="white"
        name={me?.name ?? 'U'}
        image={me?.image}
        subtext={
          <Link href={`/profile/${me?.id}`}>
            <Typography variant="heading3" color="white" className="opacite-70">
              {t('profile.setup')}
            </Typography>
          </Link>
        }
      />
      <div className="w-full">
        {config[1].map((link, i) =>
          link.render ? (
            link.render(
              <Category
                withBorder={i !== config[1].length - 1}
                key={link.title}
                rightItem={
                  link.badge &&
                  data &&
                  !!data.length && (
                    <Badge>
                      <Typography variant="heading3">{data.length}</Typography>
                    </Badge>
                  )
                }
                className={cn(
                  '!border-dark-branded hover:!bg-light-branded',
                  '[&>svg>path]:fill-white [&>svg>circle]:stroke-white',
                )}
              >
                <HomeSvgSelector id={link.icon} />
                <Typography variant="heading3" color="white" weight={500}>
                  {t(link.title)}
                </Typography>
              </Category>,
              t('modals.logout'),
              t('exit'),
              () => {
                setState({ accessToken: '' });
                close();
              },
              close,
            )
          ) : (
            <Link href={link.link(me?.id ?? ' ')} key={link.title} onClick={close}>
              <Category
                className={cn(
                  '!border-dark-branded hover:!bg-light-branded',
                  '[&>svg>path]:fill-white [&>svg>circle]:stroke-white [&>svg>rect]:fill-white',
                )}
                withBorder={i !== config[1].length - 1}
                rightItem={
                  link.badge &&
                  data &&
                  !!data.length && (
                    <Badge>
                      <Typography variant="heading3">{data.length}</Typography>
                    </Badge>
                  )
                }
              >
                <HomeSvgSelector id={link.icon} />
                <Typography variant="heading3" color="white" weight={500}>
                  {t(link.title)}
                </Typography>
              </Category>
            </Link>
          ),
        )}
      </div>
      <Langs />
    </div>
  );
};

export default Logged;
