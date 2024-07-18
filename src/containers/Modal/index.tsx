import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import * as React from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';
import { useBlockScroll } from '@/hooks/common/useBlockScroll/useBlockScroll';
import { cn } from '@/utils/utils';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';

import BodyPortal from './components/BodyPortal';
import Backdrop from './components/Backdrop';
import styles from './styles.module.scss';
import HiddenAnimated from './components/HiddenAnimated/HiddenAnimated';

interface IProps {
  isVisible: boolean;
  onClose?: () => void;
  keepBackdrop?: boolean;
  outerWrapperClassName?: string;
  innerWrapperClassName?: string;
  backdropClassName?: string;
  withCloseButton?: boolean;
  title?: string;
}

const Modal: FC<PropsWithChildren<IProps>> = ({
  children,
  isVisible,
  onClose,
  keepBackdrop,
  outerWrapperClassName,
  innerWrapperClassName,
  backdropClassName,
  title,
}) => {
  useBlockScroll(isVisible);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      },
      { signal: abortController.signal },
    );

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const appHeight = () => {
      !keepBackdrop && ref.current?.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    appHeight();
    window.addEventListener('resize', appHeight);

    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, [ref.current]);

  return (
    <BodyPortal>
      <HiddenAnimated isVisible={isVisible} ms={300}>
        {(isVisibleInner) => (
          <Backdrop
            isHidden={!isVisibleInner}
            onClose={onClose}
            keepBackdrop={keepBackdrop}
            className={cn(backdropClassName, 'relative xs:!top-96px')}
          >
            <div
              className={mergeStyles(
                styles.sideHide,
                isVisibleInner ? styles.visible : styles.hidden,
                !keepBackdrop && '2xl:w-screen',
                outerWrapperClassName,
              )}
              ref={ref}
            >
              <div
                className={cn(
                  styles.content,
                  !keepBackdrop && 'xs:!w-screen',
                  innerWrapperClassName,
                )}
              >
                <div
                  className={cn(
                    'overflow-auto max-h-[100%] pr-[10px] p-[30px] xs:!px-[20px] xs:!py-[14px]',
                    title && '!pt-[18px]',
                  )}
                >
                  <div className="flex items-start">
                    {title && (
                      <Typography
                        variant="heading2"
                        className="hidden 2xl:flex 2xl:w-[100%] 2xl:justify-center 2xl:mb-[48px]"
                      >
                        {title}
                      </Typography>
                    )}
                    <button
                      onClick={onClose}
                      className="ml-[auto] padding-[10px] absolute top-[20px] right-[20px] xs:top-[15px] xs:right-[15px] [&>svg]:h-[24px] [&>svg]:w-[24px] hover:opacity-50"
                    >
                      <HomeSvgSelector id={'modal-cross'} />
                    </button>
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </Backdrop>
        )}
      </HiddenAnimated>
    </BodyPortal>
  );
};

export default Modal;
