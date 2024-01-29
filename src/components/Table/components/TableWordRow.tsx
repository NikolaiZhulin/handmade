import { FC } from 'react';

import ConfirmBeforeClick from '@/components/ConfirmBeforeClick';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { IKeyWord } from '@/types/admin/key-words';
import { cn } from '@/utils/utils';

import style from '../style.module.scss';

interface IProps {
  word: IKeyWord;
  deleteWord: () => void;
}

const TableWordRow: FC<IProps> = ({ word, deleteWord }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(style.TableItem, '!h-[30px]')}>
      <div className={cn(style.Item, '!w-[404px]')}>{word.word}</div>
      <div className={cn(style.Item, '!w-[404px]')}>{t(`categories.${word.category}`)}</div>
      <div className={cn(style.Item, '!w-[42px]')}>
        <ConfirmBeforeClick confirmHandler={deleteWord} text={t('admin.words.deleteWord')}>
          <button>
            <HomeSvgSelector id="closed-admin" />
          </button>
        </ConfirmBeforeClick>
      </div>
    </div>
  );
};

export default TableWordRow;
