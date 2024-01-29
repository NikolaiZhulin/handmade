import { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/utils/utils';
import { MODAL_CONTEXT_VALUES, ModalContext } from '@/contexts/ModalContext';

import Typography from '../Typography';

import { DEFAULT_LANGS, LANGS_MAP } from './config';
import style from './style.module.scss';

interface IProps {}

const Lang: FC<PropsWithChildren<IProps>> = () => {
  const { query, push } = useRouter();
  const {
    i18n: { language },
  } = useTranslation();
  const inDialog = useMediaQuery('(max-width: 1200px)');
  const [isOpen, setIsOpen] = useState(false);
  const [modals, setModal] = useContext(ModalContext);

  const [langs, setLangs] = useState(DEFAULT_LANGS);

  const handleClick = (lang: string) => () => {
    if (Object.values(modals).some((el) => el)) {
      setModal(MODAL_CONTEXT_VALUES);
    }
    push({ query }, undefined, { locale: lang });
    setLangs((prev) => [lang, ...prev.filter((el) => el !== lang)]);
  };

  useEffect(() => {
    setLangs((prev) => [language, ...prev.filter((el) => el !== language)]);
  }, []);

  return (
    <div className={style.Lang}>
      {inDialog ? (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (open && Object.values(modals).some((el) => el)) {
              setModal(MODAL_CONTEXT_VALUES);
            }
          }}
        >
          <DialogTrigger>
            <HomeSvgSelector id={language} />
          </DialogTrigger>
          <DialogContent className="w-[390px] xs:w-[calc(100%-40px)] xs:mx-[20px] xs:translate-x-[calc(-50%-20px)]">
            {langs.map((lang) => (
              <div
                className={cn(
                  'w-full flex items-center gap-[14px] cursor-pointer font-[500] h-[34px] pl-[6px] font-helvetica',
                  'transition-all ease-out font-helvetica hover:bg-light-gray',
                  '[&:not(:last-child)]:border-b-[1px] border-solid border-light-gray 2xl:h-[36px] group transition-all duration-300 ease-out hover:bg-green-light',
                )}
                onClick={() => {
                  handleClick(lang)();
                  setIsOpen(false);
                }}
                key={lang}
              >
                <HomeSvgSelector id={lang} />
                <Typography variant="heading3" className="group-hover:text-white">
                  {LANGS_MAP[lang as keyof typeof LANGS_MAP]}
                </Typography>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      ) : (
        langs.map((lang) => (
          <button onClick={handleClick(lang)} key={lang}>
            <HomeSvgSelector id={lang} />
          </button>
        ))
      )}
    </div>
  );
};

export default Lang;
