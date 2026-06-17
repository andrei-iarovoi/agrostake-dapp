import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_TOKEN_ADDRESS } from '../contracts/addresses';
import { agroTokenAbi } from '../contracts/agroToken';

import { Button } from './ui/Button';
import { TransactionStatus } from './ui/TransactionStatus';
import { Droplets } from 'lucide-react';
import { ActionCard } from './ui/ActionCard';
import { useTransactionToast } from '../hooks/useTransactionToast';

export function Faucet() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const receipt = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  const isConfirming = !!hash && receipt.isPending;
  const isSuccess = !!hash && receipt.isSuccess;

  useTransactionToast({
    isPending,
    isConfirming,
    isSuccess,
    error,
    toastId: 'faucet',
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
    <ActionCard title="Faucet" icon={<Droplets size={20} className="text-cyan-400" />}>
      <p className="text-sm text-slate-400">Receive test AGRO tokens.</p>

      <Button variant="secondary" onClick={handleFaucet}>
        Get Test Tokens
      </Button>

      <TransactionStatus
        isPending={isPending}
        isConfirming={Boolean(hash) && isConfirming}
        isSuccess={Boolean(hash) && isSuccess}
        error={error}
        hash={hash}
      />
    </ActionCard>
  );
}
