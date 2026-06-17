import { useState } from 'react';
import { parseEther, isAddress } from 'viem';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { ShieldCheck, Coins } from 'lucide-react';

import { AGRO_STAKING_ADDRESS, AGRO_TOKEN_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';
import { agroTokenAbi } from '../contracts/agroToken';

import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useTransactionToast } from '../hooks/useTransactionToast';
import { TransactionStatus } from './ui/TransactionStatus';

export function OwnerPanel() {
  const [amount, setAmount] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const isValidMintAddress = mintAddress === '' || isAddress(mintAddress);

  const {
    data: fundHash,
    writeContract: writeFundContract,
    isPending: isFundPending,
    error: fundError,
  } = useWriteContract();

  const {
    data: mintHash,
    writeContract: writeMintContract,
    isPending: isMintPending,
    error: mintError,
  } = useWriteContract();

  const fundReceipt = useWaitForTransactionReceipt({
    hash: fundHash,
    query: {
      enabled: !!fundHash,
    },
  });

  const isFundConfirming = !!fundHash && fundReceipt.isPending;
  const isFundSuccess = !!fundHash && fundReceipt.isSuccess;

  const mintReceipt = useWaitForTransactionReceipt({
    hash: mintHash,
    query: {
      enabled: !!mintHash,
    },
  });

  const isMintConfirming = !!mintHash && mintReceipt.isPending;
  const isMintSuccess = !!mintHash && mintReceipt.isSuccess;

  useTransactionToast({
    isPending: isFundPending,
    isConfirming: isFundConfirming,
    isSuccess: isFundSuccess,
    error: fundError,
    toastId: 'owner-fund',
  });

  useTransactionToast({
    isPending: isMintPending,
    isConfirming: isMintConfirming,
    isSuccess: isMintSuccess,
    error: mintError,
    toastId: 'mint',
  });

  const { address } = useAccount();

  const { data: owner } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'owner',
  });

  function handleApprovePool() {
    if (!amount) return;

    writeFundContract({
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

    writeFundContract({
      account: undefined,
      chain: undefined,
      address: AGRO_STAKING_ADDRESS,
      abi: agroStakingAbi,
      functionName: 'fundRewardPool',
      args: [parseEther(amount)],
    });
  }

  function handleMint() {
    if (!mintAddress || !mintAmount) return;

    writeMintContract({
      account: undefined,
      chain: undefined,
      address: AGRO_TOKEN_ADDRESS,
      abi: agroTokenAbi,
      functionName: 'mint',
      args: [mintAddress as `0x${string}`, parseEther(mintAmount)],
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <ShieldCheck className="text-emerald-400" size={24} />

        <div>
          <p className="font-semibold text-emerald-300">Contract Owner Connected</p>

          <p className="text-sm text-slate-400">Administrative functions unlocked</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-xl font-semibold">
          <Coins size={20} />
          Reward Pool Management
        </h3>

        <Input
          type="number"
          value={amount}
          placeholder="Reward Pool Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="grid gap-3 md:grid-cols-2">
          <Button variant="warning" onClick={handleApprovePool}>
            Approve Pool Funding
          </Button>

          <Button variant="success" onClick={handleFundPool}>
            Fund Reward Pool
          </Button>

          <TransactionStatus
            isPending={isFundPending}
            isConfirming={Boolean(fundHash) && isFundConfirming}
            isSuccess={Boolean(fundHash) && isFundSuccess}
            error={fundError}
            hash={fundHash}
          />
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-xl font-semibold">Mint AGRO Tokens</h3>

        <Input
          type="text"
          value={mintAddress}
          placeholder="Recipient Address"
          onChange={(e) => setMintAddress(e.target.value)}
        />
        {mintAddress && !isValidMintAddress && (
          <p className="text-sm text-red-400">Invalid wallet address</p>
        )}

        <Input
          type="number"
          value={mintAmount}
          placeholder="Amount"
          onChange={(e) => setMintAmount(e.target.value)}
        />

        <Button
          variant="primary"
          onClick={handleMint}
          disabled={!mintAmount || !mintAddress || !isValidMintAddress}
        >
          Mint Tokens
        </Button>

        <TransactionStatus
          isPending={isMintPending}
          isConfirming={Boolean(mintHash) && isMintConfirming}
          isSuccess={Boolean(mintHash) && isMintSuccess}
          error={mintError}
          hash={mintHash}
        />
      </div>
    </div>
  );
}
