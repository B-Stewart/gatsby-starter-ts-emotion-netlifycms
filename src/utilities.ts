export function createSubArrays<T>(maxSize: number, bigArray: T[]): Array<T[]> {
  let subArrays: Array<T[]> = [];
  for (var i = 0; i < bigArray.length; i += maxSize) {
    subArrays.push(bigArray.slice(i, i + maxSize));
  }
  return subArrays;
}
