import { useReadContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

export function ProtocolStats() {
  const { data: apr } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'APR',
  });

  return (
    <div>
      <h2>Protocol Stats</h2>

      <p>APR: {apr?.toString()} bp</p>
    </div>
  );
}
