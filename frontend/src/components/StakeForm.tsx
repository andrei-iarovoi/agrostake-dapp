import { useState } from 'react';
import { parseEther, formatEther } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract, useAccount, useReadContract } from 'wagmi';

import { AGRO_TOKEN_ADDRESS, AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroTokenAbi } from '../contracts/agroToken';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TransactionStatus } from './ui/TransactionStatus';
import { Sprout } from 'lucide-react';
import { ActionCard } from './ui/ActionCard';
import { useTransactionToast } from '../hooks/useTransactionToast';
import { formatTokenAmount } from '../utils/format';

export function StakeForm() {
  const [amount, setAmount] = useState('');
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    address: AGRO_TOKEN_ADDRESS,
    abi: agroTokenAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: allowance } = useReadContract({
    address: AGRO_TOKEN_ADDRESS,
    abi: agroTokenAbi,
    functionName: 'allowance',
    args: address ? [address, AGRO_STAKING_ADDRESS] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 3000,
    },
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const receipt = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  const isConfirming = !!hash && receipt.isPending;
  const isSuccess = !!hash && receipt.isSuccess;

  useTransactionToast({
    isPending,
    isConfirming,
    isSuccess,
    error,
    toastId: 'stake',
  });

  const parsedAmount = amount && Number(amount) > 0 ? parseEther(amount) : 0n;
  const hasEnoughAllowance = allowance !== undefined && allowance >= parsedAmount;

  const hasEnoughBalance = balance !== undefined && balance >= parsedAmount;
  let stakeError = '';

  if (!amount) {
    stakeError = 'Enter amount';
  } else if (!hasEnoughBalance) {
    stakeError = 'Insufficient balance';
  } else if (!hasEnoughAllowance) {
    stakeError = 'Approval required';
  }

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

  function handleMax() {
    if (!balance) return;

    setAmount((Number(balance) / 1e18).toFixed(2));
  }

  return (
    <ActionCard title="Stake Tokens" icon={<Sprout size={20} className="text-emerald-400" />}>
      <p className="text-sm text-slate-400">Approve AGRO and start earning rewards.</p>
      <div className="relative">
        <Input
          type="number"
          value={amount}
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          type="button"
          onClick={handleMax}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
        >
          MAX
        </button>
      </div>

      <p className="mt-1 text-xs text-slate-400">
        Available: {balance ? formatTokenAmount(balance) : '0'} AGRO
      </p>

      <div className="space-y-2">
        <Button variant="warning" onClick={handleApprove} disabled={!amount || !hasEnoughBalance}>
          Approve
        </Button>

        <Button variant="success" onClick={handleStake} disabled={!!stakeError}>
          Stake
        </Button>
        {stakeError && <p className="text-sm text-amber-400">{stakeError}</p>}
        <p className="text-xs text-slate-500">
          {hasEnoughAllowance ? '✅ Approved' : '⚠ Approval required'}
        </p>
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
