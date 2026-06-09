import { ConnectWallet } from './components/ConnectWallet';
import { ProtocolStats } from './components/ProtocolStats';

function App() {
  return (
    <>
      <h1>AgroStake</h1>

      <ConnectWallet />

      <ProtocolStats />
    </>
  );
}

export default App;
