import type { Auction } from '../../../types/auction';

import { useAuth } from '../../../auth/useAuth';
import CountdownBadge from './CountdownBadge';

const RED = '#D82D31';
const BLUE = '#03BAE9';

interface AuctionCardProps {
  auction: Auction;
  onViewDetail: (auction: Auction) => void;
  /** Solo para la vista "Participando": estado de la oferta del usuario */
  userBidStatus?: 'leading' | 'outbid';
}

const statusStyle: Record<string, { border: string; bg: string }> = {
  active: { border: `${RED}30`, bg: 'white' },
  finished: { border: '#e5e7eb', bg: '#f9fafb' },
  won: { border: '#05B15A40', bg: '#05B15A08' },
  lost: { border: `${RED}30`, bg: `${RED}05` },
};

const bidStatusConfig = {
  leading: { label: 'Líder', color: '#05B15A' },
  outbid: { label: 'Superada', color: RED },
};

export default function AuctionCard({ auction, onViewDetail, userBidStatus }: AuctionCardProps) {
  const { user } = useAuth();
  const isOwner = user?.username === auction.ownerUsername;
  const topBid = auction.bids.at(-1);
  const style = statusStyle[auction.status] ?? statusStyle.active;
  const finished = auction.status !== 'active';

  return (
    <article
      className="rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
      style={{
        background: style.bg,
        border: `1.5px solid ${style.border}`,
        opacity: finished ? 0.75 : 1,
      }}
      onClick={() => onViewDetail(auction)}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onViewDetail(auction)}
    >
      {/* Header — badges */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {isOwner && (
            <span
              className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ background: `${RED}15`, color: RED }}
            >
              Mi subasta
            </span>
          )}
          {userBidStatus && (
            <span
              className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: `${bidStatusConfig[userBidStatus].color}15`,
                color: bidStatusConfig[userBidStatus].color,
              }}
            >
              {bidStatusConfig[userBidStatus].label}
            </span>
          )}
          {auction.conditions.length > 0 && (
            <span className="text-[0.6rem] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
              {auction.conditions.length} cond.
            </span>
          )}
        </div>
        <CountdownBadge endTime={auction.endTime} />
      </div>

      {/* Figurita visual */}
      <div className="flex items-center justify-center py-2">
        <div
          className="w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 select-none"
          style={{ background: `${RED}10`, border: `1.5px solid ${RED}25` }}
        >
          <span className="text-2xl font-black leading-none" style={{ color: RED }}>
            {auction.sticker.number}
          </span>
          <span className="text-[0.6rem] uppercase tracking-wider text-center px-1 leading-tight text-gray-500">
            {auction.sticker.country}
          </span>
        </div>
      </div>

      {/* Info del jugador */}
      <div>
        <p className="text-[0.68rem] text-gray-400 uppercase tracking-widest mb-0.5 truncate">
          #{auction.sticker.number} · {auction.sticker.country}
        </p>
        <h3 className="text-sm font-bold text-gray-800 leading-tight truncate">
          {auction.sticker.playerName}
        </h3>
      </div>

      {/* Footer — oferta actual */}
      <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100">
        <svg className="w-3 h-3 shrink-0" style={{ color: BLUE }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
        <p className="text-xs text-gray-500 truncate">
          {topBid
            ? <><span className="font-semibold text-gray-700">@{topBid.bidderUsername}</span> · {topBid.stickers.map(s => `#${s.number}`).join(', ')}</>
            : `@${auction.ownerUsername} · Sin ofertas`
          }
        </p>
      </div>
    </article>
  );
}
