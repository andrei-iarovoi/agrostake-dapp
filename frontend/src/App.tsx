import { ConnectWallet } from './components/ConnectWallet';
import { ProtocolStats } from './components/ProtocolStats';
import { UserStats } from './components/UserStats';

function App() {
  return (
    <>
      <h1>AgroStake</h1>

      <ConnectWallet />

      <ProtocolStats />

      <UserStats />
    </>
  );
}

export default App;
