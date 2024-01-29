import { Currency } from '@/constants/enums';

export const thirdStepConfig = [
  {
    icon: 'tube',
    controller: 'additionalPhone',
    placeholder: 'inputs.additionalPhone',
    switch: 'isAdditionalPhoneActive',
    mask: 'phone',
  },
  {
    icon: 'telegram',
    controller: 'telegram',
    placeholder: 'inputs.telegram',
    switch: 'isTelegramActive',
    mask: undefined,
  },
  {
    icon: 'whatsapp',
    controller: 'whatsapp',
    placeholder: 'inputs.whatsApp',
    switch: 'isWhatsappActive',
    mask: undefined,
  },
  {
    icon: 'viber',
    controller: 'viber',
    placeholder: 'inputs.viber',
    switch: 'isViberActive',
    mask: undefined,
  },
  {
    icon: 'facebook_filled',
    controller: 'facebook',
    placeholder: 'inputs.facebook',
    switch: 'isFacebookActive',
    mask: undefined,
  },
] as const;

export const CURRENCY_MAP = [
  {
    value: Currency.GEL,
    label: 'GEL',
    valueIcon: <span>₾</span>,
  },
  { value: Currency.USD, label: 'USD', valueIcon: <span>$</span> },
  { value: Currency.EUR, label: 'EUR', valueIcon: <span>€</span> },
];
