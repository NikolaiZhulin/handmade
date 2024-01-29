import { useCallback, useState } from 'react';

import { IModalContextValues, MODAL_CONTEXT_VALUES } from '@/contexts/ModalContext';

export const useModalContext = (): [
  IModalContextValues,
  (newState: Partial<IModalContextValues>) => void,
] => {
  const [state, setState] = useState(MODAL_CONTEXT_VALUES);

  const handleStateChange = useCallback(
    (newState: Partial<IModalContextValues>) => {
      setState((prev) => ({ ...prev, ...newState }));
    },
    [state],
  );

  return [state, handleStateChange];
};
