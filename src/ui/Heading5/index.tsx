import { FC, PropsWithChildren } from 'react';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Heading5: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return (
    <h5
      className={`${style.Heading5} ${className}
`}
    >
      {children}
    </h5>
  );
};

export default Heading5;
