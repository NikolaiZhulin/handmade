import { useEffect, useLayoutEffect } from 'react';

const useSSRLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default useSSRLayoutEffect;
