function monthConverter(dateString) {
  const [year, month] = dateString.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${months[parseInt(month, 10) - 1]} ${year}`;

  return formattedDate;
}

module.exports = monthConverter;
