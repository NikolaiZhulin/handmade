import { FC, ReactNode, useState } from 'react';

import Typography from '@/ui/Typography';
import Button from '@/ui/Button';
import { cn } from '@/utils/utils';

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

  const onOpenChange = (open: boolean) => setIsOpen(open);

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className={cn('w-[420px]', dialogClassName)}>
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
              Отмена
            </Button>
            <Button className="!w-1/2 xs:!w-full xs:!shrink" color="green" onClick={confirmHandler}>
              Удалить
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
