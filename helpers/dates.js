import { format, isSameDay } from 'date-fns'

export const formatDate = ({ date, formatString = "dd/MM/yyyy" }) => {
  if (!date) return format(new Date(), formatString);
  return format(new Date(date), formatString)
};

export const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false;
  return isSameDay(new Date(date1), new Date(date2))
};
