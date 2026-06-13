import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_TOKEN_ADDRESS } from '../contracts/addresses';
import { agroTokenAbi } from '../contracts/agroToken';

import { Button } from './ui/Button';
import { TransactionStatus } from './ui/TransactionStatus';

export function Faucet() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isPending: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash!,
    query: {
      enabled: Boolean(hash),
    },
  });

  function handleFaucet() {
    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_TOKEN_ADDRESS,
      abi: agroTokenAbi,
      functionName: 'faucet',
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Faucet</h3>

      <p className="text-sm text-slate-400">Receive test AGRO tokens.</p>

      <Button variant="secondary" onClick={handleFaucet}>
        Get Test Tokens
      </Button>

      <TransactionStatus
        isPending={isPending}
        isConfirming={isConfirming}
        isSuccess={isSuccess}
        error={error}
      />
    </div>
  );
}
