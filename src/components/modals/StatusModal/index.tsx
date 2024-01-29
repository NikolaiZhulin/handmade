import { FC } from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/ui/Button';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

interface IProps {
  type: 'error' | 'success';
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  action?: () => void;
  className?: string;
  title: string;
  subtitle?: string;
}

const StatusModal: FC<IProps> = ({
  type,
  isOpen,
  onOpenChange,
  action,
  className,
  title,
  subtitle,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('w-[420px] flex flex-col items-center text-center gap-[20px]', className)}
      >
        <DialogHeader>
          <HomeSvgSelector id={`modal_${type}`} />
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-2">
          <Typography variant="heading2">{title}</Typography>
          <Typography variant="heading5" color="gray">
            {subtitle}
          </Typography>
        </DialogDescription>
        <DialogFooter className="w-full">
          <Button color={type === 'error' ? 'red' : 'green'} fullWidth onClick={action}>
            {type === 'error' ? t('modals.continue') : t('modals.ok')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
