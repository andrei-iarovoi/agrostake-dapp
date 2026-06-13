import { useChainId } from 'wagmi';

const SEPOLIA_CHAIN_ID = 11155111;

export function NetworkGuard() {
  const chainId = useChainId();

  console.log(chainId);

  if (chainId === SEPOLIA_CHAIN_ID) {
    return null;
  }

  return (
    <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
      <p className="font-semibold text-red-400">⚠ Wrong Network</p>

      <p className="mt-1 text-sm text-slate-300">Please switch to Ethereum Sepolia.</p>
    </div>
  );
}
