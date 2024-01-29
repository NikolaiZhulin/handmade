import { FC } from 'react';
import { useRouter } from 'next/router';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { DEFAULT_LANGS } from '@/ui/Lang/config';
import { cn } from '@/utils/utils';

interface IProps {}

const Langs: FC<IProps> = ({}) => {
  const { push } = useRouter();
  const {
    i18n: { language },
    changeLanguage,
  } = useTranslation();

  return (
    <div className="w-full rounded-[6px] bg-dark-branded p-[2px] flex items-center mt-auto">
      {DEFAULT_LANGS.map((lang) => (
        <button
          key={lang}
          onClick={() => {
            changeLanguage(lang);
            push({}, undefined, { locale: lang });
          }}
          className={cn(
            'rounded-[6px] w-1/3 flex items-center justify-center h-[32px]',
            lang === language && 'bg-main-brand',
          )}
        >
          <HomeSvgSelector id={lang} />
        </button>
      ))}
    </div>
  );
};

export default Langs;
