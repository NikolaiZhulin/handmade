import { ParsedUrlQuery } from 'querystring';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Filters {
  filters: Record<string, string | string[]>;
  page: {
    page: number;
  };
}

export const SEPARATOR = ',';

const defaultFilters: Filters = {
  filters: {},
  page: {
    page: 1,
  },
};

const convertObjectToQuery = (filters: Filters): Record<string, string> => {
  return Object.entries(filters).reduce<Record<string, string>>((acc, [key, value]) => {
    if (typeof value === 'object') {
      return convertObjectToQuery(value);
    }
    acc[key] = typeof value === 'string' ? value : value.join(SEPARATOR);
    return acc;
  }, {});
};

const parseQueryToObject = (query: ParsedUrlQuery) => {
  return Object.entries(query).reduce<Filters>((acc, [key, value]) => {
    if (value) {
      if ((value as string).split(SEPARATOR).length > 1) {
        acc.filters[key] = (value as string).split(SEPARATOR);
      } else {
        acc.filters[key] = value;
      }
    }

    return acc;
  }, defaultFilters);
};

export const useFiltersQuery = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { query, push } = useRouter();

  useEffect(() => {
    setFilters(parseQueryToObject(query));
  }, []);

  useEffect(() => {
    push({ query: convertObjectToQuery(filters) }, undefined, { shallow: true });
  }, [filters]);

  const updateQuery = (key: string, value: string, toArray?: boolean) => {
    if (toArray) {
      setFilters((prev) => {
        if (Array.isArray(prev.filters[key])) {
          return {
            ...prev,
            filters: {
              ...prev.filters,
              [key]: (prev.filters[key] as string[]).concat(value),
            },
          };
        }
        return {
          ...prev,
          filters: {
            ...prev.filters,
            [key]: [value],
          },
        };
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        filters: {
          ...prev.filters,
          [key]: value,
        },
      }));
    }
  };

  return updateQuery;
};
