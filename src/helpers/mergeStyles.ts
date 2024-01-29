export const mergeStyles = (...args: (string | boolean | undefined)[]) => {
  return args.filter((el) => el).join(' ');
};
