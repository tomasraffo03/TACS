import { useState, useEffect } from 'react';
import type { Auction } from '../../types/auction';
import AuctionCard from './components/AuctionCard';
import AuctionDetailModal from './components/AuctionDetailModal';
import { MOCK_MY_STICKERS } from '../../data/mockAuctions';
import { auctionService } from '../../services/auctionService';
import { useAuth } from '../../auth/useAuth';
import { PageLoading, PageError } from './ActivasPage';

const RED = '#D82D31';
const BLUE = '#03BAE9';

function getBidStatus(auction: Auction, username: string): 'leading' | 'outbid' {
  const topBid = auction.bids.at(-1);
  return topBid?.bidderUsername === username ? 'leading' : 'outbid';
}

export default function ParticipandoPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      await auctionService.placeBid(auctionId, { stickers, userId: user.id, username: user.username });
      const updated = await auctionService.getParticipando(user.id);
      setAuctions(updated);
      setSelected(null);
    } catch {
      setError('Error al enviar la oferta.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoading label="Cargando subastas…" />;
  if (error) return <PageError message={error} />;

  const active = auctions.filter(a => a.status === 'active');
  const finished = auctions.filter(a => a.status !== 'active');

  if (auctions.length === 0) {
    return (
      <div className="page-enter flex flex-col items-center justify-center gap-3 py-20 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: `${BLUE}12`, border: `1.5px solid ${BLUE}30` }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" className="w-6 h-6">
            <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-800">No estás participando en ninguna subasta</p>
        <p className="text-xs text-gray-400 max-w-xs">Hacé una oferta en una subasta activa para verla acá.</p>
      </div>
    );
  }

  return (
    <div className="page-enter flex flex-col gap-8">
      {active.length > 0 && (
        <section className="flex flex-col gap-4">
          {/* Encabezado estilo Dashboard */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: RED }} />
            <h2 className="text-base font-bold text-gray-900">En curso</h2>
            <span
              className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: `${RED}15`, color: RED }}
            >
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
            <span className="w-3 h-3 rounded-full bg-gray-300 shrink-0" />
            <h2 className="text-base font-bold text-gray-900">Finalizadas</h2>
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
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
