import { TX_CONFIG, stickersLabel, type Transaction } from '../transacciones';

const BLUE = '#03BAE9';

interface Props {
  tx: Transaction;
  compact?: boolean; // true = tamaño reducido para el widget del perfil
  onUserClick?: (username: string) => void;
  onCardClick?: (tx: Transaction) => void;
}

export default function TransactionCard({ tx, compact = false, onUserClick, onCardClick }: Props) {
  const cfg = TX_CONFIG[tx.type];

  const iconSize    = compact ? 'w-8 h-8 rounded-lg mt-0.5' : 'w-10 h-10 rounded-xl';
  const labelSize   = compact ? 'text-xs' : 'text-sm';
  const dateColor   = compact ? 'text-gray-300' : 'text-gray-400';
  const userSize    = compact ? 'text-xs' : 'text-sm';
  const svgSize     = compact ? 'w-3 h-3' : 'w-3.5 h-3.5';
  const gap         = compact ? 'mb-0.5' : 'mb-1';
  const cardPadding = compact ? 'px-5 py-3.5' : 'px-5 py-4';
  const cardBorder  = compact ? '' : `1.5px solid ${cfg.color}25`;

  return (
    <div
      className={`flex items-start gap-3 ${cardPadding} ${compact ? '' : 'bg-white rounded-xl transition-all duration-150 hover:shadow-sm'} ${onCardClick ? 'cursor-pointer' : ''}`}
      style={compact ? {} : { border: cardBorder }}
      onClick={onCardClick ? () => onCardClick(tx) : undefined}
    >
      {/* Ícono */}
      <div
        className={`${iconSize} flex items-center justify-center shrink-0`}
        style={{ background: `${cfg.color}15`, color: cfg.color }}
      >
        {cfg.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className={`${labelSize} font-bold`} style={{ color: cfg.color }}>{cfg.label}</span>
          <span className={`text-xs ${dateColor} shrink-0`}>{tx.date}</span>
        </div>

        <div className={`flex items-center gap-1 ${gap}`}>
          <svg className={`${svgSize} text-gray-400 shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          {onUserClick ? (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onUserClick(tx.user); }}
              className={`${userSize} font-semibold bg-transparent border-none cursor-pointer p-0 transition-colors duration-150 hover:underline truncate`}
              style={{ color: BLUE }}
            >
              {tx.user}
            </button>
          ) : (
            <p className={`${userSize} font-semibold text-gray-700 truncate`}>{tx.user}</p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <svg className={`${svgSize} text-gray-400 shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          <p className="text-xs text-gray-400 truncate">{stickersLabel(tx.stickers)}</p>
        </div>
      </div>
    </div>
  );
}
