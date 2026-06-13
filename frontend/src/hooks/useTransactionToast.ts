import { useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error: Error | null;
  toastId: string;
};

export function useTransactionToast({ isPending, isConfirming, isSuccess, error, toastId }: Props) {
  useEffect(() => {
    if (isPending) {
      toast.loading('Waiting for wallet confirmation...', {
        id: toastId,
      });
    }
  }, [isPending, toastId]);

  useEffect(() => {
    if (isConfirming) {
      toast.loading('Transaction pending...', {
        id: toastId,
      });
    }
  }, [isConfirming, toastId]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction confirmed!', {
        id: toastId,
      });
    }
  }, [isSuccess, toastId]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Transaction failed', {
        id: toastId,
      });
    }
  }, [error, toastId]);
}
