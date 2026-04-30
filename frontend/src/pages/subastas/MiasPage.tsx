import { useState, useEffect } from 'react';
import type { Auction } from '../../types/auction';
import AuctionCard from './components/AuctionCard';
import AuctionDetailModal from './components/AuctionDetailModal';
import { MOCK_MY_STICKERS } from '../../data/mockAuctions';
import { auctionService } from '../../services/auctionService';
import { useAuth } from '../../auth/useAuth';
import { PageLoading, PageError } from './ActivasPage';

const RED = '#D82D31';

const STATUS_LABELS: Record<string, string> = {
  active: 'Activa',
  finished: 'Finalizada',
  won: 'Ganada',
  lost: 'Perdida',
};

const STATUS_COLOR: Record<string, string> = {
  active: RED,
  finished: '#9ca3af',
  won: '#05B15A',
  lost: RED,
};

export default function SubastasMiasPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Auction | null>(null);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    auctionService.getByUsuario(user.id)
      .then(setAuctions)
      .catch(() => setError('No se pudieron cargar tus subastas.'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) return <PageLoading label="Cargando tus subastas…" />;
  if (error) return <PageError message={error} />;

  return (
    <div className="page-enter flex flex-col gap-6">
      {/* Encabezado de sección */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: RED }} />
        <h2 className="text-base font-bold text-gray-900">Mis subastas</h2>
        <span
          className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: `${RED}15`, color: RED }}
        >
          {auctions.length}
        </span>
      </div>

      {auctions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: `${RED}12`, border: `1.5px solid ${RED}30` }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.8" className="w-6 h-6">
              <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-800">Todavía no creaste subastas</p>
          <p className="text-xs text-gray-400">Publicá una subasta desde la pestaña "+ Nueva".</p>
        </div>
      ) : (
        <>
          {/* Pills de estado */}
          <div className="flex gap-2 flex-wrap -mt-2">
            {Object.entries(STATUS_LABELS).map(([status, label]) => {
              const count = auctions.filter(a => a.status === status).length;
              if (count === 0) return null;
              const color = STATUS_COLOR[status];
              return (
                <span
                  key={status}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${color}15`, color }}
                >
                  {label} · {count}
                </span>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {auctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} onViewDetail={setSelected} />
            ))}
          </div>
        </>
      )}

      {selected && (
        <AuctionDetailModal
          auction={selected}
          myStickers={MOCK_MY_STICKERS}
          onClose={() => setSelected(null)}
          onBid={() => { }}
        />
      )}
    </div>
  );
}
