type AnyFunction = (...args: any[]) => unknown;

type GuaranteedFunction<T> = T extends AnyFunction ? T : () => T;

export const propsToChildren = <T>(value: T) => {
  return (...args: Parameters<GuaranteedFunction<T>>) => {
    return typeof value === 'function' ? value(...args) : value;
  };
};
