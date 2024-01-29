import { FC, MouseEvent, PropsWithChildren, useState } from 'react';

import Typography from '@/ui/Typography';
import Button from '@/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog';

interface IProps {
  text: string;
  confirmHandler: (e: MouseEvent) => void;
  approveText?: string;
  declintText?: string;
  triggerClassName?: string;
  declineHandler?: () => void;
}

const ConfirmBeforeClick: FC<PropsWithChildren<IProps>> = ({
  text,
  children,
  confirmHandler,
  declineHandler,
  approveText,
  declintText,
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className={triggerClassName}>{children}</DialogTrigger>
      <DialogContent className="w-[420px] xs:w-[calc(100%-40px)] xs:rounded-[12px]">
        <DialogHeader>
          <Typography variant="heading2">{text}</Typography>
        </DialogHeader>
        <DialogFooter className="justify-between gap-2 mt-[20px] xs:flex-nowrap xs:flex-row">
          <Button
            className="!w-1/2"
            color="neutral"
            onClick={() => {
              setIsOpen(false);
              declineHandler?.();
            }}
          >
            <Typography variant="heading3" weight={500}>
              {declintText ?? t('cancel')}
            </Typography>
          </Button>
          <Button
            className="!w-1/2"
            color="green"
            onClick={(e) => {
              confirmHandler(e);
              setIsOpen(false);
            }}
          >
            <Typography variant="heading3" weight={500} color="white">
              {approveText ?? t('delete')}
            </Typography>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmBeforeClick;
