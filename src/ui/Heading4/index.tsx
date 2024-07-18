import { FC, PropsWithChildren } from 'react';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Heading4: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return (
    <h4
      className={`${style.Heading4} ${className}
`}
    >
      {children}
    </h4>
  );
};

export default Heading4;
