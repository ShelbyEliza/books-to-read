export default function useDate() {
  const dateToday = new Date();

  const formatDate = (dateValue) => {
    let formattedDate = dateValue.toString();

    if (formattedDate.length < 2) {
      formattedDate = "0" + formattedDate;
    }
    return formattedDate;
  };

  const dateTodayString =
    formatDate(dateToday.getFullYear()) +
    "-" +
    formatDate(dateToday.getMonth() + 1) +
    "-" +
    formatDate(dateToday.getDate());
  // console.log(dateTodayString);

  return dateTodayString;
}
