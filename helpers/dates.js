import { format, isSameDay, subDays } from 'date-fns';
import { toDate, zonedTimeToUtc } from 'date-fns-tz';
const timeZone = 'America/Argentina/Buenos_Aires';


export const formatDate = ({ date, formatString = "dd/MM/yyyy" }) => {
  if (!date) return null;
  const date2 = toDate(date);
  const timeInBuenosAires = zonedTimeToUtc(date2, timeZone);
  const formated = format(timeInBuenosAires, formatString);
  return formated;
};

export const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false;
  return isSameDay(new Date(date1), new Date(date2));
};

export const getPreviousDate = (date) => {
  if (!date) return null;
  const date2 = toDate(date);
  const timeInBuenosAires = zonedTimeToUtc(date2, timeZone);
  return subDays(timeInBuenosAires, 1);
};