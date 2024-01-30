import { FC, useContext, useState } from 'react';

import Stub from '@/layout/Stub';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { cities } from '@/constants/cities';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';

import style from './style.module.scss';
import { PreviewImages } from './components/PreviewImages';

interface IProps {}

const CreatePreview: FC<IProps> = ({}) => {
  const [state] = useContext(CreatePostContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect();

  const {
    textRu,
    textEn,
    textGe,
    name,
    price,
    currency,
    files,
    isUsed,
    usedPeriod,
    usedAmount,
    city,
    requestCategories,
  } = state;

  const updateActiveIndex = (ind: number) => () => {
    setActiveIndex(ind);
  };

  return (
    <>
      {[name, price, currency].every((el) => el) ? (
        <div className={style.wrapper}>
          <Typography variant="heading4" className={style.grayText}>
            {t('preview.title')}
          </Typography>
          <Typography variant="heading2">{name}</Typography>
          <div className={style.images}>
            {files.map((file, i) => (
              <PreviewImages
                file={file}
                index={i}
                activeIndex={activeIndex}
                updateActiveIndex={updateActiveIndex}
                key={i}
              />
            ))}
          </div>
          <div>
            <Typography variant="heading1" className={style.price}>
              {price} {currency}
            </Typography>
            {isUsed && (
              <Typography variant="heading4" className={style.grayText}>
                {usedAmount} {usedPeriod} {t('post.used')}
              </Typography>
            )}
          </div>
          {city && (
            <div className={style.flex}>
              <div className={style.flex}>
                <HomeSvgSelector id="city-placeholder" />
                <Typography variant="heading3">
                  {t(cities.find((el) => el.value === city)?.label ?? '')}
                </Typography>
              </div>
              {!!requestCategories.length &&
                requestCategories.map((item) => (
                  <Typography variant="heading3" className={style.categoryItem} key={item}>
                    {categories.find((el) => el.value === item)?.label}
                  </Typography>
                ))}
            </div>
          )}
          {textRu && (
            <>
              <Typography variant="heading2">
                {t('post.descriptionTitle')} {(textEn || textGe) && t('preview.ru')}
              </Typography>
              <Typography variant="heading3">{textRu}</Typography>
            </>
          )}
          {textGe && (
            <>
              <Typography variant="heading2">
                {t('post.descriptionTitle')} {(textEn || textRu) && t('preview.ge')}
              </Typography>
              <Typography variant="heading3">{textGe}</Typography>
            </>
          )}
          {textEn && (
            <>
              <Typography variant="heading2">
                {t('post.descriptionTitle')} {(textGe || textRu) && t('preview.en')}
              </Typography>
              <Typography variant="heading3">{textEn}</Typography>
            </>
          )}
        </div>
      ) : (
        <Stub>
          <HomeSvgSelector id="document" />
          <Typography variant="heading2">{t('preview.title2')}</Typography>
          <Typography variant="heading5">{t('preview.access')}</Typography>
        </Stub>
      )}
    </>
  );
};

export default CreatePreview;