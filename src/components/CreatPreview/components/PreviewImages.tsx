import { FC } from 'react';

import { mergeStyles } from '@/helpers/mergeStyles';

import style from '../style.module.scss';

interface IProps {
  file: File;
  index: number;
  activeIndex: number;
  updateActiveIndex: (i: number) => () => void;
}

export const PreviewImages: FC<IProps> = ({ file, index, activeIndex, updateActiveIndex }) => {
  return (
    <div className={style.ImgComtainer}>
      <img
        key={file.name}
        src={URL.createObjectURL(file)}
        className={mergeStyles(style.image, index === activeIndex && style.active)}
        onClick={updateActiveIndex(index)}
      />
    </div>
  );
};
