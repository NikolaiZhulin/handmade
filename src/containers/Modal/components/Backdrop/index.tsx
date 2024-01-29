import { FC, PropsWithChildren, useRef, MouseEvent } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import styles from './styles.module.scss';

interface IProps {
  onClose?: () => void;
  isHidden?: boolean;
  keepBackdrop?: boolean;
  className?: string;
}

const Backdrop: FC<PropsWithChildren<IProps>> = ({
  onClose,
  isHidden,
  children,
  keepBackdrop,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target === ref.current && onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={ref}
      className={mergeStyles(
        styles.backdrop,
        isHidden ? styles.hidden : styles.visible,
        !keepBackdrop && styles.backdropXl,
        className,
      )}
      onMouseDown={handleClickOutside}
    >
      {children}
    </div>
  );
};

export default Backdrop;
