import { PropsWithChildren, forwardRef } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import styles from './styles.module.scss';

const STYLES_MAP = {
  weight: {
    400: styles.w400,
    500: styles.w500,
    600: styles.w600,
    700: styles.w700,
  },
  variants: {
    heading1: styles.Heading1,
    heading2: styles.Heading2,
    heading3: styles.Heading3,
    text1: styles.Text1,
    text2: styles.Text2,
    text3: styles.Text3,
  },
  color: {
    gray: styles.grayText,
    brand: styles.brandText,
    black: styles.blackText,
    white: styles.whiteText,
    red: styles.redText,
  },
};

interface IProps {
  weight?: keyof typeof STYLES_MAP.weight;
  variant: keyof typeof STYLES_MAP.variants;
  color?: keyof typeof STYLES_MAP.color;
  className?: string;
}

const Typography = forwardRef<HTMLParagraphElement, PropsWithChildren<IProps>>(
  ({ children, weight, variant, color, className }, ref) => {
    return (
      <p
        ref={ref}
        className={mergeStyles(
          styles.base,
          variant && STYLES_MAP.variants[variant],
          weight && STYLES_MAP.weight[weight],
          color && STYLES_MAP.color[color],
          className,
        )}
      >
        {children}
      </p>
    );
  },
);

Typography.displayName = 'Typography';

export default Typography;
