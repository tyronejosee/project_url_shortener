export function getFirstLetter(text: string): string {
  const match = text.match(/[a-zA-Z]/);
  return match ? match[0].toUpperCase() : "";
}
