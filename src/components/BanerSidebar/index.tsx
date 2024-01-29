import { FC, PropsWithChildren } from 'react';

import style from './style.module.scss';

interface IProps {}

const BanerSidebar: FC<PropsWithChildren<IProps>> = () => {
  return (
    <a href="#">
      <div className={style.BanerSidebar}>
        <img
          src="https://cdn.discordapp.com/attachments/997268061482647653/1177314338604859495/photo_5366206885394500815_y_1.jpg?ex=65720e6b&is=655f996b&hm=47f187e654d5c6d17ee735a70f657bbe6a3da7b358a94804d93ddf9e37c8604a&"
          alt=""
        />
      </div>
    </a>
  );
};

export default BanerSidebar;
