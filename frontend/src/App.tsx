import { ConnectWallet } from './components/ConnectWallet';
import { ProtocolStats } from './components/ProtocolStats';
import { UserStats } from './components/UserStats';
import { Faucet } from './components/Faucet';
import { StakeForm } from './components/StakeForm';
import { ClaimRewards } from './components/ClaimRewards';
import { UnstakeForm } from './components/UnstakeForm';
import { EmergencyWithdraw } from './components/EmergencyWithdraw';
import { OwnerPanel } from './components/OwnerPanel';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex flex-col items-center gap-6">
          <h1 className="text-5xl font-bold">🌾 AgroStake</h1>

          <p className="text-slate-400">Stake AGRO tokens and earn rewards</p>

          <ConnectWallet />
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
            <div className="rounded-xl border border-slate-700 p-4">
              <Faucet />
            </div>

            <div className="rounded-xl border border-slate-700 p-4">
              <StakeForm />
            </div>

            <div className="rounded-xl border border-slate-700 p-4">
              <ClaimRewards />
            </div>

            <div className="rounded-xl border border-slate-700 p-4">
              <UnstakeForm />
            </div>

            <div className="rounded-xl border border-slate-700 p-4">
              <EmergencyWithdraw />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-6 text-2xl font-semibold">Owner Dashboard</h2>

          <div className="rounded-xl border border-slate-700 p-4">
            <OwnerPanel />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
