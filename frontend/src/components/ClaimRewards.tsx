import { useWriteContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';

export function ClaimRewards() {
  const { writeContract } = useWriteContract();

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
    </div>
  );
}
