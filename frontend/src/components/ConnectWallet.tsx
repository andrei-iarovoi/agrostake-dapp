import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useChainId } from 'wagmi';
import { useAccount } from 'wagmi';

export function ConnectWallet() {
  const chainId = useChainId();
  const { isConnected } = useAccount();

  const network = chainId === 11155111 ? 'Sepolia' : 'Unknown Network';

  return (
    <div className="flex flex-col items-center gap-3">
      <ConnectButton />

      {isConnected && (
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {network}
        </div>
      )}
    </div>
  );
}
