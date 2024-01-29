import { FC, useMemo } from 'react';
import * as clipboard from 'clipboard-polyfill';
import { toast } from 'react-toastify';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';
import { IPostContactInfo } from '@/types/posts';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';

import { CONTACT_LINKS, ICONS_MAP } from '../config';
import style from '../style.module.scss';

interface IProps {
  contacts: IPostContactInfo;
  className?: string;
  hideButtons?: boolean;
}

export const Contacts: FC<IProps> = ({ contacts, className, hideButtons }) => {
  const { t } = useTranslation();

  const mappedContacts = useMemo(() => {
    return [
      {
        isVisible: contacts.isPhoneActive,
        value: contacts.phone,
        key: 'phone-icon',
      },
      {
        isVisible: contacts.isAdditionalPhoneActive,
        value: contacts.additionalPhone,
        key: 'additionalPhone',
      },
      {
        isVisible: contacts.isTelegramActive,
        value: contacts.telegram,
        key: 'telegram',
      },
      {
        isVisible: contacts.isWhatsappActive,
        value: contacts.whatsApp,
        key: 'whatsApp',
      },
      {
        isVisible: contacts.isViberActive,
        value: contacts.viber,
        key: 'viber',
      },
      {
        isVisible: contacts.isFacebookActive,
        value: contacts.facebook,
        key: 'facebook',
      },
    ];
  }, [contacts]);

  const copyHandler = (text: string, custom?: string) => () => {
    clipboard.writeText(text);
    toast.success(t(custom ?? 'toasts.copied'));
  };

  return (
    <div className={cn(style.contacts, className)}>
      {contacts.name && (
        <div className={style.contactItem}>
          <Typography variant="heading3">{contacts.name}</Typography>{' '}
        </div>
      )}
      {mappedContacts.map((el) => {
        if (!el.value || !el.isVisible) {
          return null;
        }
        return (
          <div className={style.contactItem} key={el.key}>
            <div className={style.contactIcon}>
              <HomeSvgSelector id={ICONS_MAP[el.key as keyof typeof ICONS_MAP]} />
            </div>
            <a
              href={`${CONTACT_LINKS[el.key as keyof typeof CONTACT_LINKS] ?? ''}${el.value}`}
              target="_blank"
            >
              {el.value}
            </a>
            {!hideButtons && (
              <button
                onClick={copyHandler(
                  el.value,
                  el.key.toLowerCase().includes('phone') ? 'toasts.phoneCopied' : undefined,
                )}
              >
                <HomeSvgSelector id="copy" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
