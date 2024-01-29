import { FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

const Badge: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.badge}>{children}</div>;
};

export default Badge;
