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
import Textarea from '@/ui/Textarea';

const FeedbackModal = () => {
  const [{ feedbackModal }, setModal] = useContext(ModalContext);
  const { t } = useTranslation();
  const { mutate: createFeedback } = useCreateFeedback(() => {
    toast.success(t('toasts.messageSent'));
  }, getErrorToast);
  const isFullScreen = useMediaQuery('(max-width: 600px)');

  const schema = z.object({
    description: z.string({ required_error: t('errors.required') }),
    name: z.string(),
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
      name: '',
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
        backdropClassName="xs:!w-full xs:!top-0 xs:!h-full"
        outerWrapperClassName="xs:h-full"
        keepBackdrop
      >
        <div
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] gap-[22px] translate-y-[-50%] border bg-background p-[30px] shadow-lg duration-200 w-[420px] xs:!w-[345px]',
          )}
        >
          <div
            className={cn(
              'text-[18px] leading-[24px] font-bold font-montserrat flex justify-center',
            )}
          >
            {t('modals.feedback')}
          </div>
          <div className={cn('flex items-center flex-col w-full gap-[14px]')}>
            <div className={cn('flex w-full flex-col gap-4', 'xs:w-full')}>
              <Textarea
                controllerProps={{ control, name: 'description' }}
                placeholder={t('inputs.feedbackDesc')}
              />
              <Input controllerProps={{ control, name: 'name' }} placeholder={t('inputs.name')} />
              <Input
                controllerProps={{ control, name: 'email' }}
                placeholder={t('inputs.feedbackEmail')}
              />
            </div>
            <div className="w-full mt-auto">
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
