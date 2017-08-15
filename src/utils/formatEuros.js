export default function(value, currency = '€') {
  return (
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' + currency
  );
}
