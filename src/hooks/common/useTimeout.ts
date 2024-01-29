import { useEffect, useState } from 'react';

export const useTimeoutValue = <T>(
  value: T,
  msTime: number,
  immediatelyShow: ReadonlyArray<T> = [],
): T => {
  const [resultValue, setResultValue] = useState(value);

  const showImmediately = immediatelyShow.includes(value);

  useEffect(() => {
    if (showImmediately) {
      setResultValue(value);
      return;
    }

    const timeout = setTimeout(() => {
      setResultValue(value);
    }, msTime);

    return () => clearTimeout(timeout);
  }, [value, msTime, ...immediatelyShow]);

  return showImmediately ? value : resultValue;
};
