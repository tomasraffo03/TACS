import { useState } from 'react';
import type { AuctionCondition } from '../../types/auction';
import CreateAuctionForm from '../../components/auctions/CreateAuctionForm';
import { MOCK_MY_STICKERS } from '../../data/mockAuctions';
import { auctionService } from '../../services/auctionService';
import { useAuth } from '../../auth/useAuth';

export default function SubastasNuevaPage() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const handleSubmit = async (stickerId: string, durationHours: number, conditions: AuctionCondition[]) => {
    if (!user) return;
    const sticker = MOCK_MY_STICKERS.find(s => s.id === stickerId);
    if (!sticker) return;

    setSubmitting(true);
    setError(null);
    try {
      await auctionService.create({
        sticker,
        durationHours,
        conditions,
        userId: user.id,
        username: user.username,
      });
      setSuccess(true);
    } catch {
      setError('No se pudo publicar la subasta. Verificá que el servidor esté corriendo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="page-enter flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-primary">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <p className="text-base font-semibold text-text">¡Subasta publicada!</p>
        <p className="text-xs text-muted max-w-xs">
          Ya está activa. La encontrás en "Activas" o "Mis Subastas".
        </p>
        <button
          className="mt-2 border border-border text-text rounded-lg px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-150"
          onClick={() => { setSuccess(false); setError(null); }}
        >
          Crear otra subasta
        </button>
      </div>
    );
  }

  return (
    <div className="page-enter w-full flex flex-col gap-4">
      {error && (
        <p className="text-xs text-secondary bg-secondary/10 border border-secondary/30 rounded-lg px-4 py-2">
          {error}
        </p>
      )}
      <CreateAuctionForm
        myStickers={MOCK_MY_STICKERS}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      />
    </div>
  );
}
