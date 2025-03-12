export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}
