import { useState } from 'react';

export function StakeForm() {
  const [amount, setAmount] = useState('');

  return (
    <div>
      <h2>Stake Tokens</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
    </div>
  );
}
