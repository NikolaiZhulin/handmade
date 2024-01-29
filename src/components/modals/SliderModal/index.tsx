import { FC } from 'react';

import Swiper from '@/components/Swiper';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface IProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  activeIndex: number;
}

const SliderModal: FC<IProps> = ({ isOpen, onOpenChange, images, activeIndex }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[1257px] p-0 h-screen 2xl:w-full bg-black xs:flex xs:flex-col xs:pb-[14px] 2xl:h-[calc(var(--app-height))]">
        <Swiper
          keyUpdater={isOpen}
          images={images}
          activeIndex={activeIndex}
          swiperHeight="h-full"
          withCounter={true}
          onClose={() => onOpenChange(false)}
          inModal={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SliderModal;
