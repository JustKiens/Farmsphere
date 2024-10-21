export const formatDateWithSuffix = (date: Date | string) => {
  let dateObj: Date;

  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const year = dateObj.getFullYear();

  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th'; // Covers 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const dayWithSuffix = `${day}${getDaySuffix(day)}`;

  return ` ${month}, ${dayWithSuffix} ${year}`;
};

export const formatDateWithSuffixAndDay = (date: Date | string) => {
  let dateObj: Date;

  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  const dateWithSuffix = formatDateWithSuffix(dateObj);
  const day = dateObj.toLocaleString('default', { weekday: 'long' });

  return `${day}, ${dateWithSuffix}`;
}