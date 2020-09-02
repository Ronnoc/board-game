export function generateRandomId(): string {
  return Math.floor(Math.random() * 16 ** 12).toString(16);
}

export function shuffle<T>(vec: Array<T>): Array<T> {
  const rtn: Array<T> = [];
  const copy = vec.slice();
  while (copy.length) {
    rtn.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return rtn;
}
