import { useState } from 'react';
import { parseEther } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { AGRO_TOKEN_ADDRESS, AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroTokenAbi } from '../contracts/agroToken';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';
import { Input } from './ui/Input';

export function StakeForm() {
  const [amount, setAmount] = useState('');

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isPending: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash!,
    query: {
      enabled: Boolean(hash),
    },
  });

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
      {hash && isPending && (
        <p className="text-sm text-amber-400">⏳ Waiting for wallet confirmation...</p>
      )}

      {hash && isConfirming && <p className="text-sm text-blue-400">🔄 Transaction pending...</p>}

      {hash && isSuccess && <p className="text-sm text-emerald-400">✅ Transaction confirmed</p>}

      {hash && error && <p className="text-sm text-red-400">❌ Transaction failed</p>}
    </div>
  );
}
