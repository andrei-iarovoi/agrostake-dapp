import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';
import { Button } from './ui/Button';
import { TransactionStatus } from './ui/TransactionStatus';
import { AlertTriangle, TriangleAlert } from 'lucide-react';
import { ActionCard } from './ui/ActionCard';
import { useTransactionToast } from '../hooks/useTransactionToast';

export function EmergencyWithdraw() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isPending: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash!,
    query: {
      enabled: Boolean(hash),
    },
  });

  useTransactionToast({
    isPending,
    isConfirming,
    isSuccess,
    error,
    toastId: 'emergency-withdraw',
  });

  function handleEmergencyWithdraw() {
    const confirmed = window.confirm('⚠️ You will lose all pending rewards. Continue?');

    if (!confirmed) {
      return;
    }

    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_STAKING_ADDRESS,
      abi: agroStakingAbi,
      functionName: 'emergencyWithdraw',
    });
  }

  return (
    <ActionCard
      title="Emergency Withdraw"
      icon={<AlertTriangle size={20} className="text-red-400" />}
    >
      <p className="text-sm text-red-400">⚠️ Withdraw instantly and forfeit pending rewards.</p>

      <Button variant="danger" onClick={handleEmergencyWithdraw}>
        Emergency Withdraw
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
