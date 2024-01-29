import { DetailedHTMLProps, HTMLAttributes } from 'react';

import type { SwiperSlideProps, SwiperProps } from 'swiper/react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': DetailedHTMLProps<HTMLAttributes<HTMLElement> & SwiperProps, HTMLElement>;
      'swiper-slide': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & SwiperSlideProps,
        HTMLElement
      >;
    }
  }
}
