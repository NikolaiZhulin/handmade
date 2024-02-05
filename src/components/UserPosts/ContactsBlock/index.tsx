import { FC } from 'react';
import * as clipboard from 'clipboard-polyfill';
import { toast } from 'react-toastify';

import NameBlock from '@/components/Profile/components/NameBlock';
import { getCreatedAtDatePhrase } from '@/helpers/getTime';
import { ExternalUser } from '@/types/auth';
import Button from '@/ui/Button';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';
import { CONTACT_LINKS } from '@/layout/RightBlockPost/config';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';

interface IProps {
  user: ExternalUser;
  isAdmin?: boolean;
}

const ContactsBlock: FC<IProps> = ({ user }) => {
  const { t } = useTranslation();

  const copyHandler = (text: string) => () => {
    clipboard.writeText(text);
    toast.success(t('toasts.copied'));
  };

  return (
    <div
      className={cn(
        'w-[285px] border-2 gap-[14px] flex flex-col sticky top-[116px] left-0 overflow-hidden h-min',
        '2xl:w-full 2xl:static',
      )}
    >
      <NameBlock
        name={user.name ?? 'U'}
        subtext={`${t('profile.registered')} ${getCreatedAtDatePhrase(user.createdAt, t)}`}
        image={user.image}
      />
      {user.phone && (
        <Button fullWidth={true} className="text-white [&>svg]:stroke-white [&>svg]:w-[24px]">
          <HomeSvgSelector id="phone-icon" />
          <Typography color="white" variant="text1" weight={500}>
            {user.phone}
          </Typography>
        </Button>
      )}
      <div className="border-b-[1px] border-light-gray border-solid 2xl:hidden">
        {Object.entries({
          tube: user.additionalPhone,
          telegram: user.telegram,
          whatsapp: user.whatsApp,
          viber: user.viber,
          facebook: user.facebook,
        }).map(([key, value]) =>
          value ? (
            <div
              className="flex items-center gap-[14px] py-[10px] border-t-[1px] border-light-gray border-solid"
              key={key}
            >
              <div className="[&>svg]:w-[24px] [&>svg]:h-[24px] sv">
                <HomeSvgSelector id={key} />
              </div>
              <a
                href={`${CONTACT_LINKS[key as keyof typeof CONTACT_LINKS] ?? ''}${value}`}
                target="_blank"
                className="text-blue underline underline-offset-2"
              >
                {value}
              </a>
              <button onClick={copyHandler(value)} className="ml-auto">
                <HomeSvgSelector id="copy" />
              </button>
            </div>
          ) : null,
        )}
      </div>
      <Button
        fullWidth={true}
        onClick={() => {}}
        className="!bg-light-gray !text-[#888D97] [&>svg>path]:fill-[#888D97] hover:!text-[#4985f9]"
      >
        <HomeSvgSelector id="warning" />
        {t('post.report.send')}
      </Button>
      {/* <ConfirmBeforeClick
        text="Заблокировать пользователя"
        approveText="Заблокировать"
        confirmHandler={handleBlockUser}
      >
        <Button
          color="neutral"
          fullWidth={true}
          className="[&>svg>path]:fill-text-gray [&>p]:hover:text-light-blue [&>svg>path]:hover:fill-light-blue transition-all duration-300"
        >
          <HomeSvgSelector id="warning" />
          <Typography variant="heading3" color="gray">
            {isAdmin ? 'Заблокировать' : t('report')}
          </Typography>
        </Button>
      </ConfirmBeforeClick> */}
    </div>
  );
};

export default ContactsBlock;
