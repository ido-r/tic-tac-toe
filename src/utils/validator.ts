export function isValidIndex(index: number): boolean {
    return Number.isInteger(index) && index > 0 && index <= 9;
}
  