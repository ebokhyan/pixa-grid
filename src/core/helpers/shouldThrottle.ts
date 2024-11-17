import { MutableRefObject } from "react";

/**
 * Checks if a request should be throttled based on the last fetch time and interval.
 * @param lastFetchTimeRef - Mutable reference to the last fetch timestamp.
 * @param interval - Throttle interval in milliseconds.
 * @returns `true` if the request should be throttled; `false` otherwise.
 */
export default function shouldThrottle(
  lastFetchTimeRef: MutableRefObject<number>,
  interval: number = 300
): boolean {
  const now = Date.now();

  if (now - lastFetchTimeRef.current < interval) {
    return true;
  }

  lastFetchTimeRef.current = now;
  return false;
}
