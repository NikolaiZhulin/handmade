import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import useSSRLayoutEffect from '@/hooks/common/useSSRLayoutEffect';

export default function BodyPortal(props: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useSSRLayoutEffect(() => setIsMounted(true), []);

  return <>{isMounted && createPortal(props.children, document.body)}</>;
}
