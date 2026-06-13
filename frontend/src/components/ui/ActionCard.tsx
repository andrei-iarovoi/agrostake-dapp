type ActionCardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export function ActionCard({ title, icon, children }: ActionCardProps) {
  return (
    <div
      className="
        min-h-[220px]
    flex
    flex-col
    justify-between
    rounded-2xl
    border
    border-slate-700
    bg-slate-950/40
    p-5
    transition-all
    duration-300
    hover:border-emerald-500/40
    hover:shadow-lg
    hover:shadow-emerald-500/10
      "
    >
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}
