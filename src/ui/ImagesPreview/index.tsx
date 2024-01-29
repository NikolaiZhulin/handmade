import { FC } from 'react';

import { getImage } from '@/helpers/getImage';
import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  image: string;
  isActive: boolean;
  onClick: () => void;
}

const ImagesPrewiev: FC<IProps> = ({ image, isActive, onClick }) => {
  return (
    <div
      className={mergeStyles(
        style.ImagesPrewiev,
        isActive && style.active,
        'xs:!w-[90px] xs:!h-[70px] xs:shrink-0',
      )}
      onClick={onClick}
    >
      <img className={style.Images} src={getImage(image)} alt="" />
    </div>
  );
};

export default ImagesPrewiev;
