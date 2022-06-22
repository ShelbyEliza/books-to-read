const months = [
  { 1: "January" },
  { 2: "February" },
  { 3: "March" },
  { 4: "April" },
  { 5: "May" },
  { 6: "June" },
  { 7: "July" },
  { 8: "August" },
  { 9: "September" },
  { 10: "October" },
  { 11: "November" },
  { 12: "December" },
];

export default function useDate() {
  const formatDateToday = () => {
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

    return dateTodayString;
  };

  const formatDisplayDate = (date) => {
    const dateReg = /\W/;
    const dateArray = date.split(dateReg);
    const displaydate = new Date(dateArray[0], dateArray[1], dateArray[2]);

    const [month, day, year] = [
      Object.values(months[displaydate.getMonth() - 1]).join(),
      dateArray[2],
      dateArray[0],
    ];

    const dateString = `${month} ${day}, ${year}`;

    return dateString;
  };

  return {
    formatDateToday,
    formatDisplayDate,
  };
}
