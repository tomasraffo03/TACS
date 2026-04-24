import { useEffect, useState } from 'react';

interface CountdownBadgeProps {
  endTime: string; // ISO 8601
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Finalizada';
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h`;
  return [hours, minutes, seconds]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');
}

export default function CountdownBadge({ endTime }: CountdownBadgeProps) {
  const [ms, setMs] = useState(() => new Date(endTime).getTime() - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setMs(new Date(endTime).getTime() - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const finished = ms <= 0;
  const critical = ms > 0 && ms < 5 * 60 * 1000;   // < 5 min
  const warning  = ms > 0 && ms < 60 * 60 * 1000;  // < 1 h

  const colorClass = finished
    ? 'bg-surface2 text-muted'
    : critical
    ? 'bg-secondary/15 text-secondary'
    : warning
    ? 'bg-yellow-500/15 text-yellow-400'
    : 'bg-primary/15 text-primary';

  return (
    <span
      className={
        `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-mono font-semibold transition-all duration-300 ${colorClass}`
      }
    >
      {/* Pulsing dot when critical */}
      {critical && !finished && (
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-dot shrink-0" />
      )}
      {formatCountdown(ms)}
    </span>
  );
}
