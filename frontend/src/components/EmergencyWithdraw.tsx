import { useWriteContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';

export function EmergencyWithdraw() {
  const { writeContract, isPending } = useWriteContract();

  function handleEmergencyWithdraw() {
    const confirmed = window.confirm('⚠️ You will lose all pending rewards. Continue?');

    if (!confirmed) {
      return;
    }

    writeContract({
      account: undefined,
      chain: undefined,
      address: AGRO_STAKING_ADDRESS,
      abi: agroStakingAbi,
      functionName: 'emergencyWithdraw',
    });
  }

  return (
    <div>
      <h2>Emergency Withdraw</h2>

      <p>⚠️ All pending rewards will be lost.</p>

      <button onClick={handleEmergencyWithdraw} disabled={isPending}>
        {isPending ? 'Withdrawing...' : 'Emergency Withdraw'}
      </button>
    </div>
  );
}
