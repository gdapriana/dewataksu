export default function formatNumber(
  value: number | null | undefined,
  digits = 1
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";

  const abs = Math.abs(value);

  const format = (num: number) => {
    const fixed = num.toFixed(digits);
    return fixed.replace(/\.0+$|(\.[0-9]*?)0+$/, "$1");
  };

  if (abs >= 1_000_000_000) {
    return `${value < 0 ? "-" : ""}${format(abs / 1_000_000_000)}B`;
  }
  if (abs >= 1_000_000) {
    return `${value < 0 ? "-" : ""}${format(abs / 1_000_000)}M`;
  }
  if (abs >= 1_000) {
    return `${value < 0 ? "-" : ""}${format(abs / 1_000)}k`;
  }
  return value.toString();
}
