export default function getRatePoints(value, maxValue) {
  const part = maxValue / 5;
  const residue = value % part; // 小数分
  const quotient = Math.floor(value / part); // 整数分
  const values = [];
  for (let i = 0; i < 5; i++) {
    if (i < quotient) {
      values.push(100);
    } else if (residue && (i === quotient)) {
      values.push(residue * 100);
    } else {
      values.push(0);
    }
  }
  return values;
}
