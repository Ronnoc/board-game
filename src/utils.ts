export function generateRandomId(): string {
  return Math.floor(Math.random() * (16 ** 12)).toString(16);
}