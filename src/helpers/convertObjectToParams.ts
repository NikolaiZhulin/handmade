export const convertObjectToQueryParams = (
  target: Object,
  prefix?: string,
  prevResult?: Record<string, unknown>,
): Object => {
  const result: Record<string, unknown> = prevResult || {};
  Object.entries(target).forEach(([key, value]) => {
    const propName = prefix ? `${prefix}[${key}]` : key;
    if (typeof value === 'object') {
      convertObjectToQueryParams(value, propName, result);
    } else {
      result[propName] = value;
    }
  });
  return result;
};
