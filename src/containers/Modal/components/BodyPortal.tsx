import {ReactNode, ReactPortal, useState} from 'react';
import { createPortal } from 'react-dom';

import useSSRLayoutEffect from '@/hooks/common/useSSRLayoutEffect';

export default function BodyPortal({ children }: {children: ReactNode}) {
  if (typeof window === 'undefined') return null;

  const [isMounted, setIsMounted] = useState(false);

  useSSRLayoutEffect(() => setIsMounted(true), []);

  return <>{isMounted && createPortal(children as ReactPortal, document.body)}</>;
}
