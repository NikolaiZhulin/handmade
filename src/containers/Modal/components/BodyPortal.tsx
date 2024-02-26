import {ReactNode, useEffect, useState} from 'react';
import { createPortal } from 'react-dom';



export default function BodyPortal({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (typeof window === 'undefined' || !isMounted) return null;

  return createPortal(children, document.body);
}