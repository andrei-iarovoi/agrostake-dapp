import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';
import { TransactionStatus } from './ui/TransactionStatus';
import { Gift } from 'lucide-react';
import { ActionCard } from './ui/ActionCard';
import { useTransactionToast } from '../hooks/useTransactionToast';

export function ClaimRewards() {
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
    toastId: 'claim-rewards',
  });

  function handleClaimRewards() {
    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_STAKING_ADDRESS,
      abi: agroStakingAbi,
      functionName: 'claimRewards',
    });
  }

  return (
    <ActionCard title="Rewards" icon={<Gift size={20} className="text-amber-400" />}>
      <p className="text-sm text-slate-400">Claim accumulated staking rewards.</p>
      <Button variant="success" onClick={handleClaimRewards} disabled={isPending || isConfirming}>
        {isPending ? 'Claiming...' : isConfirming ? 'Confirming...' : 'Claim Rewards'}
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
