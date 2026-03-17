export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getDateDifference(date1: string, date2: string): string {
  if (!date1 || !date2) return "";
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const [earlier, later] = d1 < d2 ? [d1, d2] : [d2, d1];

  let years = later.getFullYear() - earlier.getFullYear();
  let months = later.getMonth() - earlier.getMonth();

  if (months < 0) {
    // If later date's month is earlier in the year,
    // than early date's month subtract a year to get
    // correct count.
    years--;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  if (totalMonths < 1) return "Less than a month";
  if (totalMonths < 12)
    return `${totalMonths} month${totalMonths > 1 ? "s" : ""}`;
  return `${years} year${years > 1 ? "s" : ""}`;
}
