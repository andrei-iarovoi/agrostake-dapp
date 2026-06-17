import { BarChart3, User, Zap, ShieldCheck } from 'lucide-react';

import { ConnectWallet } from './components/ConnectWallet';
import { ProtocolStats } from './components/ProtocolStats';
import { UserStats } from './components/UserStats';
import { Faucet } from './components/Faucet';
import { StakeForm } from './components/StakeForm';
import { ClaimRewards } from './components/ClaimRewards';
import { UnstakeForm } from './components/UnstakeForm';
import { EmergencyWithdraw } from './components/EmergencyWithdraw';
import { OwnerPanel } from './components/OwnerPanel';
import agroBg from './assets/agro-bg.png';
import { NetworkGuard } from './components/NetworkGuard';
import { useAccount, useReadContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from './contracts/addresses';
import { agroStakingAbi } from './contracts/agroStaking';

function App() {
  const { address } = useAccount();

  const { data: owner } = useReadContract({
    address: AGRO_STAKING_ADDRESS,
    abi: agroStakingAbi,
    functionName: 'owner',
  });

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  return (
    <main className="min-h-screen bg-[#08100d] text-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="relative overflow-hidden rounded-3xl mb-10">
          <img
            src={agroBg}
            alt="Agro background"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-slate-950/80" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-20">
            <h1 className="text-5xl font-bold">🌾 AgroStake</h1>

            <p className="mt-2 text-lg text-slate-300">
              Decentralized Agricultural Staking Protocol
            </p>

            <ConnectWallet />
          </div>
        </header>

        <NetworkGuard />

        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <ProtocolStats />
        </section>

        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <UserStats />
        </section>

        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Zap size={28} className="text-amber-400" />
            <h2 className="text-3xl font-bold">Actions</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Faucet />
            <StakeForm />
            <ClaimRewards />
            <UnstakeForm />
            <EmergencyWithdraw />
          </div>
        </section>

        {isOwner && (
          <section className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck size={28} className="text-emerald-400" />
              <h2 className="text-3xl font-bold">Owner Dashboard</h2>
            </div>

            <div className="rounded-xl border border-slate-700 p-4">
              <OwnerPanel />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
