import { useState } from 'react';
import { parseEther } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TransactionStatus } from './ui/TransactionStatus';
import { ArrowDownCircle } from 'lucide-react';
import { ActionCard } from './ui/ActionCard';
import { useTransactionToast } from '../hooks/useTransactionToast';

export function UnstakeForm() {
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
    toastId: 'unstake',
  });

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
    <ActionCard
      title="Unstake Tokens"
      icon={<ArrowDownCircle size={20} className="text-red-400" />}
    >
      <p className="text-sm text-slate-400">Withdraw staked AGRO tokens.</p>
      <Input
        type="number"
        value={amount}
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button variant="danger" onClick={handleUnstake}>
        Unstake
      </Button>

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
