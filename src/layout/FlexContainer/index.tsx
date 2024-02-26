import { FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

const GAPS_MAP = {
  4: style.gap4,
  8: style.gap8,
  10: style.gap10,
  14: style.gap14,
  16: style.gap16,
  20: style.gap20,
  30: style.gap30,
};

const JUSTIFY_MAP = {
  center: style['justify-center'],
  start: style['flex-start'],
  evenly: style['justify-evenly'],
  around: style['justify-around'],
};

const DIRECTION_MAP = {
  row: style.row,
  column: style.column,
};

const ALIGN_MAP = {
  start: style['align-start'],
  center: style['align-center'],
  end: style['align-end'],
};

interface IProps {
  className?: string;
  gap?: keyof typeof GAPS_MAP;
  justify?: keyof typeof JUSTIFY_MAP;
  direction?: keyof typeof DIRECTION_MAP;
  align?: keyof typeof ALIGN_MAP;
}

const FlexContainer: FC<PropsWithChildren<IProps>> = ({
  children,
  className,
  gap,
  justify,
  direction,
  align,
}) => {
  return (
    <div
      className={mergeStyles(
        style.FlexContainer,
        gap && GAPS_MAP[gap],
        justify && JUSTIFY_MAP[justify],
        direction && DIRECTION_MAP[direction],
        align && ALIGN_MAP[align],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
