import { FC, PropsWithChildren } from 'react';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Heading2: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return (
    <h2
      className={`${style.Heading2} ${className}
  `}
    >
      {children}
    </h2>
  );
};

export default Heading2;
