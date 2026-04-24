import { useState } from 'react';
import type { Auction } from '../../types/auction';
import AuctionCard from '../../components/auctions/AuctionCard';
import AuctionDetailModal from '../../components/auctions/AuctionDetailModal';
import { MOCK_AUCTIONS, MOCK_MY_STICKERS } from '../../data/mockAuctions';

// TODO: reemplazar con fetch real + scroll infinito
const ACTIVE_AUCTIONS = MOCK_AUCTIONS.filter((a) => a.status === 'active');

export default function SubastasActivasPage() {
  const [selected, setSelected] = useState<Auction | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleBid = async (auctionId: string, stickerIds: string[]) => {
    setSubmitting(true);
    // TODO: llamar a la API real
    console.log('Bid on', auctionId, 'with stickers', stickerIds);
    await new Promise((r) => setTimeout(r, 800)); // mock delay
    setSubmitting(false);
    setSelected(null);
  };

  return (
    <div className="page-enter flex flex-col gap-6">
      {/* Count */}
      <p className="text-xs text-muted -mt-2">
        {ACTIVE_AUCTIONS.length} subasta{ACTIVE_AUCTIONS.length !== 1 ? 's' : ''} activa{ACTIVE_AUCTIONS.length !== 1 ? 's' : ''}
      </p>

      {ACTIVE_AUCTIONS.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-muted">
              <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" />
            </svg>
          </div>
          <p className="text-sm font-medium text-text">No hay subastas activas</p>
          <p className="text-xs text-muted">Volvé más tarde o creá una nueva subasta.</p>
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ACTIVE_AUCTIONS.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onViewDetail={setSelected}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <AuctionDetailModal
          auction={selected}
          myStickers={MOCK_MY_STICKERS}
          onClose={() => setSelected(null)}
          onBid={handleBid}
          isSubmitting={submitting}
        />
      )}
    </div>
  );
}
