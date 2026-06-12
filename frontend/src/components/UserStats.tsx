import { useAccount, useReadContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS, AGRO_TOKEN_ADDRESS } from '../contracts/addresses';

import { agroStakingAbi } from '../contracts/agroStaking';
import { agroTokenAbi } from '../contracts/agroToken';

import { formatTokenAmount } from '../utils/format';

import { StatCard } from './ui/StarCard';

export function UserStats() {
  const { address, isConnected } = useAccount();

  const { data: balance } = useReadContract({
    address: AGRO_TOKEN_ADDRESS,
    abi: agroTokenAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: stakeInfo } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: pendingRewards } = useReadContract({
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
      <h2 className="mb-6 text-2xl font-bold">Your Position</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Wallet Balance"
          value={`${balance ? formatTokenAmount(balance) : '0'} AGRO`}
        />

        <StatCard
          label="Staked Amount"
          value={`${stakeInfo ? formatTokenAmount(stakeInfo.amount) : '0'} AGRO`}
        />

        <StatCard
          label="Claimed Rewards"
          value={`${stakeInfo ? formatTokenAmount(stakeInfo.rewardsClaimed) : '0'} AGRO`}
        />

        <StatCard
          label="Pending Rewards"
          value={`${pendingRewards ? formatTokenAmount(pendingRewards) : '0'} AGRO`}
        />
      </div>
    </div>
  );
}
