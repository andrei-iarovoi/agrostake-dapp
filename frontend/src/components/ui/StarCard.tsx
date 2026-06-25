import type { ReactNode } from 'react';
import { Skeleton } from './Skeleton';

type StatCardProps = {
  icon?: ReactNode;
  label: string;
  value: string;
  loading?: boolean;
};

export function StatCard({ icon, label, value, loading = false }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-slate-700">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        {icon}
        <span>{label}</span>
      </div>

      {loading ? (
        <Skeleton className="mt-3 h-8 w-28" />
      ) : (
        <p className="mt-3 text-2xl font-bold">{value}</p>
      )}
    </div>
  );
}
