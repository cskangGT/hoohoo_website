export function throttle(
  func: (...args: any[]) => void,
  delay: number,
): (...args: any[]) => void {
  let timerId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
      timerId = null;
    }, delay);
  };
}
