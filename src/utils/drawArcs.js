export default function(a, b) {
  if (b[0] < a[0]) {
    let dx = a[0] - b[0],
      dy = a[1] - 2 - b[1],
      da = a[1] - 2,
      dr = Math.sqrt(dx * dx + dy * dy);
    return (
      'M' +
      b[0] +
      ',' +
      b[1] +
      'A' +
      dr +
      ',' +
      dr +
      ' 0 0,1 ' +
      a[0] +
      ',' +
      da
    );
  } else {
    let dx = b[0] - a[0],
      dy = b[1] - (a[1] - 2),
      da = a[1] - 2,
      dr = Math.sqrt(dx * dx + dy * dy);
    return (
      'M' +
      a[0] +
      ',' +
      da +
      'A' +
      dr +
      ',' +
      dr +
      ' 0 0,1 ' +
      b[0] +
      ',' +
      b[1]
    );
  }
}
