import { FC } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from '../style.module.scss';

interface IProps {
  file: File;
  index: number;
  activeImage: boolean;
  updateActiveIndex: (i: number) => void;
}

export const PreviewImage: FC<IProps> = ({ file, index, activeImage, updateActiveIndex }) => {
  return (
    <div className={style.ImgContainer}>
      <img
        key={file.name}
        src={URL.createObjectURL(file)}
        className={mergeStyles(style.image, activeImage && style.active, 'cursor-pointer')}
        onClick={() => updateActiveIndex(index)}
      />
    </div>
  );
};
