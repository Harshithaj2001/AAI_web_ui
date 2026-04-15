/** Calendar date YYYY-MM-DD in America/New_York (company official dates). */
export function todayYmdInNy(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;
  return `${y}-${m}-${d}`;
}

export function formatYmdInNy(isoDate: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "medium" }): string {
  const [y, mo, da] = isoDate.split("-").map(Number);
  if (!y || !mo || !da) return isoDate;
  const utcNoon = Date.UTC(y, mo - 1, da, 12, 0, 0);
  return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "America/New_York" }).format(new Date(utcNoon));
}

export function formatLocalSameYmd(isoDate: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "medium" }): string {
  const [y, mo, da] = isoDate.split("-").map(Number);
  if (!y || !mo || !da) return isoDate;
  const local = new Date(y, mo - 1, da, 12, 0, 0);
  return new Intl.DateTimeFormat(undefined, opts).format(local);
}
