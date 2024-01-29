import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { useCreateFeedback } from '@/api/feedback/create-feedback';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { getErrorToast } from '@/helpers/aggregateErrorsMessage';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Modal from '@/containers/Modal';
import { ModalContext } from '@/contexts/ModalContext';

const FeedbackModal = () => {
  const [{ feedbackModal }, setModal] = useContext(ModalContext);
  const { t } = useTranslation();
  const { mutate: createFeedback } = useCreateFeedback(() => {
    toast.success(t('toasts.messageSent'));
  }, getErrorToast);
  const isFullScreen = useMediaQuery('(max-width: 1200px)');

  const schema = z.object({
    description: z.string({ required_error: t('errors.required') }),
    email: z.string({ required_error: t('errors.required') }).email(t('errors.wrongEmail')),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues: {
      description: '',
      email: '',
    },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const submitClick = () => {
    handleSubmit((values) => {
      createFeedback(values);
      setModal({ feedbackModal: false });
      reset();
    })();
  };

  return (
    <div>
      <button
        className="p-2 rounded-[6px] bg-dark-gray"
        onClick={() => setModal({ feedbackModal: true })}
      >
        <HomeSvgSelector id="feedback" />
      </button>
      <Modal
        isVisible={feedbackModal}
        onClose={() => setModal({ feedbackModal: false })}
        backdropClassName="xs:!w-full"
        outerWrapperClassName="xs:h-full"
      >
        <div
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] border bg-background p-[30px] shadow-lg duration-200 rounded-[12px] w-[420px]',
            '2xl:w-full 2xl:h-full 2xl:rounded-none 2xl:flex 2xl:flex-col 2xl:gap-[22px] 2xl:items-center',
            'xs:w-full xs:px-[20px] xs:py-[14px]',
          )}
        >
          {isFullScreen && (
            <button
              className="flex items-center gap-[14px] h-[44px] self-start xs:h-[24px]"
              onClick={() => setModal({ feedbackModal: false })}
            >
              <HomeSvgSelector id="arrow-left" />
              <Typography variant="heading3">{t('back')}</Typography>
            </button>
          )}
          <div className={cn('flex flex-col gap-[14px]', '2xl:align-start xs:w-full 2xl:h-full')}>
            <div className={cn('text-[18px] leading-[24px] font-bold font-montserrat mb-2')}>
              {t('modals.feedback')}
            </div>
            <div className={cn('flex flex-col gap-4', '2xl:w-[410px] xs:w-full')}>
              <Input
                controllerProps={{ control, name: 'description' }}
                placeholder={t('inputs.feedbackDesc')}
              />
              <Input
                controllerProps={{ control, name: 'email' }}
                placeholder={t('inputs.feedbackEmail')}
              />
            </div>
            <div className="mt-auto">
              <Button fullWidth={true} disabled={!isValid} onClick={submitClick}>
                <Typography variant="heading3" weight={500} color="white">
                  {t('modals.send')}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
