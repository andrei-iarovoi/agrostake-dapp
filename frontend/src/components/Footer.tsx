import { Code2, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 py-10 text-center">
      <h3 className="mb-2 text-3xl font-bold">🌽 AgroStake</h3>

      <p className="text-sm text-slate-400">Decentralized Agricultural Staking Protocol</p>

      <p className="mt-4 text-sm text-slate-500">
        Built with Solidity • Foundry • React • Viem • Wagmi • RainbowKit
      </p>

      <div className="mt-6 flex justify-center gap-6">
        <a
          href="https://github.com/andrei-iarovoi/agrostake-dapp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <Code2 size={18} />
          GitHub
        </a>

        <a
          href="https://sepolia.etherscan.io/address/0x1544ccC232A4a0D183C07B86E8EAe5A35419A831#code"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          Contract
        </a>
      </div>

      <p className="mt-6 text-xs text-slate-600">
        © 2026 AgroStake. Built for educational and portfolio purposes.
      </p>
    </footer>
  );
}
