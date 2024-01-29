import { FC } from 'react';
import Link from 'next/link';

import { IUserData } from '@/types/admin/users';

import style from '../style.module.scss';

interface IProps {
  user: IUserData;
}

const TableUserRow: FC<IProps> = ({ user }) => {
  return (
    <div className={style.TableItem}>
      <div className={style.Item}>
        <Link
          prefetch={false}
          href={`/admin/dashboard/users/${user.id}`}
          className="whitespace-nowrap underline overflow-hidden text-ellipsis max-w-full"
        >
          {user.id}
        </Link>
      </div>
      <div className={style.Item}>
        <span>
          {new Date(user.createdAt).toLocaleDateString('ru-RU', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}
        </span>
        <span>
          {new Date(user.createdAt).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: 'numeric',
          })}
        </span>
      </div>
      <div className={style.Item}>
        <p>{user.phone || '-'}</p>
      </div>
      <div className={style.Item}>
        <p>{user.email || '-'}</p>
      </div>
      <div className={style.Item}>
        <p>{user.city || '-'}</p>
      </div>
      <div className={style.Item}>
        <p>{user.activity}</p>
      </div>
    </div>
  );
};

export default TableUserRow;
