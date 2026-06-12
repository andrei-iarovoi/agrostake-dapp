export function formatTokenAmount(amount: bigint) {
  return (Number(amount) / 1e18).toFixed(2);
}
