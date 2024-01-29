import React, { FC } from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';

type Props = {
  filterText: string;
  onClick: () => void;
};

export const ActiveFilterItem: FC<Props> = (props) => {
  const { filterText, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="[&>svg]:h-[18px] flex items-center gap-[4px] h-[32px] p-[4px] pr-0 border border-solid border-gold xs:h-[24px] py-0"
    >
      <Typography variant="text2" weight={500}>
        «{filterText}»
      </Typography>
      <HomeSvgSelector id="cross" />
    </button>
  );
};
