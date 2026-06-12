import { ConnectWallet } from './components/ConnectWallet';
import { ProtocolStats } from './components/ProtocolStats';
import { UserStats } from './components/UserStats';
import { Faucet } from './components/Faucet';

function App() {
  return (
    <>
      <h1>AgroStake</h1>

      <ConnectWallet />

      <ProtocolStats />

      <UserStats />

      <Faucet />
    </>
  );
}

export default App;
