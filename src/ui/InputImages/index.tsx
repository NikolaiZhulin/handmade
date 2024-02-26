import {
  ChangeEvent,
  DragEvent,
  FC,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { getImage } from '@/helpers/getImage';
import { mergeStyles } from '@/helpers/mergeStyles';
import { validateFilesExtensions } from '@/helpers/validateFilesExtensions';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils/utils';
import { ImageService } from '@/constants/enums';

import ButtonDelete from '../ButtonDelete';
import Typography from '../Typography';
import Button from '../Button';

import style from './style.module.scss';

interface IProps {
  onFiles: (files: (File | string)[]) => void;
  initialFiles: (File | string)[];
  className?: string;
  disabled?: boolean;
}

const InputImages: FC<PropsWithChildren<IProps>> = ({
  onFiles,
  initialFiles,
  className,
  disabled,
}) => {
  const [files, setFiles] = useState<(File | string)[]>(initialFiles);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = validateFilesExtensions(e.dataTransfer.files, [
        '.jpeg',
        '.jpg',
        '.png',
        '.webp',
      ]);
      setFiles(files.slice(0, 9));
    }
  };

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !!e.target.files.length) {
      setFiles((prev) => {
        onFiles([...prev, ...Array.from(e.target.files ?? []).slice(0, 9 - prev.length)]);
        return [...prev, ...Array.from(e.target.files ?? []).slice(0, 9 - prev.length)];
      });
    }
  };

  const handleRemoveImage = (ind: number) => (e: MouseEvent) => {
    e.stopPropagation();
    const newFiles = [...files];
    newFiles.splice(ind, 1);
    onFiles(newFiles);
    setFiles(newFiles);
  };

  const handleImageClick = (ind: number) => () => {
    const newFiles = [...files];
    const snipped = newFiles[ind];
    newFiles[ind] = files[0];
    newFiles[0] = snipped;
    onFiles(newFiles);
    setFiles(newFiles);
  };

  return (
    <form
      className={mergeStyles(
        style.InputImages,
        className,
        files.length === 0 ? '!h-[206px]' : files.length === 1 ? '!h-[196px]' : '!h-[268px]',
      )}
      onSubmit={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="relative h-full">
        {files.length < 9 && (
          <input
            className={style.Load}
            type="file"
            name="file"
            onChange={handleFilesChange}
            multiple={true}
            accept=".png,.jpeg,.webp,.jpg"
            ref={inputRef}
            disabled={disabled}
          />
        )}
        {files.length > 0 && (
          <div
            className={cn(
              style.GridContainer,
              '2xl:!w-[319px] 2xl:!left-[50%] 2xl:-translate-x-[50%]',
              files.length === 0 ? '!h-[206px]' : files.length === 1 ? '!h-[128px]' : '!h-[200px]',
            )}
          >
            {files.map((file, i) => {
              const url =
                file instanceof File
                  ? URL.createObjectURL(file)
                  : getImage(ImageService.POSTS, file);
              const isFirstImage = i === 0;

              const gridRowStyle = files.length > 1 && isFirstImage ? '1 / 3' : undefined;
              const gridColumnStyle = isFirstImage ? '2 / 4' : undefined;
              return (
                <div
                  className={cn(style.GridItem)}
                  style={{ gridRow: gridRowStyle, gridColumn: gridColumnStyle }}
                  key={file instanceof File ? file.name : file}
                  onClick={handleImageClick(i)}
                >
                  <ButtonDelete className={style.ButtonDelete} onClick={handleRemoveImage(i)} />
                  <img className={style.Images} src={url} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!files.length && (
        <div className={style.FormContainer}>
          <HomeSvgSelector id="load-img" />
          <Typography variant="heading3" className={style.Heading4}>
            {t('inputs.imageInfo')}
          </Typography>
        </div>
      )}
      {files.length <= 5 && (
        <label className={style.label} htmlFor="file">
          <Button
            className={cn('!w-full !gap-2')}
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            <HomeSvgSelector id={'attach-file'} />
            {t('attachImage')}
          </Button>
        </label>
      )}
    </form>
  );
};

export default InputImages;
