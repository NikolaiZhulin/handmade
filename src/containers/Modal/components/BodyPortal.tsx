import {ReactNode} from 'react';
import { createPortal } from 'react-dom';

export default function BodyPortal({ children }: {children: ReactNode}) {
  if (typeof window === 'undefined') return null;

  return <>{createPortal(children, document.body)}</>;
}
