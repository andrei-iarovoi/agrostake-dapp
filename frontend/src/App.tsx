import { ConnectWallet } from './components/ConnectWallet';
import { ProtocolStats } from './components/ProtocolStats';
import { UserStats } from './components/UserStats';
import { Faucet } from './components/Faucet';
import { StakeForm } from './components/StakeForm';
import { ClaimRewards } from './components/ClaimRewards';
import { UnstakeForm } from './components/UnstakeForm';
import { EmergencyWithdraw } from './components/EmergencyWithdraw';

function App() {
  return (
    <main className="app">
      <header className="header">
        <h1>AgroStake</h1>

        <ConnectWallet />
      </header>

      <section className="section">
        <ProtocolStats />
      </section>

      <section className="section">
        <UserStats />
      </section>

      <section className="section">
        <h2>Actions</h2>

        <Faucet />

        <StakeForm />

        <ClaimRewards />

        <UnstakeForm />

        <EmergencyWithdraw />
      </section>
    </main>
  );
}

export default App;
