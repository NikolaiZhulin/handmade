export const BACK_ERROR: Record<number, Record<string, Record<string, string>>> = {
  400: {
    login: {
      email: 'errors.userDoestExist',
      password: 'errors.wrongPassword',
    },
  },
};

export type Keys = keyof typeof BACK_ERROR;
