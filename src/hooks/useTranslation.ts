import { useTranslation as useNextI18NextTranslation } from 'next-i18next';

export const useTranslation = () => {
  const { t, i18n } = useNextI18NextTranslation();

  return {
    t,
    changeLanguage: (language: string) => i18n.changeLanguage(language),
    i18n,
  };
};
