import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS, AGRO_TOKEN_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';
import { useState } from 'react';
import { parseEther } from 'viem';
import { agroTokenAbi } from '../contracts/agroToken';

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

  if (!address || !owner) {
    return null;
  }

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
    if (!mintAddress || !mintAmount) {
      return;
    }

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
    <div>
      <h2>Owner Panel</h2>

      <p>Contract Owner Connected</p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Reward Pool Amount"
      />
      <button onClick={handleApprovePool}>Approve Reward Pool</button>
      <button onClick={handleFundPool}>Fund Reward Pool</button>

      <h3>Mint Tokens</h3>

      <input
        type="text"
        value={mintAddress}
        onChange={(e) => setMintAddress(e.target.value)}
        placeholder="Recipient Address"
      />

      <input
        type="number"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
        placeholder="Amount"
      />

      <button onClick={handleMint}>Mint Tokens</button>
    </div>
  );
}
