import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Category from '@/ui/Category';
import Typography from '@/ui/Typography';
import { useGetMe } from '@/api/auth/get-me';
import { useGetFavouritePosts } from '@/api/posts/get-favourite';
import { UserContext } from '@/contexts/UserContext';
import { cn } from '@/utils/utils';
import { ModalContext } from '@/contexts/ModalContext';

import NameBlock from '../components/NameBlock';

import { PROFILE_SIDE_LINKS } from './config';
import styles from './styles.module.scss';

const ProfileLeftBlock = () => {
  const { data: me } = useGetMe();
  const { pathname, push } = useRouter();
  const { data } = useGetFavouritePosts();
  const [, setState] = useContext(UserContext);
  const { t } = useTranslation();
  const [{ feedbackModal }, setModal] = useContext(ModalContext);

  return (
    <div className={cn(styles.wrapper)}>
      <NameBlock
        name={me?.name ?? 'U'}
        image={me?.image}
        subtext={
          <Link href={`/profile/${me?.id}`}>
            <Typography variant="text3" color="gray" className="underline">
              {t('profile.setup')}
            </Typography>
          </Link>
        }
        smallUserName
      />
      <div>
        {PROFILE_SIDE_LINKS.map((link, i) =>
          link.render ? (
            link.render(
              <Category withBorder>
                <HomeSvgSelector id={link.icon} />
                {t(link.title)}
              </Category>,
              t('modals.logout'),
              t('exit'),
              () => {
                setState({ accessToken: '' });
                push('/');
              },
            )
          ) : link.component ? (
            link.component(
              <Category
                onClick={() => setModal({ feedbackModal: true })}
                withBorder={i !== PROFILE_SIDE_LINKS.length - 1}
              >
                <HomeSvgSelector id={link.icon} />
                {t(link.title)}
              </Category>,
              feedbackModal,
            )
          ) : (
            <Link href={link.link(me?.id ?? ' ')} key={link.title}>
              <Category
                isActive={link.regexp && link.regexp.test(pathname)}
                withBorder={i !== PROFILE_SIDE_LINKS.length - 1}
              >
                <HomeSvgSelector id={link.icon} />
                {t(link.title)}
              </Category>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default ProfileLeftBlock;
