import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  trigger: RefObject<HTMLElement>,
  skip = false,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (skip) {
        return;
      }
      const el = ref?.current;
      if (
        !el ||
        el.contains((event?.target as Node) || null) ||
        trigger.current?.contains(event.target as Node)
      ) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, trigger, skip]);
};
