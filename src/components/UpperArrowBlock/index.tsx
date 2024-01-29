import { FC } from 'react';

import FeedbackModal from '../modals/FeedbackModal';
import { HomeSvgSelector } from '../svg/HomeSvgSelector';

interface IProps {}

const UpperArrowBlock: FC<IProps> = ({}) => {
  const handleScrollUp = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-[20px] right-[20px] flex flex-col gap-1 xs:bottom-[10px] xs:right-[14px] 2xl:right-[30px] 2xl:bottom-[30px]">
      <FeedbackModal />
      <button
        onClick={handleScrollUp}
        className="p-2 rounded-[6px] bg-dark-gray [&>svg>path]:fill-grey-text [&>svg>path]:stroke-grey-text -scale-x-[1] rotate-90"
      >
        <HomeSvgSelector id="bold-arrow-right" />
      </button>
    </div>
  );
};

export default UpperArrowBlock;
