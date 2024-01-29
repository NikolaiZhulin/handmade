import { TFunction } from 'next-i18next';

import { BACK_ERROR, Keys } from '@/constants/texts/back-errors-map';
import { IError } from '@/types/axios';

export const getBackRuError = <T>(
  error: IError,
  key: string,
  t: TFunction,
  code?: number,
): [keyof T, string] => {
  const fieldName = error.field as keyof T;
  const message = BACK_ERROR[code as Keys][key][error.field];

  return [fieldName, t(message)];
};
