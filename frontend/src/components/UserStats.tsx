import { Wallet, Coins, Gift, Clock3, User } from 'lucide-react';

import { useAccount, useReadContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS, AGRO_TOKEN_ADDRESS } from '../contracts/addresses';

import { agroStakingAbi } from '../contracts/agroStaking';
import { agroTokenAbi } from '../contracts/agroToken';

import { formatTokenAmount } from '../utils/format';

import { StatCard } from './ui/StarCard';

export function UserStats() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading: isBalanceLoading } = useReadContract({
    address: AGRO_TOKEN_ADDRESS,
    abi: agroTokenAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: stakeInfo, isLoading: StakeLoading } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: pendingRewards, isLoading: isRewardLoading } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'pendingRewards',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  if (!isConnected) {
    return <p className="text-slate-400">Connect wallet to view your stats.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <User size={28} className="text-cyan-400" />
        <h2 className="text-3xl font-bold">Your Position</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Wallet size={16} />}
          label="Wallet Balance"
          value={`${balance ? formatTokenAmount(balance) : '0'} AGRO`}
          loading={isBalanceLoading}
        />

        <StatCard
          icon={<Coins size={16} />}
          label="Staked Amount"
          value={`${stakeInfo ? formatTokenAmount(stakeInfo.amount) : '0'} AGRO`}
          loading={StakeLoading}
        />

        <StatCard
          icon={<Gift size={16} />}
          label="Claimed Rewards"
          value={`${stakeInfo ? formatTokenAmount(stakeInfo.rewardsClaimed) : '0'} AGRO`}
          loading={isRewardLoading}
        />

        <StatCard
          icon={<Clock3 size={16} />}
          label="Pending Rewards"
          value={`${pendingRewards ? formatTokenAmount(pendingRewards) : '0'} AGRO`}
          loading={isRewardLoading}
        />
      </div>
    </div>
  );
}
