import { Dispatch, FC, PropsWithChildren, ReactNode, SetStateAction } from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { mergeStyles } from '@/helpers/mergeStyles';
import { cn } from '@/utils/utils';

import style from './style.module.scss';

interface IProps {
  setView: Dispatch<SetStateAction<boolean>>;
  isGrid: boolean;
  leftIconId: string | ReactNode;
  rightIconId: string | ReactNode;
}

const ChangeView: FC<PropsWithChildren<IProps>> = ({
  setView,
  isGrid,
  leftIconId,
  rightIconId,
}) => {
  return (
    <div
      className={mergeStyles(style.ChangeViewContainer, isGrid && style.Grid)}
      onClick={() => setView((prev) => !prev)}
    >
      <button className={cn(style.ChangeView, 'xs:!w-[34px] xs:!h-[28px]')}>
        {typeof leftIconId === 'string' ? <HomeSvgSelector id={leftIconId} /> : leftIconId}
      </button>
      <button className={cn(style.ChangeView, 'xs:!w-[34px] xs:!h-[28px]')}>
        {typeof rightIconId === 'string' ? <HomeSvgSelector id={rightIconId} /> : rightIconId}
      </button>
    </div>
  );
};

export default ChangeView;
