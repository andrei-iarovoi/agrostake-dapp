import { useReadContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

export function ProtocolStats() {
  const { data: stats, isLoading } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'getProtocolStats',

    query: {
      refetchInterval: 5000,
    },
  });

  if (isLoading) {
    return <p>Loading protocol stats...</p>;
  }

  return (
    <div>
      <h2>Protocol Stats</h2>

      <p>APR: {stats?.apr.toString()}%</p>

      <p>TVL: {stats ? Number(stats.totalStaked) / 1e18 : 0} AGRO</p>

      <p>Total Stakers: {stats?.totalStakers.toString()}</p>

      <p>Reward Pool: {stats ? Number(stats.rewardPoolBalance) / 1e18 : 0} AGRO</p>
    </div>
  );
}
