import { useState, useEffect } from 'react';
import type { Auction } from '../../types/auction';
import AuctionCard from '../../components/auctions/AuctionCard';
import AuctionDetailModal from '../../components/auctions/AuctionDetailModal';
import { MOCK_MY_STICKERS } from '../../data/mockAuctions';
import { auctionService } from '../../services/auctionService';
import { useAuth } from '../../auth/useAuth';

export default function SubastasActivasPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Auction | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    auctionService.getAll(user?.id)
      .then(all => setAuctions(all.filter(a => a.status === 'active')))
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
      // Refrescar la subasta seleccionada
      const updated = await auctionService.getAll(user.id);
      setAuctions(updated.filter(a => a.status === 'active'));
      setSelected(null);
    } catch {
      setError('Error al enviar la oferta.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="page-enter flex flex-col gap-6">
      <p className="text-xs text-muted -mt-2">
        {auctions.length} subasta{auctions.length !== 1 ? 's' : ''} activa{auctions.length !== 1 ? 's' : ''}
      </p>

      {auctions.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {auctions.map(auction => (
            <AuctionCard key={auction.id} auction={auction} onViewDetail={setSelected} />
          ))}
        </div>
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
