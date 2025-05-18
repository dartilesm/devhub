import { useCallback, useRef } from "react";

type AnyFunction = (...args: unknown[]) => void;

export function useDebounce<T extends AnyFunction>(callback: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}
