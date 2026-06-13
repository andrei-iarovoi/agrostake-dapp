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

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="relative overflow-hidden rounded-3xl mb-10">
          <img
            src={agroBg}
            alt="Agro background"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-slate-950/80" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-20">
            <h1 className="text-7xl font-bold">🌾 AgroStake</h1>

            <p className="mt-2 text-lg text-slate-300">
              Decentralized Agricultural Staking Protocol
            </p>

            <ConnectWallet />
          </div>
        </header>

        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <ProtocolStats />
        </section>

        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <UserStats />
        </section>

        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-6 text-2xl font-semibold">Actions</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex min-h-[180px] flex-col rounded-xl border border-slate-700 p-4">
              <Faucet />
            </div>

            <div className="flex min-h-[180px] flex-col rounded-xl border border-slate-700 p-4">
              <StakeForm />
            </div>

            <div className="flex min-h-[180px] flex-col rounded-xl border border-slate-700 p-4">
              <ClaimRewards />
            </div>

            <div className="flex min-h-[180px] flex-col rounded-xl border border-slate-700 p-4">
              <UnstakeForm />
            </div>

            <div className="flex min-h-[180px] flex-col rounded-xl border border-slate-700 p-4">
              <EmergencyWithdraw />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h2 className="mb-6 text-2xl font-semibold text-amber-300">Owner Dashboard</h2>

          <div className="rounded-xl border border-slate-700 p-4">
            <OwnerPanel />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
