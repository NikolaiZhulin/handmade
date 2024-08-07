import { FC, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { UserContext } from '@/contexts/UserContext';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useGetMe } from '@/api/auth/get-me';
import { PROFILE_SIDE_LINKS } from '@/components/Profile/ProfileLeftBlock/config';
import Category from '@/ui/Category';
import { cn } from '@/utils/utils';
import { mergeStyles } from '@/helpers/mergeStyles';
import { MODAL_CONTEXT_VALUES, ModalContext } from '@/contexts/ModalContext';
import { getImage } from '@/helpers/getImage';
import { ImageService } from '@/constants/enums';
import CustomSelect from '@/ui/CustomSelect';

import styles from './styles.module.scss';

interface IProps {
  id: string;
}

const HeaderAccount: FC<IProps> = ({ id }) => {
  const [state, setState] = useContext(UserContext);
  const { pathname } = useRouter();
  const [modals, setModal] = useContext(ModalContext);
  const { t } = useTranslation();
  const { data: me } = useGetMe();
  const [{ feedbackModal }, setFeedBackModal] = useContext(ModalContext);

  return (
    <div className="flex gap-[10px] items-center">
      <Link href={`/profile/${id}`}>
        <div className="w-[44px] h-[44px] rounded-[50%] overflow-hidden">
          {me?.image ? (
            <img
              className="w-full h-full object-cover"
              src={
                me.image.startsWith('http')
                  ? me.image
                  : getImage(ImageService.AUTH, me?.image)
              }
              alt="profile image"
              title="profile image"
            />
          ) : (
            <span className={styles.avatar}>{me ? me.name?.[0] ?? 'u' : 'u'}</span>
          )}
        </div>
      </Link>
      <CustomSelect
        keepOpen={true}
        asDropdown={true}
        trigger={({ isOpen, toggleOpen, triggerRef }) => (
          <button
            ref={triggerRef}
            className={cn(
              styles.wrapper,
              '[&>svg]:transition-transform [&>svg]:durations-[250] [&>svg]:ease-out',
              isOpen ? '[&>svg]:rotate-180' : '[&>svg]:rotate-0',
            )}
            onClick={() => {
              if (Object.values(modals).some((el) => el)) {
                setModal(MODAL_CONTEXT_VALUES);
              }
              toggleOpen((prev) => !prev);
            }}
          >
            <div className={'flex flex-col items-start'}>
              <p className={cn(styles.name, 'font-montserrat')}>{state.name}</p>
              <p className={styles.account}>{t('header.cabinet')}</p>
            </div>
            <span
              className={cn(
                '[&>svg>path]:fill-[#888D97] transition-transform origin-center',
                isOpen && 'rotate-180 [&>svg>path]:fill-black',
              )}
            >
              <HomeSvgSelector id="select_arrow" />
            </span>
          </button>
        )}
        dropdownClassname={cn(
          'p-[14px] min-w-[306px] top-[45px] right-0 left-[-60px] !rounded-t-none [clip-path:inset(0px_-35px_-35px_-35px)]',
          '2xl:w-full',
        )}
        options={({ close }) => [
          PROFILE_SIDE_LINKS.map((link, i) =>
            link.render ? (
              link.render(
                <Category withBorder={i !== PROFILE_SIDE_LINKS.length - 1} key={link.title}>
                  <HomeSvgSelector id={link.icon} />
                  {t(link.title)}
                </Category>,
                t('modals.logout'),
                t('exit'),
                () => {
                  setState({ accessToken: '' });
                  close();
                },
                close,
              )
            ) : link.component ? (
              link.component(
                <Category
                  onClick={() => setFeedBackModal({ feedbackModal: true })}
                  withBorder={i !== PROFILE_SIDE_LINKS.length - 1}
                >
                  <HomeSvgSelector id={link.icon} />
                  {t(link.title)}
                </Category>,
                feedbackModal,
              )
            ) : (
              <Link
                href={link.link(me?.id ?? ' ')}
                key={link.title}
                className={mergeStyles(
                  i === PROFILE_SIDE_LINKS.length - 1 && styles.last,
                  'whitespace-nowrap',
                )}
                onClick={close}
              >
                <Category
                  isActive={link.regexp && link.regexp.test(pathname)}
                  withBorder={i !== PROFILE_SIDE_LINKS.length - 1}
                  className={'[&>svg]:min-w-[24px]'}
                >
                  <HomeSvgSelector id={link.icon} />
                  {t(link.title)}
                </Category>
              </Link>
            ),
          ),
        ]}
      />
    </div>
  );
};

export default HeaderAccount;
