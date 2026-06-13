import { useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { ShieldCheck, Coins } from 'lucide-react';

import { AGRO_STAKING_ADDRESS, AGRO_TOKEN_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';
import { agroTokenAbi } from '../contracts/agroToken';

import { Button } from './ui/Button';
import { Input } from './ui/Input';

export function OwnerPanel() {
  const [amount, setAmount] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  const { writeContract } = useWriteContract();
  const { address } = useAccount();

  const { data: owner } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'owner',
  });

  if (!address || !owner) return null;

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

  function handleMint() {
    if (!mintAddress || !mintAmount) return;

    writeContract({
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

        <Input
          type="number"
          value={mintAmount}
          placeholder="Amount"
          onChange={(e) => setMintAmount(e.target.value)}
        />

        <Button variant="primary" onClick={handleMint}>
          Mint Tokens
        </Button>
      </div>
    </div>
  );
}
