// ── StatCard ──────────────────────────────────────────────────────────────────
// Reutilizable para mostrar una métrica numérica con ícono y acento de color.

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accentColor: string;
  sub?: string;
}

export function StatCard({ label, value, icon, accentColor, sub }: StatCardProps) {
  return (
    <div
      className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4"
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${accentColor}18` }}
      >
        <span style={{ color: accentColor }} className="[&>svg]:w-5 [&>svg]:h-5">
          {icon}
        </span>
      </div>
      <div className="flex flex-col min-w-0">
        <p className="text-[0.7rem] text-muted uppercase tracking-wider mb-0.5 truncate">{label}</p>
        <p className="text-2xl font-bold text-text leading-none">{value}</p>
        {sub && <p className="text-[0.68rem] text-muted mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
// Encabezado de sección consistente con el resto de la app.

interface SectionHeaderProps {
  label: string;
  accentColor: string;
}

export function SectionHeader({ label, accentColor }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: accentColor }} />
      <h2 className="text-sm font-bold text-text uppercase tracking-wide">{label}</h2>
    </div>
  );
}

// ── RankRow ───────────────────────────────────────────────────────────────────
// Fila de ranking para listas de top usuarios.

interface RankRowProps {
  rank: number;
  username: string;
  count: number;
  countLabel: string;
  accentColor: string;
}

export function RankRow({ rank, username, count, countLabel, accentColor }: RankRowProps) {
  const isFirst = rank === 1;
  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all"
      style={{
        borderColor: isFirst ? `${accentColor}50` : 'var(--color-border)',
        background:  isFirst ? `${accentColor}06` : 'var(--color-surface2)',
      }}
    >
      <span
        className="w-5 h-5 rounded-full text-[0.6rem] font-bold flex items-center justify-center shrink-0"
        style={{
          background: isFirst ? accentColor : 'var(--color-border)',
          color:      isFirst ? 'white'     : 'var(--color-muted)',
        }}
      >
        {rank}
      </span>
      <span className="text-xs font-medium text-text flex-1 truncate">@{username}</span>
      <span className="text-xs font-semibold shrink-0" style={{ color: accentColor }}>
        {count} {countLabel}
      </span>
    </div>
  );
}

// ── ActivityItem ──────────────────────────────────────────────────────────────
// Ítem de actividad reciente con ícono por tipo y timestamp relativo.

import type { RecentActivityItem } from '../../services/adminService';

const ACTIVITY_CONFIG: Record<
  RecentActivityItem['type'],
  { color: string; icon: React.ReactNode }
> = {
  auction_created: {
    color: '#D82D31',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" />
      </svg>
    ),
  },
  bid_placed: {
    color: '#03BAE9',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
      </svg>
    ),
  },
  auction_finished: {
    color: '#05B15A',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
      </svg>
    ),
  },
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins < 1)   return 'ahora';
  if (mins < 60)  return `hace ${mins}m`;
  if (hours < 24) return `hace ${hours}h`;
  return `hace ${days}d`;
}

interface ActivityItemProps {
  item: RecentActivityItem;
}

export function ActivityItem({ item }: ActivityItemProps) {
  const cfg = ACTIVITY_CONFIG[item.type];
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: `${cfg.color}15`, color: cfg.color }}
      >
        {cfg.icon}
      </div>
      <p className="text-xs text-text flex-1 leading-relaxed">{item.description}</p>
      <time className="text-[0.65rem] text-muted whitespace-nowrap shrink-0 mt-0.5">
        {relativeTime(item.timestamp)}
      </time>
    </div>
  );
}
