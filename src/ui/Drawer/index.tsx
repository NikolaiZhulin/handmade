import { FC, PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/utils';

import BodyOverlay from './components/BodyOverlay';

interface IProps {
  isOpen: boolean;
  close: () => void;
  overlayClassName?: string;
  className?: string;
  bodyActiveClassName?: string;
}

const Drawer: FC<PropsWithChildren<IProps>> = ({
  children,
  isOpen,
  close,
  overlayClassName,
  className,
  bodyActiveClassName,
}) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const root = document.getElementById('__next');

    if (root) {
      root.className = 'transition-all duration-300 ease-out ';
      document.body.className = 'transition-all duration-300 ease-out ';
      if (isOpen) {
        root.className += cn(
          'translate-x-[280px] h-[calc(var(--app-height)-28px)] overflow-hidden rounded-l-[30px] my-[14px] grayscale-[30%]',
          className,
        );
        document.body.className += cn('bg-white overflow-hidden', bodyActiveClassName);
        document.documentElement.className = 'overflow-hidden';
      } else {
        root.className += 'h-auto';
        document.body.className += 'bg-[#f0f1f5]';
        document.documentElement.className = '';
      }
    }

    root?.addEventListener('click', close);

    return () => {
      root?.removeEventListener('click', close);
      if (root) {
        root.className = '';
      }
      document.body.className = '';
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    setRendered(true);
  }, []);

  return (
    rendered &&
    createPortal(
      <div
        className={cn(
          'fixed top-0 left-0 w-[280px] h-[calc(var(--app-height))] transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-[100%]',
        )}
      >
        {children}
        <BodyOverlay isOpen={isOpen} className={overlayClassName} />
      </div>,
      document.body,
    )
  );
};

export default Drawer;
