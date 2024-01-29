import { FC, PropsWithChildren } from 'react';

import { useTranslation } from '@/hooks/useTranslation';

interface IProps {}

const BanerTop: FC<PropsWithChildren<IProps>> = () => {
  const { t } = useTranslation();
  const BANNER_URL = '/images/banner.jpg';

  return (
    <a target="_blank" href="https://www.instagram.com/exhair_batumi?igsh=ODA1NTc5OTg5Nw==">
      <div className="relative 2xl:mx-[30px] xs:mx-[15px]">
        <img src={BANNER_URL} alt="" className="w-[100%] h-auto object-contain" />
        <p className="absolute left-[40px] top-[50%] translate-y-[-50%] text-[#453018] text-[64px] font-bold w-[50%] 2xl:left-[30px] 2xl:text-[40px] xs:text-[20px] xs:w-[40%] xs:left-[15px]">
          {t('banner.banner_text')}
        </p>
      </div>
    </a>
  );
};

export default BanerTop;
