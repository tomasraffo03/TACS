import { useState, useEffect } from 'react';
import type { Auction } from '../../types/auction';
import AuctionCard from './components/AuctionCard';
import AuctionDetailModal from './components/AuctionDetailModal';
import { MOCK_MY_STICKERS } from '../../data/mockAuctions';
import { auctionService } from '../../services/auctionService';
import { useAuth } from '../../auth/useAuth';

const RED = '#D82D31';
const BLUE = '#03BAE9';

export default function SubastasActivasPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Auction | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    auctionService.getAll(user.id)
      .then(all => setAuctions(all.filter(a => a.status === 'active')))
      .catch(() => setError('No se pudieron cargar las subastas.'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleBid = async (auctionId: string, stickerIds: string[]) => {
    if (!user) return;
    setSubmitting(true);
    try {
      const stickers = MOCK_MY_STICKERS.filter(s => stickerIds.includes(s.id));
      await auctionService.placeBid(auctionId, { stickers, userId: user.id, username: user.username });
      const updated = await auctionService.getAll(user.id);
      setAuctions(updated.filter(a => a.status === 'active'));
      setSelected(null);
    } catch {
      setError('Error al enviar la oferta.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoading label="Cargando subastas…" />;
  if (error) return <PageError message={error} />;

  return (
    <div className="page-enter flex flex-col gap-6">
      {/* Encabezado de sección */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: RED }} />
        <h2 className="text-base font-bold text-gray-900">Subastas activas</h2>
        <span
          className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: `${RED}15`, color: RED }}
        >
          {auctions.length}
        </span>
      </div>

      {auctions.length === 0 ? (
        <EmptyState
          icon={
            <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          }
          title="No hay subastas activas"
          subtitle="Volvé más tarde o creá una nueva subasta."
          accentColor={BLUE}
        />
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

// ── Shared helpers ─────────────────────────────────────────────────────────────
function EmptyState({
  icon, title, subtitle, accentColor,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: `${accentColor}12`, border: `1.5px solid ${accentColor}30` }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.8" className="w-6 h-6">
          {icon}
        </svg>
      </div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-400 max-w-xs">{subtitle}</p>
    </div>
  );
}

export function PageLoading({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-20 gap-2 text-gray-400 text-sm">
      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
      {label}
    </div>
  );
}

export function PageError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-2 text-center">
      <p className="text-sm font-semibold" style={{ color: '#D82D31' }}>{message}</p>
      <p className="text-xs text-gray-400">Verificá que el servidor esté corriendo en localhost:8080.</p>
    </div>
  );
}
