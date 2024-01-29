import { FC } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/utils';

interface IProps {
  isOpen: boolean;
  className?: string;
}

const BodyOverlay: FC<IProps> = ({ isOpen, className }) => {
  return createPortal(
    <div
      className={cn(
        'fixed top-0 left-0 w-full bg-bodyOverlay z-[10000] h-full rounded-l-[30px] overflow-hidden opacity-0 pointer-events-none',
        'transition-opacity duration-300 ease-out cursor-pointer',
        isOpen && 'opacity-1 pointer-events-auto',
        className,
      )}
    />,
    document.getElementById('__next') as HTMLElement,
  );
};

export default BodyOverlay;
