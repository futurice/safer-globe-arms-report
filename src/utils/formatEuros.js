export default function(value, currency = '€') {
  return (
    Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
    ' ' +
    currency
  );
}
