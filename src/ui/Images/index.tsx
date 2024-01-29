import { FC, PropsWithChildren } from 'react';

import { getImage } from '@/helpers/getImage';
import { mergeStyles } from '@/helpers/mergeStyles';

import style from './style.module.scss';

interface IProps {
  images: string[];
  title: string;
  isGrid?: boolean;
}

const Images: FC<PropsWithChildren<IProps>> = ({ images, title, isGrid }) => {
  return (
    <div
      className={mergeStyles(
        style.Images,
        isGrid && style.Grid,
        !images.length && style.placeholder,
      )}
    >
      {images[0] && <img src={getImage(images[0])} alt={title} title={title} loading="lazy" />}
    </div>
  );
};

export default Images;
