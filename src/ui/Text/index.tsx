import { FC, PropsWithChildren } from 'react';

import style from './style.module.scss';

interface IProps {}

const Text: FC<PropsWithChildren<IProps>> = ({ children }) => {
  return <p className={style.Text}>{children}</p>;
};

export default Text;
