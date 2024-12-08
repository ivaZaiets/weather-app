export const getTime = (time: number) => {
  const date = new Date(time * 1000);
  return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
};

export const getGoldenHour = (sunset: number) => {
  const date = new Date(sunset * 1000 - 60 * 60 * 1000);
  return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
};
