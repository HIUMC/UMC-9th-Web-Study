import { useCallback, useRef } from "react";

export default function useThrottle<T extends (...args: any[]) => any>(value: T, delay = 500) {
  const lastExecuted = useRef<number>(Date.now());
  const timeoutId = useRef<number | null>(null);

  const throttledFn = useCallback((...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastExecuted.current >= delay) {
        lastExecuted.current = now;
        value(...args);
      } else {
        if (timeoutId.current !== null) {
          clearTimeout(timeoutId.current);
        }

        timeoutId.current = window.setTimeout(() => {
          lastExecuted.current = Date.now();
          value(...args);
        }, delay - now + lastExecuted.current);
      }
    },
    [value, delay]
  );

  return throttledFn;
}
