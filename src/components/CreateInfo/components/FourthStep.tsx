import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
// import Swiper from '@/components/Swiper';
import { useCreatePost } from '@/api/posts/create-post';
import StatusModal from '@/components/modals/StatusModal';
import { CURRENCY_SYMBOLS } from '@/constants/currency';
import { PostAddress } from '@/layout/RightBlockPost/components/Address';
import { CategoryBadge } from '@/layout/RightBlockPost/components/CategoryBadge';
import { Contacts } from '@/layout/RightBlockPost/components/Contacts';
import Button from '@/ui/Button';
import Swiper from '@/components/Swiper';
import { mergeStyles } from '@/helpers/mergeStyles';
import type { IPostContactInfo } from '@/types/posts';

import style from '../style.module.scss';

interface IProps {
  onStep: (direction: number) => void;
}

export const FourthStep: FC<IProps> = ({ onStep }) => {
  const [state] = useContext(CreatePostContext);
  const { t } = useTranslation();
  const { mutate: createPost, isLoading } = useCreatePost();
  const { push } = useRouter();
  const [errorText, setErrorText] = useState('');
  const [modalType, setModalType] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    textRu,
    textEn,
    textGe,
    contacts,
    files,
    requestCategories,
    requestMaterials,
    requestSamples,
    requestStones,
    careRecommendations,
    bijouterie,
    size,
    sex,
  } = state;
  const handleBack = () => {
    onStep(-1);
  };

  const handlePost = () => {
    const payload = new FormData();

    const dataToMap = { ...state };

    Object.entries(dataToMap).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === 'files') {
          value.forEach((file) => {
            payload.append('images', file);
          });
        } else {
          payload.append(key, JSON.stringify(value));
        }
      } else if (typeof value === 'object') {
        payload.append(key, JSON.stringify(value));
      } else {
        value !== undefined && payload.append(key, `${value}`);
      }
    });

    const contacts: IPostContactInfo = {
      phone: dataToMap.phone,
      additionalPhone: dataToMap.additionalPhone,
      telegram: dataToMap.telegram,
      viber: dataToMap.viber,
      whatsApp: dataToMap.whatsApp,
      facebook: dataToMap.facebook,
      contactName: dataToMap.contactName,
      isPhoneActive: !dataToMap.phone ? false : dataToMap.isPhoneActive,
      isViberActive: !dataToMap.viber ? false : dataToMap.isViberActive,
      isAdditionalPhoneActive: !dataToMap.additionalPhone
        ? false
        : dataToMap.isAdditionalPhoneActive,
      isFacebookActive: !dataToMap.facebook ? false : dataToMap.isFacebookActive,
      isTelegramActive: !dataToMap.telegram ? false : dataToMap.isTelegramActive,
      isWhatsappActive: !dataToMap.whatsApp ? false : dataToMap.isWhatsappActive,
    };

    payload.append('contacts', JSON.stringify(contacts));
    payload.append('source', 'web');

    createPost(payload, {
      onSuccess: () => {
        push('/');
        toast.success(t('modals.post.createSuccessTitle'), { autoClose: 7000 });
      },
      onError: (e) => {
        setModalType('error');
        setErrorText(
          `${e.response?.data.errors?.[0].field} ${e.response?.data.errors?.[0].message}`,
        );
      },
    });
  };

  const sexesMap: Record<string, string> = {
    for_him: t('for_him'),
    for_her: t('for_her'),
  };

  return (
    <div className="2xl:pb-[14px]">
      {modalType && (
        <StatusModal
          title={
            modalType === 'error'
              ? t('modals.post.createErrorTitle')
              : t('modals.post.createSuccessTitle')
          }
          subtitle={(modalType === 'error' && errorText) || ''}
          type={modalType as 'error' | 'success'}
          isOpen={!!modalType}
          action={() => (modalType === 'error' ? setModalType('') : push('/'))}
        />
      )}
      <div className={cn(style.back, 'xs:!py-[10px]  2xl:!py-[10px] xs:!px-[15px] 2xl:!px-[30px]')}>
        <button onClick={handleBack} className={cn(style['back-btn'], '2xl:!gap-[14px]')}>
          <HomeSvgSelector id="arrow-left" />
          <Typography variant="heading3">{t('back')}</Typography>
        </button>
      </div>
      {files.length > 0 && (
        <>
          <Typography className="2xl:py-[14px] xs:!px-[15px] 2xl:!px-[30px]" variant="heading2">
            {t('post.isCorrect')}
          </Typography>

          <Swiper
            images={files}
            keyUpdater={false}
            swiperHeight={'2xl:h-[542px] xs:h-[300px]'}
            activeIndex={currentIndex}
            onIndexChange={(index) => setCurrentIndex(index)}
            withCounter
            leftButton={(onClick) => (
              <>
                {files.length > 1 && (
                  <button className={style.SliderButton} onClick={onClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="28"
                      viewBox="0 0 17 28"
                      fill="none"
                    >
                      <path
                        d="M2 2L14 14L2 26"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}
            rightButton={(onClick) => (
              <>
                {files.length > 1 && (
                  <button
                    onClick={onClick}
                    className={mergeStyles(style.SliderButton, style.right)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="28"
                      viewBox="0 0 17 28"
                      fill="none"
                    >
                      <path
                        d="M2 2L14 14L2 26"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}
          />
        </>
      )}
      <div className="xs:!px-[15px] 2xl:!px-[30px]">
        <div className="flex flex-col 2xl:py-[14px] 2xl:mt-[14px] gap-[4px]">
          <Typography variant="heading2">{state.name}</Typography>
          <Typography variant="heading2" className={cn(style.price, 'mt-auto !text-[24px]')}>
            {state.price === 0
              ? t('main.dealPrice')
              : `${state.price} ${CURRENCY_SYMBOLS[state.currency]}`}
          </Typography>
          <div className="flex items-center gap-[14px]">
            <PostAddress city={state.requestCity[0]} address={state.address} className="!p-0" />
            {requestCategories.map((badge) => (
              <CategoryBadge value={badge} key={badge} className="!p-0" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[14px]">
          {textRu && (
            <div className="py-[4px] gap-[8px]">
              <Typography variant="heading2">
                {t('post.descriptionTitle')} {(state.textEn || state.textGe) && t('preview.ru')}
              </Typography>
              <Typography variant="heading3">{state.textRu}</Typography>
            </div>
          )}
          {textGe && (
            <div className="py-[4px] gap-[8px]">
              <Typography variant="heading2">
                {t('post.descriptionTitle')} {(state.textEn || state.textRu) && t('preview.ge')}
              </Typography>
              <Typography variant="heading3">{state.textGe}</Typography>
            </div>
          )}
          {textEn && (
            <div className="py-[4px] gap-[8px]">
              <Typography variant="heading2">
                {t('post.descriptionTitle')} {(state.textGe || state.textRu) && t('preview.en')}
              </Typography>
              <Typography variant="heading3">{state.textEn}</Typography>
            </div>
          )}
          <div className="flex flex-col gap-[14px]">
            <Typography variant="heading2" className="py-[4px]">
              {t('post.parameters')}
            </Typography>
            <div className="flex  w-full justify-between">
              <div className="flex flex-1 flex-col gap-2 items-start">
                <Typography className={style.grayText} variant="heading3">
                  {t('post.bijouterie')}
                </Typography>
                <Typography className={style.grayText} variant="heading3">
                  {t('post.material')}
                </Typography>
                <Typography className={style.grayText} variant="heading3">
                  {t('inputs.sample')}
                </Typography>
                <Typography className={style.grayText} variant="heading3">
                  {t('inputs.stone')}
                </Typography>
                <Typography className={style.grayText} variant="heading3">
                  {t('inputs.bijouterie')}
                </Typography>
                <Typography className={style.grayText} variant="heading3">
                  {t('inputs.size')}
                </Typography>
                <Typography className={style.grayText} variant="heading3">
                  {t('inputs.careRecommendations')}
                </Typography>
                <Typography className={style.grayText} variant="heading3">
                  {t('sex')}
                </Typography>
              </div>
              <div className="flex flex-1 flex-col gap-2 items-start">
                <Typography variant="heading3">
                  {requestCategories[0] ? t(`categories.${requestCategories[0]}`) : t('absent')}
                </Typography>
                <Typography variant="heading3">
                  {requestMaterials[0] ? t(`metals.${requestMaterials[0]}`) : t('absent')}
                </Typography>
                <Typography variant="heading3">
                  {requestSamples[0] ? requestSamples[0] : t('absent')}
                </Typography>
                <Typography variant="heading3">
                  {requestStones[0] ? t(`stones.${requestStones[0]}`) : t('absent')}
                </Typography>
                <Typography variant="heading3">{bijouterie ? t('yes') : t('no')}</Typography>
                <Typography variant="heading3">{size ? size : t('absent')}</Typography>
                <Typography variant="heading3">
                  {careRecommendations ? careRecommendations : t('absent')}
                </Typography>
                <Typography variant="heading3">
                  {sex.length ? sex.map((s) => <span key={s}>{sexesMap[s]}</span>) : t('absent')}
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <Typography variant="heading2">Контакты</Typography>
            <Contacts contacts={contacts} className="2xl:!py-0" hideButtons={true} />
          </div>
          <Button
            className={cn(style.ButtonNext, '2xl:mt-auto !w-full')}
            onClick={handlePost}
            disabled={isLoading}
          >
            {t('post.post')}
          </Button>
        </div>
      </div>
    </div>
  );
};
