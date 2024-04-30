import NProgress from "nprogress";
import { useCallback, useState } from "react";

export function useAsyncOperation<Args extends any[], T>(
  fn: (...args: Args) => Promise<T>
) {
  const [progress, setProgress] = useState(false);

  const operation = useCallback(
    async (...args: Args) => {
      try {
        setProgress(true);
        NProgress.start();

        return await fn(...args);
      } finally {
        setProgress(false);
        NProgress.done();
      }
    },
    [fn]
  );

  return [operation, progress] as const;
}
