import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';
import { Button } from './ui/Button';
import { TransactionStatus } from './ui/TransactionStatus';

export function EmergencyWithdraw() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isPending: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash!,
    query: {
      enabled: Boolean(hash),
    },
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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Emergency Withdraw</h3>

      <p className="text-sm text-red-400">⚠️ All pending rewards will be lost.</p>

      <Button variant="danger" onClick={handleEmergencyWithdraw}>
        Emergency Withdraw
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
