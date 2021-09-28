import { format } from 'date-fns'

export const formatDate = ({ date, formatString = "dd/MM/yyyy" }) => {
  if (!date) return '';
  return format(new Date(date), formatString)
};
