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

export default function useDisplayDate() {
  const formatDisplayDate = (date) => {
    const dateReg = /\W/;
    const dateArray = date.split(dateReg);
    let monthValue = dateArray[1];

    if (dateArray[1].charAt(0) === 0) {
      monthValue = dateArray[1].slice(0);
    }

    const [month, day, year] = [
      // looking for months index, so use actual month minus 1
      Object.values(months[monthValue - 1]),
      dateArray[2],
      dateArray[0],
    ];

    const dateString = `${month} ${day}, ${year}`;

    return dateString;
  };

  return {
    formatDisplayDate,
  };
}
