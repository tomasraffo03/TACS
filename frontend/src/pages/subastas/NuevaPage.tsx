import { useState } from 'react';
import type { AuctionCondition } from '../../types/auction';
import CreateAuctionForm from '../../components/auctions/CreateAuctionForm';
import { MOCK_MY_STICKERS } from '../../data/mockAuctions';

export default function SubastasNuevaPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);

  const handleSubmit = async (stickerId: string, durationHours: number, conditions: AuctionCondition[]) => {
    setSubmitting(true);
    console.log('Create auction:', { stickerId, durationHours, conditions });
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess(true);
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
          onClick={() => setSuccess(false)}
        >
          Crear otra subasta
        </button>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-lg">
      <CreateAuctionForm
        myStickers={MOCK_MY_STICKERS}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      />
    </div>
  );
}
