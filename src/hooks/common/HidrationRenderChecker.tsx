import useSSRLayoutEffect from './useSSRLayoutEffect';

let isHydrationRender = true;

function nonNullable<T>(value: T | undefined | null | void, msg?: string): T {
  if (value === undefined || value === null) {
    throw new TypeError(msg ?? `value is ${value}`);
  }

  return value;
}

/**
 * Place the component in the body of the document in any placy
 */
export default function HydrationRenderChecker() {
  useSSRLayoutEffect(() => {
    const metaElement = nonNullable(
      document.querySelector('[data-name="is-hydration-render"]'),
      'Add component HydrationRenderChecker in the body of the document',
    );

    metaElement.setAttribute('data-content', 'false');
    isHydrationRender = false;
  }, []);

  return <div data-name="is-hydration-render" data-content={`${isHydrationRender}`}></div>;
}
