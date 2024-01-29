import { Currency, UsedPeriod } from './enums';

export const post = {
  currency: [
    {
      value: Currency.GEL,
      label: 'GEL',
    },
    { value: Currency.USD, label: 'USD' },
    { value: Currency.EUR, label: 'EUR' },
  ],
  usedPeriod: [
    {
      value: UsedPeriod.WEEK,
      label: 'periods.week',
    },
    {
      value: UsedPeriod.MONTH,
      label: 'periods.month',
    },
    { value: UsedPeriod.YEAR, label: 'periods.year' },
  ],
};
