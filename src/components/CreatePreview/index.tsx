import { FC, useContext, useState } from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { cities } from '@/constants/cities';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { useTranslation } from '@/hooks/useTranslation';
import Stub from '@/layout/Stub';
import Typography from '@/ui/Typography';

import { PreviewImage } from './components/PreviewImages';
import style from './style.module.scss';

interface IProps {
  step: number;
}

const CreatePreview: FC<IProps> = ({ step }) => {
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
    requestCategories,
    city,
    material,
    sample,
    stone,
    recommendations,
    bijouterie,
    size,
    sex,
    madeBy,
  } = state;
  // const { formState } = useForm<FormState>();
  const hasAllRequiredFields = name && currency && (price || price === 0);

  const sexesMap: Record<string, string> = {
    for_him: t('for_him'),
    for_her: t('for_her'),
  };

  return (
    <>
      {hasAllRequiredFields ? (
        <div className={style.wrapper}>
          <Typography variant="heading3" className={style.grayText}>
            {t('preview.title')}
          </Typography>
          <Typography variant="heading2">{name}</Typography>
          <div className={style.images}>
            {files.map((file, i) => (
              <PreviewImage
                key={i + '1'}
                file={file}
                index={i}
                activeImage={activeIndex === i}
                updateActiveIndex={(i) => setActiveIndex(i)}
              />
            ))}
          </div>
          <div>
            <Typography variant="heading2" className={style.price}>
              {price} {currency}
            </Typography>
          </div>
          {!!city && (
            <div className={style.flex}>
              <div className={style.flex}>
                <HomeSvgSelector id="geo" />
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
          {step === 2 && (
            <>
              <div className="flex flex-col gap-[8px]">
                <Typography variant="heading2" className="mt-[4px] mb-[18px]">
                  {t('post.parameters')}
                </Typography>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('inputs.category')}
                  </Typography>
                  <Typography variant="heading3">
                    {requestCategories[0] ? t(`categories.${requestCategories[0]}`) : t('absent')}
                  </Typography>
                </div>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('metal')}
                  </Typography>
                  <Typography variant="heading3">
                    {material ? t(`metals.${material}`) : t('absent')}
                  </Typography>
                </div>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('inputs.sample')}
                  </Typography>
                  <Typography variant="heading3">{sample ? sample : t('absent')}</Typography>
                </div>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('stone')}
                  </Typography>
                  <Typography variant="heading3">
                    {stone ? t(`stones.${stone}`) : t('absent')}
                  </Typography>
                </div>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('post.bijouterie')}
                  </Typography>
                  <Typography variant="heading3">{bijouterie ? t('yes') : t('no')}</Typography>
                </div>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('size')}
                  </Typography>
                  <Typography variant="heading3">{size ? size : t('absent')}</Typography>
                </div>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('sex')}
                  </Typography>
                  <Typography variant="heading3">
                    {sex ? <span key={sex}>{sexesMap[sex]}</span> : t('absent')}
                  </Typography>
                </div>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('inputs.product')}
                  </Typography>
                  <Typography variant="heading3" className={'break-all'}>
                    {madeBy ? t(madeBy) : t('absent')}
                  </Typography>
                </div>
                <div className="flex w-full gap-[10px] [&>p]:flex-1 justify-between">
                  <Typography className={style.grayText} variant="heading3">
                    {t('careRecommendations')}
                  </Typography>
                  <Typography variant="heading3" className={'break-all'}>
                    {recommendations ? recommendations : t('absent')}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Stub>
          <img src="/images/create_ad.png" className="w-[585px] h-[300px]" />
          <div className="flex flex-col items-center gap-1">
            <Typography variant="heading2">{t('preview.title2')}</Typography>
            <Typography variant="heading3">{t('preview.access')}</Typography>
          </div>
        </Stub>
      )}
    </>
  );
};

export default CreatePreview;
