import { CSSProperties, FC, PropsWithChildren } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import styles from './style.module.scss';

interface IProps {
  className?: string;
  style?: CSSProperties;
}

const RightBlock: FC<PropsWithChildren<IProps>> = ({ children, className, style }) => {
  return (
    <div style={style} className={mergeStyles(styles.RightBlock, className)}>
      {children}
    </div>
  );
};

export default RightBlock;
