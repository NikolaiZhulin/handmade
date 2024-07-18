import { FC, ReactNode } from 'react';

import FlexContainer from '@/layout/FlexContainer';
import { getImage } from '@/helpers/getImage';
import Typography from '@/ui/Typography';
import { ImageService } from '@/constants/enums';

import styles from './styles.module.scss';

interface IProps {
  name: string;
  subtext: ReactNode;
  image?: string;
  preview?: string;
  nameColor?: 'black' | 'white';
  smallUserName?: boolean;
}

const NameBlock: FC<IProps> = ({ name, subtext, image, smallUserName, preview, nameColor }) => {
  return (
    <FlexContainer gap={14} justify="start">
      <div className={styles.image}>
        {preview ? (
          <img src={preview} alt="profile photo" title="profile photo" />
        ) : image ? (
          <img
            src={image.startsWith('http') ? image : getImage(ImageService.AUTH, image)}
            alt="profile photo"
            title="profile photo"
          />
        ) : (
          <Typography variant={'heading2'}>{name[0]}</Typography>
        )}
      </div>
      <div>
        <Typography
          variant="heading2"
          weight={700}
          color={nameColor}
          className={smallUserName ? '!text-[14px]' : ''}
        >
          {name}
        </Typography>
        <Typography variant="text3" color="gray">
          {subtext}
        </Typography>
      </div>
    </FlexContainer>
  );
};

export default NameBlock;
