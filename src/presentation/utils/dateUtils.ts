export const dateParser = (date: string) => {
  const tempDate = new Date(date).toString().split(' ');
  const formattedDate = `${tempDate[1]} ${tempDate[2]},  ${tempDate[3]}, at ${tempDate[4].slice(0, 5)} (${tempDate[5]})`;
  return formattedDate;
};
