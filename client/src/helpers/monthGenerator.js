import monthConverter from "./monthConverter";

export default function monthGenerator() {
  const currentDate = new Date();
  const options = Array.from({ length: 3 }, (_, index) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - index,
      1,
    );
    const formattedValue = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const formattedText = monthConverter(formattedValue);
    return { value: formattedValue, text: formattedText };
  });
  return options;
}
