import { FC } from 'react';

import { Currency } from '@/constants/enums';
import { IPostContactInfo } from '@/types/posts';
import { cn } from '@/utils/utils';
import RightBlockPostHeader from '@/components/RightBlockPostHead';

import style from './style.module.scss';
import { PostAddress } from './components/Address';
import { Contacts } from './components/Contacts';

interface IProps {
  price: number;
  currency: Currency;
  time: string;
  postCategories: string[];
  city: string;
  contacts: IPostContactInfo;
  id: string;
  address?: string;
}

const RightBlockPost: FC<IProps> = ({
  postCategories,
  price,
  currency,
  time,
  city,
  contacts,
  address,
  id,
}) => {
  return (
    <div
      className={cn(
        style.RightBlockPost,
        '2xl:!w-full 2xl:!max-w-full 2xl:!py-[14px] 2xl:!px-[30px] 2xl:!static xs:!px-[20px] xs:!pb-0',
      )}
    >
      <RightBlockPostHeader
        time={time}
        postCategories={postCategories}
        id={id}
        price={price}
        currency={currency}
        className="2xl:hidden"
      />

      <PostAddress city={city} address={address} />
      <Contacts contacts={contacts} />
    </div>
  );
};

export default RightBlockPost;
