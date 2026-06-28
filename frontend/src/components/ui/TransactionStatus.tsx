type TransactionStatusProps = {
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error: Error | null;
  hash?: string;
};

export function TransactionStatus({
  isPending,
  isConfirming,
  isSuccess,
  error,
  hash,
}: TransactionStatusProps) {
  if (isPending) {
    return <p className="text-sm text-amber-400">⏳ Waiting for wallet confirmation...</p>;
  }

  if (isConfirming) {
    return <p className="text-sm text-blue-400">🔄 Transaction pending...</p>;
  }

  if (isSuccess) {
    return (
      <div className="space-y-1">
        <p className="text-sm text-emerald-400">✅ Transaction confirmed</p>

        {hash && (
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            🔗 View Transaction
          </a>
        )}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-400">❌ Transaction failed</p>;
  }

  return null;
}
