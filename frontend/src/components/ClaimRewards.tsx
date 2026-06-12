import { useWriteContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';

import { agroStakingAbi } from '../contracts/agroStaking';

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
    <div>
      <h2>Rewards</h2>

      <button onClick={handleClaimRewards}>Claim Rewards</button>
    </div>
  );
}
