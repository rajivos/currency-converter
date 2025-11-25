export function formatCurrency(amount: number, decimals: number = 2): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function convertAmount(
  amount: number,
  fromRate: number,
  toRate: number
): number {
  return (amount / fromRate) * toRate;
}

export function getLast14Days(): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
}
