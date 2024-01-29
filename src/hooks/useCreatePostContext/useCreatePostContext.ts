import { useCallback, useState } from 'react';

import {
  CREATE_POST_CONTEXT_DEFAULT_VALUES,
  CreatePostContext,
  ICreatePostContext,
} from '@/contexts/CreatePostContext';

export const useCreatePostContext = (): CreatePostContext => {
  const [state, setState] = useState(CREATE_POST_CONTEXT_DEFAULT_VALUES);

  const handleStateChange = useCallback(
    (newState: Partial<ICreatePostContext>) => {
      setState((prev) => ({ ...prev, ...newState }));
    },
    [state],
  );

  return [state, handleStateChange];
};
