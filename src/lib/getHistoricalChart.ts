export async function getHistoricalChart(currency: string) {
    const res = await fetch(`/api/historical?currency=${currency}`);
  
    if (!res.ok) {
      throw new Error("Failed to fetch historical chart data");
    }
  
    const { data } = await res.json();
    return data; // [{ date, rate }]
  }
  