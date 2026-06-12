import { useAccount, useReadContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS, AGRO_TOKEN_ADDRESS } from '../contracts/addresses';

import { agroStakingAbi } from '../contracts/agroStaking';
import { agroTokenAbi } from '../contracts/agroToken';

import { formatTokenAmount } from '../utils/format';

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
    return <p>Connect wallet to view your stats.</p>;
  }

  return (
    <div>
      <h2>Your Position</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Wallet Balance</span>
          <strong>{balance ? formatTokenAmount(balance) : '0'} AGRO</strong>
        </div>

        <div className="stat-card">
          <span>Staked Amount</span>
          <strong>{stakeInfo ? formatTokenAmount(stakeInfo.amount) : '0'} AGRO</strong>
        </div>

        <div className="stat-card">
          <span>Claimed Rewards</span>
          <strong>{stakeInfo ? formatTokenAmount(stakeInfo.rewardsClaimed) : '0'} AGRO</strong>
        </div>

        <div className="stat-card">
          <span>Pending Rewards</span>
          <strong>{pendingRewards ? formatTokenAmount(pendingRewards) : '0'} AGRO</strong>
        </div>
      </div>
    </div>
  );
}
