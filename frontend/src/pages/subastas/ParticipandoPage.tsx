import { useState, useEffect } from 'react';
import type { Auction } from '../../types/auction';
import AuctionCard from '../../components/auctions/AuctionCard';
import AuctionDetailModal from '../../components/auctions/AuctionDetailModal';
import { MOCK_MY_STICKERS } from '../../data/mockAuctions';
import { auctionService } from '../../services/auctionService';
import { useAuth } from '../../auth/useAuth';

function getBidStatus(auction: Auction, username: string): 'leading' | 'outbid' {
  const topBid = auction.bids.at(-1);
  return topBid?.bidderUsername === username ? 'leading' : 'outbid';
}

export default function ParticipandoPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [selected, setSelected] = useState<Auction | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    auctionService.getParticipando(user.id)
      .then(setAuctions)
      .catch(() => setError('No se pudieron cargar las subastas.'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleBid = async (auctionId: string, stickerIds: string[]) => {
    if (!user) return;
    setSubmitting(true);
    try {
      const stickers = MOCK_MY_STICKERS.filter(s => stickerIds.includes(s.id));
      await auctionService.placeBid(auctionId, {
        stickers,
        userId: user.id,
        username: user.username,
      });
      const updated = await auctionService.getParticipando(user.id);
      setAuctions(updated);
      setSelected(null);
    } catch {
      setError('Error al enviar la oferta.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error)   return <ErrorState message={error} />;

  const active   = auctions.filter(a => a.status === 'active');
  const finished = auctions.filter(a => a.status !== 'active');

  if (auctions.length === 0) {
    return (
      <div className="page-enter flex flex-col items-center justify-center gap-3 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-muted">
            <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
          </svg>
        </div>
        <p className="text-sm font-medium text-text">No estás participando en ninguna subasta</p>
        <p className="text-xs text-muted max-w-xs">Hacé una oferta en una subasta activa para verla acá.</p>
      </div>
    );
  }

  return (
    <div className="page-enter flex flex-col gap-8">
      {active.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-text">En curso</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary">
              {active.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {active.map(auction => (
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

      {finished.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-text">Finalizadas</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-surface2 text-muted border border-border">
              {finished.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {finished.map(auction => (
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

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20 gap-2 text-muted text-sm">
      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
      Cargando subastas…
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-2 text-center">
      <p className="text-sm text-secondary font-medium">{message}</p>
      <p className="text-xs text-muted">Verificá que el servidor esté corriendo en localhost:8080.</p>
    </div>
  );
}
