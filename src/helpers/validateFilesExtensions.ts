export type Extensions = '.png' | '.jpg' | '.jpeg' | '.webp';

export const validateFilesExtensions = (filelist: FileList, extensions: Extensions[]) => {
  return Array.from(filelist).filter((el) => {
    const lastDotindex = el.name.lastIndexOf('.');
    const extension = el.name.slice(lastDotindex).toLowerCase();
    return Object.values(extensions)
      .map((el) => el.toLowerCase())
      .includes(extension);
  });
};
