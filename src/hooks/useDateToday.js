const minLengthOfMonthOrDay = 2;

const setLengthOfMonthOrDay = (monthOrDay) => {
  let monthOrDayString = monthOrDay;
  if (monthOrDay.length < minLengthOfMonthOrDay) {
    monthOrDayString = "0" + monthOrDay;
  }
  return monthOrDayString;
};

export default function useDateToday(dateToday) {
  const buildDateToday = (dateToday) => {
    let yearToday = dateToday.getFullYear().toString();
    // add 1 to the month because getMonth() starts months (January) at 0 not 1
    let monthToday = (dateToday.getMonth() + 1).toString();
    let dayToday = dateToday.getDate().toString();

    let month = setLengthOfMonthOrDay(monthToday);
    let day = setLengthOfMonthOrDay(dayToday);

    const dateTodayString = yearToday + "-" + month + "-" + day;

    return dateTodayString;
  };
  return { buildDateToday };
}
