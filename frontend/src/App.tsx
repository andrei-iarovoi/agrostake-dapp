import { ConnectWallet } from './components/ConnectWallet';
import { ProtocolStats } from './components/ProtocolStats';
import { UserStats } from './components/UserStats';
import { Faucet } from './components/Faucet';
import { StakeForm } from './components/StakeForm';
import { ClaimRewards } from './components/ClaimRewards';
import { UnstakeForm } from './components/UnstakeForm';

function App() {
  return (
    <>
      <h1>AgroStake</h1>

      <ConnectWallet />

      <ProtocolStats />

      <UserStats />

      <Faucet />

      <StakeForm />

      <ClaimRewards />

      <UnstakeForm />
    </>
  );
}

export default App;
