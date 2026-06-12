type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-slate-700">
      <p className="text-sm text-slate-400">{label}</p>

      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
