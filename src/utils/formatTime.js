const formatTimeByHourAndMinute = (hour, minute) => {
  const formattedTime = `${hour?.toString().padStart(2, "0")}:${minute
    ?.toString()
    .padStart(2, "0")}`;
  return formattedTime;
};
export default formatTimeByHourAndMinute;
