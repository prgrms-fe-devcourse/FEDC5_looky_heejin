import { useCallback, useRef } from "react";

export const useDebounce = (
  callback: (...params: any) => void,
  delay: number
) => {
  const timer = useRef<any>(null);
  return useCallback(
    (...params: any) => {
      const later = () => {
        clearTimeout(timer.current);
        callback(...params);
      };

      clearTimeout(timer.current);
      timer.current = setTimeout(later, delay);
    },
    [callback, delay]
  );
};
