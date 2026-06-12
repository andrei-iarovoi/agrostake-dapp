import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { AGRO_TOKEN_ADDRESS } from '../contracts/addresses';
import { agroTokenAbi } from '../contracts/agroToken';

export function Faucet() {
  const { data: hash, writeContract } = useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

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
    <div>
      <h2>Faucet</h2>

      <button onClick={handleFaucet}>Get Test Tokens</button>
    </div>
  );
}
