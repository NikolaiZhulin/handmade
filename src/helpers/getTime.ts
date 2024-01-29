import { TFunction } from 'i18next';

const timeMinutes = ['timeMaps.minute1', 'timeMaps.minute2', 'timeMaps.minute3'];
const timeHours = ['timeMaps.hours1', 'timeMaps.hours2', 'timeMaps.hours3'];
const timeMonths = ['timeMaps.months1', 'timeMaps.months2', 'timeMaps.months3'];
const timeDays = ['timeMaps.days1', 'timeMaps.days2', 'timeMaps.days3'];
const timeYears = ['timeMaps.years1', 'timeMaps.years2', 'timeMaps.years3'];

const HOUR = 1000 * 60 * 60;

export const getCreatedAtDatePhrase = (date: string, t: TFunction<'translation', undefined>) => {
  const diff = Date.now() - Date.parse(date);
  const hours = diff / HOUR;

  if (hours < 1) {
    const timeWord = getTimeName(Math.floor(hours / (24 * 30)), timeMinutes);
    return `${Math.floor(hours * 60)} ${t(timeWord)} ${t('timeMaps.backWord')}`;
  } else if (hours >= 1 && hours < 24) {
    const timeWord = getTimeName(Math.floor(hours / (24 * 30)), timeHours);
    return `${Math.floor(hours)} ${t(timeWord)} ${t('timeMaps.backWord')}`;
  } else if (hours / 24 < 30) {
    const timeWord = getTimeName(Math.floor(hours / 24), timeDays);
    return `${Math.floor(hours / 24)} ${t(timeWord)} ${t('timeMaps.backWord')}`;
  } else if (hours / 24 < 365) {
    const timeWord = getTimeName(Math.floor(hours / (24 * 30)), timeMonths);
    return `${Math.floor(hours / (24 * 30))} ${t(timeWord)} ${t('timeMaps.backWord')}`;
  } else {
    const timeWord = getTimeName(Math.floor(hours / (24 * 365)), timeYears);
    return `${Math.floor(hours / (24 * 365))} ${t(timeWord)} ${t('timeMaps.backWord')}`;
  }
};

function getTimeName(value: number, words: string[]) {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) {
    return words[2];
  }
  if (num > 1 && num < 5) {
    return words[1];
  }
  if (num == 1) {
    return words[0];
  }
  return words[2];
}
