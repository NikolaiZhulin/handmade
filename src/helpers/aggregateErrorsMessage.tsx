import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { IApiError } from '@/types/axios';

export const aggregateErrorsMessage = (e: AxiosError<IApiError>) => {
  const Message = () => (
    <div className="flex flex-col gap-2">
      {e.response?.data.errors
        ? e.response?.data.errors.map((err) => <p key={err.message}>{err.message}</p>)
        : 'Что-то пошло не так'}
    </div>
  );

  return Message;
};

export const getErrorToast = (e: AxiosError<IApiError>) => toast.error(aggregateErrorsMessage(e));
