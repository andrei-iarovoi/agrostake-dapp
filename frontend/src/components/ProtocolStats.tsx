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

      <div className="stats-grid">
        <div className="stat-card">
          <span>APR</span>
          <strong>{stats?.apr.toString()}%</strong>
        </div>

        <div className="stat-card">
          <span>TVL</span>
          <strong>{stats ? Number(stats.totalStaked) / 1e18 : 0} AGRO</strong>
        </div>

        <div className="stat-card">
          <span>Total Stakers</span>
          <strong>{stats?.totalStakers.toString()}</strong>
        </div>

        <div className="stat-card">
          <span>Reward Pool</span>
          <strong>{stats ? Number(stats.rewardPoolBalance) / 1e18 : 0} AGRO</strong>
        </div>
      </div>
    </div>
  );
}
