import { FC, PropsWithChildren } from 'react';

import style from './style.module.scss';

interface IProps {}

const PopUpContainer: FC<PropsWithChildren<IProps>> = ({ children }) => {
  return <div className={style.PopUpContainer}>{children}</div>;
};

export default PopUpContainer;
