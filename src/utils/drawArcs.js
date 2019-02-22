export default function(a, b) {
  let dx = a[0] - b[0],
    dy = a[1] - 2 - b[1],
    da = a[1] - 2,
    dr = Math.sqrt(dx * dx + dy * dy);
  if (b[0] < a[0]) return `M${b[0]},${b[1]}A${dr},${dr} 0 0,1 ${a[0]},${da}`;
  return `M${b[0]},${b[1]}A${dr},${dr} 0 0,0 ${a[0]},${da}`;
}
