export default function rupiah(number) {
  let price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  if (isNaN(number)) {
    return 0;
  }

  return price.split(",")[0];
}
