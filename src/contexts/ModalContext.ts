import { createContext } from 'react';

export interface IModalContextValues {
  feedbackModal: boolean;
  postReport: boolean;
  authModal: boolean;
}

export const MODAL_CONTEXT_VALUES: IModalContextValues = {
  feedbackModal: false,
  postReport: false,
  authModal: false,
};

export type ModalContext = [IModalContextValues, (newState: Partial<IModalContextValues>) => void];

export const ModalContext = createContext<ModalContext>([MODAL_CONTEXT_VALUES, () => {}]);
