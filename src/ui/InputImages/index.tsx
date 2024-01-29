import {
  ChangeEvent,
  FC,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  DragEvent,
} from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { mergeStyles } from '@/helpers/mergeStyles';
import { getImage } from '@/helpers/getImage';
import { useTranslation } from '@/hooks/useTranslation';
import { validateFilesExtensions } from '@/helpers/validateFilesExtensions';
import { cn } from '@/utils/utils';

import ButtonDelete from '../ButtonDelete';
import Typography from '../Typography';

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
      className={mergeStyles(style.InputImages, className)}
      onSubmit={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {!!files.length && (
        <div
          className={cn(
            style.GridContainer,
            '2xl:!w-[319px] 2xl:!left-[50%] 2xl:-translate-x-[50%]',
          )}
        >
          {files.map((file, i) => {
            const url = file instanceof File ? URL.createObjectURL(file) : getImage(file);
            return (
              <div
                className={style.GridItem}
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
      {!files.length && (
        <div className={style.FormContainer}>
          <HomeSvgSelector id="load-img"></HomeSvgSelector>
          <Typography variant="heading4" className={style.Heading4}>
            {t('inputs.imageInfo')}
          </Typography>
        </div>
      )}
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
      {files.length <= 5 && (
        <label className={style.label} htmlFor="file" onClick={() => inputRef.current?.click()}>
          <button className={style.Submit} disabled={disabled}>
            {t('attachImage')}
          </button>
        </label>
      )}
    </form>
  );
};

export default InputImages;
