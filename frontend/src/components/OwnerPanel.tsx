import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS, AGRO_TOKEN_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';
import { useState } from 'react';
import { parseEther } from 'viem';
import { agroTokenAbi } from '../contracts/agroToken';

export function OwnerPanel() {
  const [amount, setAmount] = useState('');

  const { writeContract } = useWriteContract();

  const { address } = useAccount();

  const { data: owner } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'owner',
  });

  if (!address || !owner) {
    return null;
  }

  if (address.toLowerCase() !== owner.toLowerCase()) {
    return null;
  }

  function handleApprovePool() {
    if (!amount) return;

    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_TOKEN_ADDRESS,
      abi: agroTokenAbi,
      functionName: 'approve',
      args: [AGRO_STAKING_ADDRESS, parseEther(amount)],
    });
  }

  function handleFundPool() {
    if (!amount) return;

    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_STAKING_ADDRESS,
      abi: agroStakingAbi,
      functionName: 'fundRewardPool',
      args: [parseEther(amount)],
    });
  }

  return (
    <div>
      <h2>Owner Panel</h2>

      <p>Contract Owner Connected</p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Reward Pool Amount"
      />
      <button onClick={handleApprovePool}>Approve Reward Pool</button>
      <button onClick={handleFundPool}>Fund Reward Pool</button>
    </div>
  );
}
