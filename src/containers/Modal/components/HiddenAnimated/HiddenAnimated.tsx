import { FC, ReactNode, useState } from 'react';

import { propsToChildren } from '@/helpers/propsToChildren';
import { useTimeoutValue } from '@/hooks/common/useTimeout';
import useSSRLayoutEffect from '@/hooks/common/useSSRLayoutEffect';
import { mergeStyles } from '@/helpers/mergeStyles';

import styles from './styles.module.scss';

interface IProps {
  isVisible: boolean;
  ms: number;
  children: ReactNode | ((visible: boolean) => ReactNode);
}

const HiddenAnimated: FC<IProps> = ({ isVisible, ms, children }) => {
  const [isVisibleLocal, setIsVisibleLocal] = useState(isVisible);

  const isVisibleDelayed = useTimeoutValue(isVisible, 100, [false]);

  useSSRLayoutEffect(() => {
    if (isVisible) {
      if (!isVisibleLocal) {
        setIsVisibleLocal(true);
      }

      return;
    }

    const timeout = setTimeout(() => {
      setIsVisibleLocal(false);
    }, ms);

    return () => clearTimeout(timeout);
  }, [isVisible, ms]);

  return (
    <div className={mergeStyles(!isVisibleLocal && styles.wrapper)}>
      {propsToChildren(children)(isVisibleDelayed)}
    </div>
  );
};

export default HiddenAnimated;
