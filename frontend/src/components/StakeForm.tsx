import { useState, useEffect } from 'react';

import { parseEther } from 'viem';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_TOKEN_ADDRESS, AGRO_STAKING_ADDRESS } from '../contracts/addresses';

import { agroTokenAbi } from '../contracts/agroToken';
import { agroStakingAbi } from '../contracts/agroStaking';

export function StakeForm() {
  const [amount, setAmount] = useState('');

  const { data: hash, writeContract } = useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('Stake transaction confirmed');
    }
  }, [isSuccess]);

  function handleApprove() {
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

  function handleStake() {
    if (!amount) return;

    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_STAKING_ADDRESS,
      abi: agroStakingAbi,
      functionName: 'stake',
      args: [parseEther(amount)],
    });
  }

  return (
    <div>
      <h2>Stake Tokens</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleStake}>Stake</button>
    </div>
  );
}
