import { TrendingUp, Coins, Users, Wallet } from 'lucide-react';

import { useReadContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

import { formatTokenAmount } from '../utils/format';

import { StatCard } from './ui/StarCard';
import { BarChart3 } from 'lucide-react';

export function ProtocolStats() {
  const { data: stats, isLoading: isAprLoading } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'getProtocolStats',
    query: {
      refetchInterval: 5000,
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 size={28} className="text-emerald-400" />
        <h2 className="text-3xl font-bold">Protocol Statistics</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<TrendingUp size={16} />}
          label="APR"
          value={`${stats?.apr.toString() ?? '0'}%`}
          loading={isAprLoading}
        />

        <StatCard
          icon={<Coins size={16} />}
          label="TVL"
          value={`${stats ? formatTokenAmount(stats.totalStaked) : '0'} AGRO`}
          loading={isAprLoading}
        />

        <StatCard
          icon={<Users size={16} />}
          label="Total Stakers"
          value={stats?.totalStakers.toString() ?? '0'}
          loading={isAprLoading}
        />

        <StatCard
          icon={<Wallet size={16} />}
          label="Reward Pool"
          value={`${stats ? formatTokenAmount(stats.rewardPoolBalance) : '0'} AGRO`}
          loading={isAprLoading}
        />
      </div>
    </div>
  );
}
