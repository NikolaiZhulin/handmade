export enum CodeType {
  SIGN_UP = 'sign-up',
  CHANGE_EMAIL = 'change-email',
  FORGOT_PASSWORD = 'forgot-password',
  CONNECT_MAIL = 'connect-email',
}

export enum PostMadeBy {
  FACTORY = 'factory',
  HANDMADE = 'handmade',
}
export enum AuthFormType {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  RESET_PASSWORD = 'reset-password',
}

export enum Currency {
  GEL = 'GEL',
  USD = 'USD',
  EUR = 'EUR',
}

export enum UsedPeriod {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum PostSource {
  TG = 'tg',
  WEB = 'web',
}

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

export enum ReportPostReason {
  SOLD = 'sold',
  PRICE = 'wrongPrice',
  DESCRIPTION = 'wrongDescription',
  ADDRESS = 'wrongAddress',
  RULES = 'breakRules',
  SCAMM = 'scammer',
}

export enum ImageService {
  ADMIN = 'admin/categories',
  AUTH = 'profile',
  POSTS = 'posts',
}
