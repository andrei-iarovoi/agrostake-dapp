import { useWriteContract } from 'wagmi';

import { AGRO_TOKEN_ADDRESS } from '../contracts/addresses';
import { agroTokenAbi } from '../contracts/agroToken';

import { Button } from './ui/Button';

export function Faucet() {
  const { writeContract } = useWriteContract();

  function handleFaucet() {
    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_TOKEN_ADDRESS,
      abi: agroTokenAbi,
      functionName: 'faucet',
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Faucet</h3>

      <p className="text-sm text-slate-400">Receive test AGRO tokens.</p>

      <Button onClick={handleFaucet}>Get Test Tokens</Button>
    </div>
  );
}
