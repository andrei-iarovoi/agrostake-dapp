import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';
import { TransactionStatus } from './ui/TransactionStatus';

export function ClaimRewards() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isPending: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash!,
    query: {
      enabled: Boolean(hash),
    },
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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Rewards</h3>

      <Button variant="success" onClick={handleClaimRewards}>
        Claim Rewards
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
