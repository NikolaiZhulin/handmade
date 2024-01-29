import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

import { getImage } from '@/helpers/getImage';
import ImagesPrewiev from '@/ui/ImagesPreview';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Typography from '@/ui/Typography';
import { useTranslation } from '@/hooks/useTranslation';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

interface IProps {
  images: string[];
  activeIndex?: number;
  leftButton?: (onClick: () => void) => ReactNode;
  rightButton?: (onClick: () => void) => ReactNode;
  withCounter?: boolean;
  keyUpdater: boolean;
  onSliderClick?: () => void;
  onIndexChange?: (index: number) => void;
  swiperHeight: string;
  previewBlockClassname?: string;
  onClose?: () => void;
  inModal?: boolean;
}

const Swiper: FC<IProps> = ({
  keyUpdater,
  images,
  activeIndex,
  leftButton,
  rightButton,
  withCounter,
  onSliderClick,
  onIndexChange,
  swiperHeight,
  previewBlockClassname,
  onClose,
  inModal,
}) => {
  const swiperRef = useRef<SwiperContainer>(null);
  const [swiperKey, setSwiperKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(activeIndex ?? 0);
  const isLaptop = useMediaQuery('(max-width: 1200px)');
  const { t } = useTranslation();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current?.initialize();
      setCurrentIndex(activeIndex ?? 0);
      const params: SwiperOptions = {
        slidesPerView: 1,
        initialSlide: activeIndex ?? 0,
      };

      swiperRef.current.swiper.on('realIndexChange', (swiper) => {
        setCurrentIndex(swiper.realIndex);
        onIndexChange?.(swiper.realIndex);
      });

      Object.assign(swiperRef.current, params);
      swiperRef.current.swiper.slideTo(activeIndex ?? 0);
    }
  }, [swiperKey]);

  useEffect(() => {
    if (keyUpdater) {
      setSwiperKey(Math.random());
    }
  }, [keyUpdater]);

  const handleButtonClick = (direction: 0 | 1) => () => {
    if (direction) {
      swiperRef.current?.swiper.slideNext();
    } else {
      swiperRef.current?.swiper.slidePrev();
    }
  };

  const previewClickHandler = (index: number) => () => {
    swiperRef.current?.swiper.slideTo(index);
    onIndexChange?.(index);
  };

  return (
    <>
      <div className={cn('relative overflow-hidden', swiperHeight)}>
        {isLaptop && inModal && (
          <div className="2xl:py-[10px] 2xl:px-[24px] 2xl:bg-white xs:px-[14px] xs:py-[10px]">
            <button className="flex items-center gap-[14px]" onClick={onClose}>
              <HomeSvgSelector id="arrow-left" />
              <Typography variant="heading3" className="xs:!text-[14px]">
                {t('back')}
              </Typography>
            </button>
          </div>
        )}
        <div className={'relative h-full overflow-hidden'}>
          {!isLaptop &&
            (leftButton
              ? leftButton(handleButtonClick(0))
              : images.length > 1 && (
                  <button
                    className="absolute top-1/2 left-[54px] z-50 rotate-180"
                    onClick={handleButtonClick(0)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="28"
                      viewBox="0 0 17 28"
                      fill="none"
                    >
                      <path
                        d="M2 2L14 14L2 26"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                ))}
          <swiper-container
            ref={swiperRef}
            init={false}
            key={swiperKey}
            onClick={onSliderClick}
            initialSlide={activeIndex}
            style={{ backgroundColor: inModal ? 'black' : '' }}
          >
            {images.map((img) => (
              <swiper-slide key={img}>
                <img src={getImage(img)} />
              </swiper-slide>
            ))}
          </swiper-container>
          {!isLaptop &&
            (rightButton
              ? rightButton(handleButtonClick(1))
              : images.length > 1 && (
                  <button
                    className="absolute top-1/2 right-[54px] z-50"
                    onClick={handleButtonClick(1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="28"
                      viewBox="0 0 17 28"
                      fill="none"
                    >
                      <path
                        d="M2 2L14 14L2 26"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                ))}
        </div>
        {withCounter && images.length > 1 && (
          <div
            className={cn(
              'absolute px-[10px] [&>span]:text-white z-[1] bottom-[14px] left-[14px] bg-black text-white overflow-hidden h-[24px] flex items-center justify-center opacity-70 text-[12px] leading-[14px] font-medium',
              'left-[14px]',
            )}
          >
            <span className="font-helvetica">{currentIndex + 1}</span>/
            <span className="font-helvetica">{images.length}</span>
          </div>
        )}
      </div>
      {(!isLaptop || inModal) && images.length > 1 && (
        <>
          <div className="xs:overflow-auto xs:w-full xs:h-[98px] no-scrollbar">
            <div
              className={cn(
                'flex flex-col gap-[13px] items-start justify-start min-h-min max-h-[542px] over transition-transform',
                'xs:flex-nowrap xs:w-max xs:min-w-full xs:px-[20px]',
                inModal ? 'bg-black' : 'bg-[transparent]',
                previewBlockClassname,
              )}
              style={{
                transform: currentIndex > 4 ? `translateY(calc(-${currentIndex - 4} * 113px))` : '',
              }}
            >
              {images.map((img, i) => (
                <ImagesPrewiev
                  image={img}
                  key={img}
                  isActive={i === currentIndex}
                  onClick={previewClickHandler(i)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Swiper;
