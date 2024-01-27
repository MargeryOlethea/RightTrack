export default function dateConverter(date) {
  const dateObject = new Date(date);
  if (!(dateObject instanceof Date)) {
    return "Invalid Date";
  }

  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
