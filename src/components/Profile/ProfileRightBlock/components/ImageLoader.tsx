import { ChangeEvent, FC } from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';

interface IProps {
  label: string;
  onChange: (file?: File) => void;
}

const ImageLoader: FC<IProps> = ({ label, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0]);
  };

  return (
    <label
      htmlFor="profile"
      className={cn(
        'flex w-full justify-center items-center bg-blue hover:bg-light-blue',
        'gap-2 py-[11px] px-[24px] rounded-[6px] cursor-pointer transition-[background-color] duration-300 ease-out',
      )}
    >
      <input type="file" id="profile" className="hidden" onChange={handleChange} />
      <HomeSvgSelector id="photo" />
      <Typography variant="heading3" color="white" weight={550}>
        {label}
      </Typography>
    </label>
  );
};

export default ImageLoader;
