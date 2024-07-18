import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useDeletePost } from '@/api/posts/delete-post';
import { useUpdatePost } from '@/api/posts/update-post';
import Modal from '@/components/modals/Modal';
import { CURRENCY_SYMBOLS } from '@/constants/currency';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { capitalize } from '@/helpers/capitalize';
import { getImage } from '@/helpers/getImage';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useTranslation } from '@/hooks/useTranslation';
import FlexContainer from '@/layout/FlexContainer';
import { IUserPostPreview, PostNameKeys } from '@/types/posts';
import Button from '@/ui/Button';
import Switch from '@/ui/Switch';
import Typography from '@/ui/Typography';
import { ImageService } from '@/constants/enums';

import styles from './styles.module.scss';

interface IProps {
  withBorder: boolean;
  post: IUserPostPreview;
  disabled: boolean;
  refetch: () => void;
}

const ProfilePost: FC<IProps> = ({ withBorder, post, disabled, refetch }) => {
  const { asPath } = useRouter();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost(refetch, getErrorToast);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { control, watch } = useForm({
    defaultValues: {
      isActive: post.isActive,
    },
  });

  const { isActive } = watch();

  useEffect(() => {
    if (isActive !== post.isActive) {
      const formData = new FormData();
      formData.append('isActive', isActive.toString());
      updatePost({ id: post.id, data: formData }, { onSuccess: refetch });
    }
  }, [isActive]);

  const nameKey = `name${capitalize(language)}`;

  return (
    <FlexContainer className={mergeStyles(styles.wrapper, withBorder && styles.withBorder)}>
      <FlexContainer className={mergeStyles(styles.h100, 'gap-[22px]')}>
        <FlexContainer direction="column" gap={8} className={styles.h100}>
          <div className={mergeStyles(styles.image, disabled && styles.disabled)}>
            {post.images.length ? (
              <img src={getImage(ImageService.POSTS, post.images[0])} />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>
          {/* <Button fullWidth={true} className={styles.button} disabled={disabled}>
            {t('profile.risePost')}
          </Button> */}
        </FlexContainer>
        <FlexContainer direction="column" align="start" gap={8} className={styles.h100}>
          <FlexContainer
            direction="column"
            align="start"
            className={styles.textContainer}
            justify="evenly"
          >
            <Typography variant="heading3" weight={500}>
              {post[nameKey as keyof PostNameKeys]}
            </Typography>
            <Typography variant="heading3" color={disabled ? 'gray' : 'brand'} weight={700}>
              {post.price} {CURRENCY_SYMBOLS[post.currency]}
            </Typography>
            <Typography variant="heading3" color="gray">
              20 {t('profile.postViews')}
            </Typography>
          </FlexContainer>
          <Link href={`${asPath}/${post.id}`}>
            <Button className={mergeStyles(styles.button, styles.edit)} color="ghost">
              {t('profile.edit')}
            </Button>
          </Link>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer direction="column" className={styles.h100}>
        <FlexContainer className={styles.h100}>
          <Switch controllerProps={{ control, name: 'isActive' }} />
        </FlexContainer>
        <Modal
          trigger={
            <Button className={mergeStyles(styles.button, styles.delete)} color="ghost">
              {t('delete')}
            </Button>
          }
          confirmHandler={() => deletePost(post.id)}
          header={t('profile.postDeleteWarn')}
        />
      </FlexContainer>
    </FlexContainer>
  );
};

export default ProfilePost;
