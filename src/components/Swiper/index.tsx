import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { register } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

import { getImage } from '@/helpers/getImage';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ImagesPrewiev from '@/ui/ImagesPreview';
import { cn } from '@/utils/utils';
import { ImageService } from '@/constants/enums';

interface IProps {
  images: string[] | File[];
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
  inModal,
}) => {
  const [swiperKey, setSwiperKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(activeIndex ?? 0);
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  const swiperRef = useRef<HTMLLinkElement | any>(null);

  useEffect(() => {
    register();

    if (swiperRef.current) {
      const params: SwiperOptions = {
        slidesPerView: 1,
        initialSlide: activeIndex ?? 0,
        on: {
          slideChange: (swiper) => {
            setCurrentIndex(swiper.realIndex);
            onIndexChange?.(swiper.realIndex);
          },
          realIndexChange: () => {},
        },
      };

      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
      swiperRef.current.swiper.slideTo(activeIndex ?? 0);
    }
  }, [activeIndex, onIndexChange, swiperKey]);

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

  const previewClickHandler = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
    onIndexChange?.(index);
  };

  return (
    <>
      <div className={cn('relative overflow-hidden', swiperHeight)}>
        <div className={'relative h-full overflow-hidden'}>
          {leftButton
            ? leftButton(handleButtonClick(0))
            : images.length > 1 && (
                <button
                  className="absolute top-1/2 flex items-center justify-center w-[60px] h-[60px] left-[54px] z-50 rotate-180 2xl:left-0"
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
              )}
          <swiper-container
            ref={swiperRef}
            init={false}
            key={swiperKey}
            onClick={onSliderClick}
            initialSlide={activeIndex}
            style={{ backgroundColor: inModal ? 'black gap-[14px]' : '' }}
          >
            {images.map((img) => {
              const url =
                typeof img === 'string'
                  ? getImage(ImageService.POSTS, img)
                  : URL.createObjectURL(img);
              return (
                <swiper-slide key={url}>
                  <img src={url} alt="" />
                </swiper-slide>
              );
            })}
          </swiper-container>
          {rightButton
            ? rightButton(handleButtonClick(1))
            : images.length > 1 && (
                <button
                  className="absolute top-1/2 flex items-center justify-center w-[60px] h-[60px] right-[54px] z-50 2xl:right-0"
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
              )}
        </div>
        {withCounter && images.length > 1 && (
          <div
            className={cn(
              'absolute px-[10px] [&>span]:text-white z-[1] font-montserrat bottom-[14px] left-[14px] bg-black text-white overflow-hidden h-[24px] flex items-center justify-center opacity-70 text-[12px] leading-[14px] font-medium',
              'left-[14px]',
            )}
          >
            <span className="font-montserrat">{currentIndex + 1}</span>/
            <span className="font-montserrat">{images.length}</span>
          </div>
        )}
      </div>
      {(!isLaptop || inModal) && images.length > 1 && (
        <>
          <div
            className={cn(
              'xs:overflow-auto xs:w-full xs:h-[98px] no-scrollbar',
              inModal && 'overflow-x-auto mt-auto py-[14px]',
            )}
          >
            <div
              className={cn(
                'flex flex-col gap-[13px] items-start justify-start min-h-min max-h-[542px] over transition-transform',
                'xs:flex-nowrap xs:w-max xs:min-w-full xs:px-[20px]',
                inModal ? 'bg-black flex-row' : 'bg-[transparent] ',
                previewBlockClassname,
              )}
              style={{
                transform:
                  !inModal && currentIndex > 4
                    ? `translateY(calc(-${currentIndex - 4} * 113px))`
                    : inModal
                    ? `translateX(calc(-${currentIndex} * 128px))`
                    : '',
              }}
            >
              {images.map((img, index) => {
                const url = typeof img === 'string' ? img : URL.createObjectURL(img);

                return (
                  <ImagesPrewiev
                    image={url}
                    key={url}
                    isActive={index === currentIndex}
                    onClick={() => previewClickHandler(index)}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Swiper;
