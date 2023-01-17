import dayjs from 'dayjs';

export const formatDate = (date, format) => dayjs(date).format(format);