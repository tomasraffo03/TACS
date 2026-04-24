import { useState } from 'react';
import type { Auction } from '../../types/auction';
import AuctionCard from '../../components/auctions/AuctionCard';
import AuctionDetailModal from '../../components/auctions/AuctionDetailModal';
import { MY_MOCK_AUCTIONS, MOCK_MY_STICKERS } from '../../data/mockAuctions';

const STATUS_LABELS: Record<string, string> = {
  active:   'Activa',
  finished: 'Finalizada',
  won:      'Ganada',
  lost:     'Perdida',
};

const STATUS_CLASSES: Record<string, string> = {
  active:   'bg-primary/15 text-primary',
  finished: 'bg-surface2 text-muted',
  won:      'bg-primary/15 text-primary',
  lost:     'bg-secondary/15 text-secondary',
};

export default function SubastasMiasPage() {
  const [selected, setSelected] = useState<Auction | null>(null);

  return (
    <div className="page-enter flex flex-col gap-6">
      {MY_MOCK_AUCTIONS.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-muted">
              <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" />
            </svg>
          </div>
          <p className="text-sm font-medium text-text">Todavía no creaste subastas</p>
          <p className="text-xs text-muted">Publicá una subasta desde la pestaña "Nueva".</p>
        </div>
      ) : (
        <>
          {/* Summary pills */}
          <div className="flex gap-2 flex-wrap -mt-2">
            {Object.entries(STATUS_LABELS).map(([status, label]) => {
              const count = MY_MOCK_AUCTIONS.filter((a) => a.status === status).length;
              if (count === 0) return null;
              return (
                <span
                  key={status}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_CLASSES[status]}`}
                >
                  {label} · {count}
                </span>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {MY_MOCK_AUCTIONS.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onViewDetail={setSelected}
              />
            ))}
          </div>
        </>
      )}

      {selected && (
        <AuctionDetailModal
          auction={selected}
          myStickers={MOCK_MY_STICKERS}
          onClose={() => setSelected(null)}
          onBid={() => {}}  // owner can't bid on own auctions; BidForm hidden for owners
        />
      )}
    </div>
  );
}
