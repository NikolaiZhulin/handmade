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
        'flex w-full justify-center items-center bg-main-green hover:bg-green-light [&>svg]:!w-[24px] [&>svg]:!h-[24px]',
        'gap-2 py-[11px] px-[24px] cursor-pointer transition-[background-color] duration-300 ease-out',
      )}
    >
      <input type="file" id="profile" className="hidden" onChange={handleChange} />
      <HomeSvgSelector id="photo-icon" />
      <Typography variant="text2" color="white" weight={500}>
        {label}
      </Typography>
    </label>
  );
};

export default ImageLoader;
