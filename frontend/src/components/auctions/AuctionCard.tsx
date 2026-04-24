import type { Auction } from '../../types/auction';
import CountdownBadge from './CountdownBadge';
import { useAuth } from '../../auth/useAuth';

interface AuctionCardProps {
  auction: Auction;
  onViewDetail: (auction: Auction) => void;
  /** Solo para la vista "Participando": estado de la oferta del usuario */
  userBidStatus?: 'leading' | 'outbid';
}

const statusBorder: Record<string, string> = {
  active:   'border-primary/40',
  finished: 'border-border opacity-60',
  won:      'border-primary/40 bg-primary/5',
  lost:     'border-secondary/40 bg-secondary/5',
};

const bidStatusConfig = {
  leading: { label: 'Líder',    cls: 'bg-primary/15 text-primary border-primary/30' },
  outbid:  { label: 'Superada', cls: 'bg-secondary/15 text-secondary border-secondary/30' },
};

export default function AuctionCard({ auction, onViewDetail, userBidStatus }: AuctionCardProps) {
  const { user } = useAuth();
  const isOwner = user?.username === auction.ownerUsername;
  const topBid  = auction.bids.at(-1);
  const border  = statusBorder[auction.status] ?? 'border-border';

  return (
    <article
      className={`bg-surface border rounded-xl p-4 flex flex-col gap-3 transition-all duration-150 hover:border-primary/60 hover:shadow-lg cursor-pointer min-h-[200px] ${border}`}
      onClick={() => onViewDetail(auction)}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onViewDetail(auction)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[0.7rem] text-muted uppercase tracking-widest mb-0.5 truncate">
            #{auction.sticker.number} · {auction.sticker.country}
          </p>
          <h3 className="text-sm font-semibold text-text leading-tight truncate">
            {auction.sticker.playerName}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {isOwner && (
            <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
              Tuya
            </span>
          )}
          {userBidStatus && (
            <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-bold border ${bidStatusConfig[userBidStatus].cls}`}>
              {bidStatusConfig[userBidStatus].label}
            </span>
          )}
          {auction.conditions.length > 0 && (
            <span className="px-1.5 py-0.5 rounded text-[0.6rem] text-muted border border-border">
              {auction.conditions.length} cond.
            </span>
          )}
        </div>
      </div>

      {/* Sticker visual */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-16 h-20 rounded-lg bg-surface2 border border-border flex flex-col items-center justify-center gap-1 select-none">
          <span className="text-2xl font-black text-primary leading-none">{auction.sticker.number}</span>
          <span className="text-[0.6rem] text-muted uppercase tracking-wider text-center px-1 leading-tight">
            {auction.sticker.country}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[0.65rem] text-muted mb-0.5">
            {topBid ? `Oferta de @${topBid.bidderUsername}` : `Subasta de @${auction.ownerUsername}`}
          </p>
          <p className="text-xs text-text font-medium truncate">
            {topBid ? topBid.stickers.map((s) => `#${s.number}`).join(', ') : 'Sin ofertas aún'}
          </p>
        </div>
        <CountdownBadge endTime={auction.endTime} />
      </div>
    </article>
  );
}
