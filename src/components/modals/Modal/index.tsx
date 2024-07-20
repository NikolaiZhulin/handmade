import { cloneElement, FC, ReactElement, ReactNode, useState } from 'react';

import Typography from '@/ui/Typography';
import Button from '@/ui/Button';
import { cn } from '@/utils/utils';
import { useTranslation } from '@/hooks/useTranslation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../ui/dialog';

interface IProps {
  trigger: ReactNode;
  header: string;
  type?: 'confirm';
  subheader?: string;
  triggerClassName?: string;
  dialogClassName?: string;
  confirmHandler?: () => void;
}

const Modal: FC<IProps> = ({
  trigger,
  triggerClassName,
  header,
  dialogClassName,
  subheader,
  type = 'confirm',
  confirmHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const onOpenChange = (open: boolean) => setIsOpen(open);

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger className={triggerClassName}>
        {cloneElement(trigger as ReactElement, { onClick: handleTriggerClick })}
      </DialogTrigger>
      <DialogContent className={cn('w-[420px] xs:w-[calc(100%-40px)]', dialogClassName)}>
        <DialogHeader>
          <Typography variant="heading2">{header}</Typography>
        </DialogHeader>
        {subheader && (
          <DialogDescription>
            <Typography variant="heading3" color="gray">
              {subheader}
            </Typography>
          </DialogDescription>
        )}
        {type === 'confirm' && (
          <DialogFooter className="justify-between gap-2 mt-[20px] xs:flex-row xs:w-full">
            <Button
              className="!w-1/2 xs:!w-full xs:!shrink"
              color="neutral"
              onClick={() => setIsOpen(false)}
            >
              {t('cancel')}
            </Button>
            <Button className="!w-1/2 xs:!w-full xs:!shrink" color="green" onClick={confirmHandler}>
              {t('delete')}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
