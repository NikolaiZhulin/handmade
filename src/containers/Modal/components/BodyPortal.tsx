import {ReactNode, useState} from 'react';
import { createPortal } from 'react-dom';

import useSSRLayoutEffect from '@/hooks/common/useSSRLayoutEffect';

export default function BodyPortal({ children }: {children: ReactNode}) {
  const [isMounted, setIsMounted] = useState(false);

  useSSRLayoutEffect(() => setIsMounted(true), []);

  if (typeof window === 'undefined') return null;

  return <>{isMounted && createPortal(<>{children}</>, document.body)}</>;
}
