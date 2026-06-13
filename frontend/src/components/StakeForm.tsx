import { useState } from 'react';
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';

import { AGRO_TOKEN_ADDRESS, AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroTokenAbi } from '../contracts/agroToken';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';
import { Input } from './ui/Input';

export function StakeForm() {
  const [amount, setAmount] = useState('');

  const { writeContract } = useWriteContract();

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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Stake Tokens</h3>

      <Input
        type="number"
        value={amount}
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="space-y-2">
        <Button variant="warning" onClick={handleApprove}>
          Approve
        </Button>

        <Button variant="success" onClick={handleStake}>
          Stake
        </Button>
      </div>
    </div>
  );
}
