import { useState, useEffect } from 'react';
import { parseEther } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TransactionStatus } from './ui/TransactionStatus';
import { ArrowDownCircle } from 'lucide-react';
import { ActionCard } from './ui/ActionCard';
import { useTransactionToast } from '../hooks/useTransactionToast';
import { formatTokenAmount } from '../utils/format';

export function UnstakeForm() {
  const [amount, setAmount] = useState('');

  const { address } = useAccount();

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

  const parsedAmount = amount && Number(amount) > 0 ? parseEther(amount) : 0n;

  const hasEnoughStaked = stakeInfo !== undefined && parsedAmount <= stakeInfo.amount;

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const receipt = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  const isConfirming = !!hash && receipt.isPending;
  const isSuccess = !!hash && receipt.isSuccess;

  useEffect(() => {
    if (isSuccess) {
      setAmount('');
    }
  }, [isSuccess]);

  useTransactionToast({
    isPending,
    isConfirming,
    isSuccess,
    error,
    toastId: 'unstake',
  });

  function handleMax() {
    if (!stakeInfo) return;

    setAmount((Number(stakeInfo.amount) / 1e18).toFixed(2));
  }

  const isValidAmount = Number(amount) > 0;

  function handleUnstake() {
    if (!amount || Number(amount) <= 0) return;

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
        Staked: {stakeInfo ? formatTokenAmount(stakeInfo.amount) : '0'} AGRO
      </p>

      <Button
        variant="danger"
        onClick={handleUnstake}
        disabled={!isValidAmount || !hasEnoughStaked}
      >
        Unstake
      </Button>
      {amount && Number(amount) <= 0 && (
        <p className="text-sm text-red-400">Amount must be greater than 0</p>
      )}

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
