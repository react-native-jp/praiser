export default function round(src: number, digit = 1) {
  const base = Math.pow(10, digit - 1)
  return Math.round(src * base) / base
}
