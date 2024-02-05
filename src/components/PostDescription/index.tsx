import { FC, useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ButtonLogin from '@/ui/ButtonLogin';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { UserContext } from '@/contexts/UserContext';
import Modal from '@/containers/Modal';
import AuthWrapper from '@/containers/AuthWrapper';
import { AuthFormType, ReportPostReason } from '@/constants/enums';
import Checkbox from '@/ui/Checkbox';
import Textarea from '@/ui/Textarea';
import Button from '@/ui/Button';
import { useCreateReport } from '@/api/reports/create-report';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ModalContext } from '@/contexts/ModalContext';
import { cn } from '@/utils/utils';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import { REPORT_ITEMS } from './config';
import style from './style.module.scss';

interface IProps {
  text: string;
  postId: string;
}

interface FormState {
  sold: boolean;
  wrongPrice: boolean;
  wrongDescription: boolean;
  wrongAddress: boolean;
  breakRules: boolean;
  scammer: boolean;
  reason: string;
}

const PostDescription: FC<IProps> = ({ text, postId }) => {
  const { t } = useTranslation();
  const [state] = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modals, setModal] = useContext(ModalContext);
  const { mutate: createReport } = useCreateReport();
  const isFullScreen = useMediaQuery('(max-width: 1200px)');
  // const [isFullText, setIsFullText] = useState(false);
  // const [textHeight, setTextHeight] = useState('154px');
  const textRef = useRef<HTMLParagraphElement | null>(null);

  // useLayoutEffect(() => {
  //   const textHeight = textRef.current?.getBoundingClientRect().height;
  //
  //   if (textHeight && textHeight < 154) {
  //     setTextHeight('auto');
  //     return;
  //   }
  //
  //   if (isFullText) {
  //     setTextHeight(`${textHeight}px`);
  //   } else {
  //     setTextHeight('154px');
  //   }
  // }, [isFullText]);

  const { control, reset, watch, setValue, handleSubmit } = useForm<FormState>({
    defaultValues: {
      sold: false,
      wrongPrice: false,
      wrongDescription: false,
      wrongAddress: false,
      breakRules: false,
      scammer: false,
    },
  });

  const formValues = watch();

  const handleCloseModal = () => setIsModalOpen(false);

  const handleCheckbox = (fieldName: string, value?: boolean | string | number) => {
    reset({
      sold: false,
      wrongPrice: false,
      wrongDescription: false,
      wrongAddress: false,
      breakRules: false,
      scammer: false,
      reason: formValues.reason,
    });
    setValue(fieldName as keyof FormState, value as boolean);
  };

  const handleSendReport = () => {
    handleSubmit((values) => {
      const reason = Object.entries(values).find((el) => el[1] === true);
      createReport(
        { message: values.reason, reason: reason?.[0] as ReportPostReason, postId },
        {
          onSuccess: () => {
            toast.success(t('toasts.reportCreated'));
            reset({
              sold: false,
              wrongPrice: false,
              wrongDescription: false,
              wrongAddress: false,
              breakRules: false,
              scammer: false,
              reason: '',
            });
            setModal({ postReport: false });
          },
          onError: getErrorToast,
        },
      );
    })();
  };

  return (
    <>
      <div
        className={cn(
          style.PostDescription,
          '2xl:mt-[18px] 2xl:!px-[30px] 2xl:!gap-[12px] 2xl:!border-none xs:mt-[14px] xs:!px-[15px]',
        )}
      >
        <Typography variant="heading2" weight={700}>
          {t('post.descriptionTitle')}
        </Typography>
        <div className={cn('transition-all duration-250 ease-out 2xl:overflow-hidden')}>
          <Typography ref={textRef} variant="text1">
            {text}
          </Typography>
        </div>
        {/*{isFullScreen && (*/}
        {/*  <Button*/}
        {/*    color="neutral"*/}
        {/*    fullWidth={true}*/}
        {/*    className={cn('2xl:!h-[32px]', textHeight === 'auto' && '2xl:!hidden')}*/}
        {/*    onClick={() => setIsFullText((prev) => !prev)}*/}
        {/*  >*/}
        {/*    <Typography variant="text3" weight={400}>*/}
        {/*      {isFullText ? 'Скрыть' : 'Показать'}*/}
        {/*    </Typography>*/}
        {/*  </Button>*/}
        {/*)}*/}
        <ButtonLogin
          className={cn(style.ButtonLogin, '2xl:!w-full')}
          onClick={() =>
            state.accessToken ? setModal({ postReport: true }) : setIsModalOpen(true)
          }
        >
          <HomeSvgSelector id="warning" />
          {t('report')}
        </ButtonLogin>
        <Modal
          isVisible={modals.postReport}
          onClose={() => setModal({ postReport: false })}
          outerWrapperClassName="2xl:h-[calc(var(--app-height)-72px)] xs:h-[calc(var(--app-height)-60px)]"
          backdropClassName="xs:!h-[calc(var(--app-height)-60px)] xs:!top-[60px] 2xl:!h-[calc(var(--app-height)-72px)] 2xl:!top-[72px]"
        >
          <div className="w-[360px] flex flex-col gap-[14px] 2xl:w-full h-full">
            {isFullScreen && (
              <button
                className="flex items-center gap-[14px]"
                onClick={() => setModal({ postReport: false })}
              >
                <HomeSvgSelector id="arrow-left" />
                <Typography variant="heading3" className="xs:!text-[14px]">
                  {t('back')}
                </Typography>
              </button>
            )}
            <Typography variant="heading3" weight={700}>
              {t('post.reportTitle')}
            </Typography>
            <div>
              {REPORT_ITEMS.map((el, i) => (
                <Checkbox
                  className={`py-[10px] !w-full ${
                    i !== REPORT_ITEMS.length - 1 && 'border-b-[1px] border-solid border-light-gray'
                  }`}
                  controllerProps={{ control, name: el.value }}
                  key={el.value}
                  id={el.value}
                  onChangeCustom={handleCheckbox}
                  checked={formValues[el.value]}
                >
                  {t(el.label)}
                </Checkbox>
              ))}
            </div>
            <Textarea
              controllerProps={{ control, name: 'reason' }}
              placeholder={t('inputs.reportReason')}
            />
            <Button fullWidth={true} onClick={handleSendReport} className="2xl:mt-auto">
              {t('post.report.send')}
            </Button>
          </div>
        </Modal>
        <Modal
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          keepBackdrop={true}
          outerWrapperClassName="w-[420px] 2xl:w-[420px] xs:w-[335px]"
          innerWrapperClassName="!w-[420px] 2xl:!w-[420px] xs:w-[335px] xs:!p-[30px]"
        >
          <AuthWrapper
            successAction={() => setModal({ postReport: true })}
            onClose={handleCloseModal}
            isOpen={isModalOpen}
            title={
              <div>
                <Typography variant="heading3" weight={700}>
                  {t('auth.needToAuth')}
                </Typography>
                <Typography variant="heading3" color="gray">
                  {t('auth.enterToContinue')}
                </Typography>
              </div>
            }
            defaultState={AuthFormType.LOGIN}
            keepButton={true}
            hideBackButton={true}
            className="2xl:items-start"
          />
        </Modal>
      </div>
    </>
  );
};

export default PostDescription;
