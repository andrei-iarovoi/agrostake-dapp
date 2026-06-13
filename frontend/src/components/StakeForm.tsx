import { useState, useEffect } from 'react';
import { parseEther } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { AGRO_TOKEN_ADDRESS, AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroTokenAbi } from '../contracts/agroToken';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TransactionStatus } from './ui/TransactionStatus';
import { Sprout } from 'lucide-react';
import { ActionCard } from './ui/ActionCard';
import { toast } from 'sonner';
import { useTransactionToast } from '../hooks/useTransactionToast';

export function StakeForm() {
  const [amount, setAmount] = useState('');

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isPending: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash!,
    query: {
      enabled: Boolean(hash),
    },
  });

  useTransactionToast({
    isPending,
    isConfirming,
    isSuccess,
    error,
    toastId: 'stake',
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
    <ActionCard title="Stake Tokens" icon={<Sprout size={20} className="text-emerald-400" />}>
      <p className="text-sm text-slate-400">Approve AGRO and start earning rewards.</p>
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

      <TransactionStatus
        isPending={isPending}
        isConfirming={Boolean(hash) && isConfirming}
        isSuccess={Boolean(hash) && isSuccess}
        error={error}
        hash={hash}
      />
    </ActionCard>
  );
}
