import React, { useContext, useState } from 'react';
import Link from 'next/link';

import Select from '@/ui/CustomSelect';
import { cn } from '@/utils/utils';
import { MODAL_CONTEXT_VALUES, ModalContext } from '@/contexts/ModalContext';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useTranslation } from '@/hooks/useTranslation';
import { useGetCategoriesForSelect } from '@/hooks/useGetCategoriesForSelect';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Categories = () => {
  const [modals, setModal] = useContext(ModalContext);
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();
  const categories = useGetCategoriesForSelect();
  const inDialog = useMediaQuery('(max-width: 600px)');

  const content = categories.map((item) => (
    <Link
      href={`/search?category=${item.value}`}
      key={item.value}
      className="w-[320px] block 2xl:w-[100%]"
    >
      <div
        className={cn(
          'group hover:text-white relative flex cursor-pointer select-none items-center transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          'font-montserrat 2xl:px-[30px] xs:!px-[15px] font-semibold text-[14px] leading-[18px] py-[10px] gap-[8px] pr-[18px] hover:pr-0 transition-all duration-300 hover:bg-green-light ease-out',
        )}
      >
        {item.icon}
        {item.label}
      </div>
    </Link>
  ));

  if (inDialog) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open && Object.values(modals).some((el) => el)) {
            setModal(MODAL_CONTEXT_VALUES);
          }
        }}
      >
        <DialogTrigger>
          <button className="items-center xs:h-[24px] xs:p-0" onClick={() => setIsOpen(!isOpen)}>
            <HomeSvgSelector id={'chevron-down'} />
          </button>
        </DialogTrigger>
        <DialogContent
          withClose
          className="xs:w-[100%] xs:top-0 xs:mx-[20px] xs:translate-x-[-50%] xs:m-0 xs:translate-y-[0] xs:p-[15px] xs:px-0"
        >
          <Typography variant="heading2" weight={700}>
            {t('main.categoryTitle')}
          </Typography>
          <div className="flex flex-col gap-[14px] mt-[14px]">{content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Select
      options={() => <>{content}</>}
      asDropdown={true}
      containerClassname="w-auto"
      trigger={({ isOpen, toggleOpen, triggerRef }) => (
        <button
          className="h-[44px] flex gap-[8px] p-[10px] items-center xs:h-[24px] xs:p-0"
          ref={triggerRef}
          onClick={() => {
            if (Object.values(modals).some((el) => el)) {
              setModal(MODAL_CONTEXT_VALUES);
            }
            toggleOpen((prev) => !prev);
          }}
        >
          <div className={'2xl:hidden'}>
            <HomeSvgSelector id={isOpen ? 'cross' : 'list-icon'} />
          </div>
          <div className={'hidden 2xl:block'}>
            <HomeSvgSelector id={'chevron-down'} />
          </div>
          <Typography className={'block 2xl:hidden'} variant="text2" weight={600}>
            {t('main.categoryTitle')}
          </Typography>
        </button>
      )}
      dropdownClassname={mergeStyles(
        'shadow-sortShadow max-h-[672px] h-auto -left-[0] top-[58px] rounded-t-none [clip-path:inset(0px_-35px_-35px_-35px)] p-[30px] w-[387px]',
        '2xl:top-[53px] 2xl:h-auto 2xl:w-[1200px] 2xl:left-[-70px] 2xl:px-0',
        'xs:top-[0] xs:h-auto xs:w-[600px] xs:left-[-70px]',
      )}
      dropdownInnerContainerClassname="grid gap-y-[14px] grid-cols-1 max-h-[unset]"
      withoutDialog
    />
  );
};

export default Categories;
