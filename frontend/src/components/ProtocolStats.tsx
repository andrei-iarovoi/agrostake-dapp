import { useReadContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

import { formatTokenAmount } from '../utils/format';

import { StatCard } from './ui/StarCard';

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
    return <p className="text-slate-400">Loading protocol stats...</p>;
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Protocol Statistics</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="APR" value={`${stats?.apr.toString() ?? '0'}%`} />

        <StatCard
          label="TVL"
          value={`${stats ? formatTokenAmount(stats.totalStaked) : '0'} AGRO`}
        />

        <StatCard label="Total Stakers" value={stats?.totalStakers.toString() ?? '0'} />

        <StatCard
          label="Reward Pool"
          value={`${stats ? formatTokenAmount(stats.rewardPoolBalance) : '0'} AGRO`}
        />
      </div>
    </div>
  );
}
