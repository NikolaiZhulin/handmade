import { FC, ReactNode } from 'react';

import FlexContainer from '@/layout/FlexContainer';
import Heading1 from '@/ui/Heading1';
import { getImage } from '@/helpers/getImage';
import Typography from '@/ui/Typography';

import styles from './styles.module.scss';

interface IProps {
  name: string;
  subtext: ReactNode;
  image?: string;
  preview?: string;
  nameColor?: 'black' | 'white';
}

const NameBlock: FC<IProps> = ({ name, subtext, image, preview, nameColor }) => {
  return (
    <FlexContainer gap={14} justify="start">
      <div className={styles.image}>
        {preview ? (
          <img src={preview} alt="profile photo" title="profile photo" />
        ) : image ? (
          <img
            src={image.startsWith('http') ? image : getImage(image, 'profiles')}
            alt="profile photo"
            title="profile photo"
          />
        ) : (
          <Heading1>{name[0]}</Heading1>
        )}
      </div>
      <div>
        <Typography variant="heading3" weight={700} color={nameColor}>
          {name}
        </Typography>
        <Typography variant="heading4" color="gray">
          {subtext}
        </Typography>
      </div>
    </FlexContainer>
  );
};

export default NameBlock;
