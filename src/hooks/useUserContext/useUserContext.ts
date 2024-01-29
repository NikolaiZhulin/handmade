import { useCallback, useState } from 'react';

import { IUserContextValues, USER_CONTEXT_DEFAULT_VALUES } from '@/contexts/UserContext';

export const useUserContext = (): [
  IUserContextValues,
  (newState: Partial<IUserContextValues>) => void,
] => {
  const [state, setState] = useState(USER_CONTEXT_DEFAULT_VALUES);

  const handleStateChange = useCallback(
    (newState: Partial<IUserContextValues>) => {
      setState((prev) => ({ ...prev, ...newState }));
    },
    [state],
  );

  return [state, handleStateChange];
};
