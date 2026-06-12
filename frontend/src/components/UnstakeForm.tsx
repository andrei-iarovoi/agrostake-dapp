import { useState } from 'react';

import { parseEther } from 'viem';

import { useWriteContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';

import { agroStakingAbi } from '../contracts/agroStaking';

export function UnstakeForm() {
  const [amount, setAmount] = useState('');

  const { writeContract } = useWriteContract();

  function handleUnstake() {
    if (!amount) return;

    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_STAKING_ADDRESS,
      abi: agroStakingAbi,
      functionName: 'unstake',
      args: [parseEther(amount)],
    });
  }

  return (
    <div>
      <h2>Unstake Tokens</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      <button onClick={handleUnstake}>Unstake</button>
    </div>
  );
}
