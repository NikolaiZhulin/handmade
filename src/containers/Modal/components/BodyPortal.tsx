import {ReactNode, ReactPortal} from 'react';
import { createPortal } from 'react-dom';


export default function BodyPortal({ children }: {children: ReactNode}) {
  if (typeof window === 'undefined') return null;

  return createPortal(children as ReactNode, document.body);
}
