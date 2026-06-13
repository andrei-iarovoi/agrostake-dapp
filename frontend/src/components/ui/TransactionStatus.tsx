type Props = {
  isPending?: boolean;
  isConfirming?: boolean;
  isSuccess?: boolean;
  error?: Error | null;
};

export function TransactionStatus({ isPending, isConfirming, isSuccess, error }: Props) {
  if (isPending) {
    return <p className="text-sm text-amber-400">⏳ Waiting for wallet confirmation...</p>;
  }

  if (isConfirming) {
    return <p className="text-sm text-blue-400">🔄 Transaction pending...</p>;
  }

  if (isSuccess) {
    return <p className="text-sm text-emerald-400">✅ Transaction confirmed</p>;
  }

  if (error) {
    return <p className="text-sm text-red-400">❌ Transaction failed</p>;
  }

  return null;
}
