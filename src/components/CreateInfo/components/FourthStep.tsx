import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { CreatePostContext } from '@/contexts/CreatePostContext';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
// import Swiper from '@/components/Swiper';
import { CURRENCY_SYMBOLS } from '@/constants/currency';
import { CategoryBadge } from '@/layout/RightBlockPost/components/CategoryBadge';
import { PostAddress } from '@/layout/RightBlockPost/components/Address';
import { Contacts } from '@/layout/RightBlockPost/components/Contacts';
import Button from '@/ui/Button';
import { useCreatePost } from '@/api/posts/create-post';
import { IPostContactInfo } from '@/types/posts';
import StatusModal from '@/components/modals/StatusModal';

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
      name: dataToMap.contactName,
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
        toast.success(t('modals.post.createSuccessTitle'));
      },
      onError: (e) => {
        setModalType('error');
        setErrorText(
          `${e.response?.data.errors?.[0].field} ${e.response?.data.errors?.[0].message}`,
        );
      },
    });
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
      <div className={style.back}>
        <button onClick={handleBack} className={cn(style['back-btn'], '2xl:!gap-[14px]')}>
          <HomeSvgSelector id="arrow-left" />
          <Typography variant="heading3">{t('back')}</Typography>
        </button>
      </div>
      <Typography className="2xl:my-[14px]" variant="heading2">
        Все ли верно?
      </Typography>
      {/*<Swiper images={[]} keyUpdater={false} swiperHeight={'2xl:h-[637px] xs:h-[295px]'} />*/}
      <div className="2xl:py-[14px] 2xl:!p-0 2xl:mt-[14px]">
        <Typography variant="heading1" color="brand" className="mt-auto">
          {state.price === 0
            ? t('main.dealPrice')
            : `${state.price} ${CURRENCY_SYMBOLS[state.currency]}`}
        </Typography>
      </div>
      {state.requestCategories.map((badge) => (
        <CategoryBadge value={badge} key={badge} />
      ))}
      <PostAddress city={state.city} address={state.address} className="2xl:mb-[15px]" />
      <div className="flex flex-col gap-[14px]">
        {state.textRu && (
          <div>
            <Typography variant="heading2">
              {t('post.descriptionTitle')} {(state.textEn || state.textGe) && t('preview.ru')}
            </Typography>
            <Typography variant="heading3">{state.textRu}</Typography>
          </div>
        )}
        {state.textGe && (
          <div>
            <Typography variant="heading2">
              {t('post.descriptionTitle')} {(state.textEn || state.textRu) && t('preview.ge')}
            </Typography>
            <Typography variant="heading3">{state.textGe}</Typography>
          </div>
        )}
        {state.textEn && (
          <div>
            <Typography variant="heading2">
              {t('post.descriptionTitle')} {(state.textGe || state.textRu) && t('preview.en')}
            </Typography>
            <Typography variant="heading3">{state.textEn}</Typography>
          </div>
        )}
        <div>
          <Typography variant="heading2">Контакты</Typography>
          <Contacts
            contacts={{
              ...state,
            }}
            className="2xl:!py-0"
            hideButtons={true}
          />
        </div>
        <Button
          className={cn(style.ButtonNext, '2xl:mt-auto')}
          onClick={handlePost}
          disabled={isLoading}
        >
          {t('post.post')}
        </Button>
      </div>
    </div>
  );
};
