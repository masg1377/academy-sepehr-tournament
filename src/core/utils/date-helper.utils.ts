export const getCustomDate = (utc: string): string => {
  const date = new Date(utc);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
  );
};

export const getCustomClock = (utc: string): string => {
  const date = new Date(utc);
  return (
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
  );
};

export const getCustomWrittenDate = (utc: string) => {
  const date = new Date(utc);

  let month = "";
  switch (date.getMonth() + 1) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sept";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
  }
  return (
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    " " +
    month +
    " " +
    date.getFullYear()
  );
};
