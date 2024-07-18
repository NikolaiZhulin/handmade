import React, { FC } from 'react';

import Typography from '@/ui/Typography';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';

type Props = {
  filterText: string;
  onClick?: () => void;
};

export const ActiveFilterItem: FC<Props> = (props) => {
  const { filterText, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="[&>svg]:h-[18px] flex items-center gap-[4px] h-[32px] p-[4px] border border-solid border-main-green xs:h-[24px] py-0"
    >
      <Typography variant="text2" className="whitespace-nowrap" weight={500}>
        «{filterText}»
      </Typography>
      <HomeSvgSelector id="cross" />
    </button>
  );
};
