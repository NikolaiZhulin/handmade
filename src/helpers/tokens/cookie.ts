export interface Cookie {
  value(): string | undefined;
  create(value: string, expires?: string): void;
  remove(): void;
}

const afterOneMonth = () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toUTCString();

const removeDate = 'Thu, 01 Jan 1970 00:00:01 GMT';

export function cookie(name: string): Cookie {
  const create: Cookie['create'] = (value, expires = afterOneMonth()) => {
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  return {
    create,
    value() {
      const cookies = `; ${document.cookie}`;
      const parts = cookies.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
      }
      return undefined;
    },
    remove() {
      create('', removeDate);
    },
  };
}
