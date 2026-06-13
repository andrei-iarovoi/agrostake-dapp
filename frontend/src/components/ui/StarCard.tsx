import type { ReactNode } from 'react';

type StatCardProps = {
  icon?: ReactNode;
  label: string;
  value: string;
};

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-slate-700">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
