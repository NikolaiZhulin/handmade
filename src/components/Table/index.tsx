import { FC, PropsWithChildren, ReactNode } from 'react';

import { cn } from '@/utils/utils';

import style from './style.module.scss';

interface IProps {
  headerItems: string[];
  headerClassName?: string;
  rows: ReactNode[];
}

const Table: FC<PropsWithChildren<IProps>> = ({ headerItems, headerClassName, rows }) => {
  return (
    <>
      <div className={style.Table}>
        <div className={style.TableHeder}>
          {headerItems.map((el, i) => (
            <span className={cn(style.TableHeaderItem, headerClassName)} key={i}>
              {el}
            </span>
          ))}
        </div>
        <div className={style.TableContainer}>{rows}</div>
      </div>
    </>
  );
};

export default Table;
