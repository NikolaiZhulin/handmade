import { FC, PropsWithChildren, useState } from 'react';
import { register } from 'swiper/element/bundle';

register();

import { mergeStyles } from '@/helpers/mergeStyles';
import { cn } from '@/utils/utils';

import SliderModal from '../modals/SliderModal';
import Swiper from '../Swiper';

import style from './style.module.scss';

interface IProps {
  images: string[];
}

const ImagesPost: FC<PropsWithChildren<IProps>> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <SliderModal
        isOpen={isModalOpen}
        onOpenChange={(open) => setIsModalOpen(open)}
        images={images}
        activeIndex={currentIndex}
      />
      <div className={cn(style.ImagesPost)}>
        {Boolean(images.length) ? (
          <Swiper
            swiperHeight="h-[542px] w-full cursor-zoom-in xs:h-[300px]"
            previewBlockClassname="xbg-white"
            onSliderClick={() => setIsModalOpen(true)}
            activeIndex={currentIndex}
            onIndexChange={(index) => setCurrentIndex(index)}
            images={images}
            keyUpdater={true}
            leftButton={(onClick) => (
              <>
                {images.length > 1 && (
                  <button className={style.SliderButton} onClick={onClick}>
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
              </>
            )}
            rightButton={(onClick) => (
              <>
                {images.length > 1 && (
                  <button
                    onClick={onClick}
                    className={mergeStyles(style.SliderButton, style.right)}
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
              </>
            )}
            withCounter={true}
          />
        ) : (
          <img src="/images/empty-ad-photo.png" alt="" />
        )}
      </div>
    </>
  );
};

export default ImagesPost;
