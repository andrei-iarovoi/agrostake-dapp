import { useWriteContract } from 'wagmi';

import { AGRO_STAKING_ADDRESS } from '../contracts/addresses';
import { agroStakingAbi } from '../contracts/agroStaking';
import { Button } from './ui/Button';

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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Emergency Withdraw</h3>

      <p className="text-sm text-red-400">⚠️ All pending rewards will be lost.</p>

      <Button variant="danger" onClick={handleEmergencyWithdraw}>
        Emergency Withdraw
      </Button>
    </div>
  );
}
