import { useState } from 'react';
import type { Auction } from '../../types/auction';
import AuctionCard from '../../components/auctions/AuctionCard';
import AuctionDetailModal from '../../components/auctions/AuctionDetailModal';
import { MOCK_AUCTIONS, MOCK_MY_STICKERS } from '../../data/mockAuctions';
import { useAuth } from '../../auth/useAuth';

function getBidStatus(auction: Auction, username: string): 'leading' | 'outbid' {
  const topBid = auction.bids.at(-1);
  return topBid?.bidderUsername === username ? 'leading' : 'outbid';
}

export default function ParticipandoPage() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<Auction | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Subastas donde el usuario ofertó pero no es el dueño
  const participating = MOCK_AUCTIONS.filter(
    (a) =>
      a.ownerUsername !== user?.username &&
      a.bids.some((b) => b.bidderUsername === user?.username)
  );

  const activeParticipating  = participating.filter((a) => a.status === 'active');
  const finishedParticipating = participating.filter((a) => a.status !== 'active');

  const handleBid = async (auctionId: string, stickerIds: string[]) => {
    setSubmitting(true);
    console.log('Bid on', auctionId, 'with', stickerIds);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSelected(null);
  };

  if (participating.length === 0) {
    return (
      <div className="page-enter flex flex-col items-center justify-center gap-3 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-muted">
            <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4"/>
          </svg>
        </div>
        <p className="text-sm font-medium text-text">No estás participando en ninguna subasta</p>
        <p className="text-xs text-muted max-w-xs">
          Hacé una oferta en una subasta activa para verla acá.
        </p>
      </div>
    );
  }

  return (
    <div className="page-enter flex flex-col gap-8">
      {/* Activas */}
      {activeParticipating.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-text">En curso</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary">
              {activeParticipating.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {activeParticipating.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onViewDetail={setSelected}
                userBidStatus={getBidStatus(auction, user?.username ?? '')}
              />
            ))}
          </div>
        </section>
      )}

      {/* Finalizadas */}
      {finishedParticipating.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-text">Finalizadas</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-surface2 text-muted border border-border">
              {finishedParticipating.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {finishedParticipating.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onViewDetail={setSelected}
                userBidStatus={getBidStatus(auction, user?.username ?? '')}
              />
            ))}
          </div>
        </section>
      )}

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
