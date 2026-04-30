import { useEffect } from 'react';
import type { Auction, Sticker } from '../../../types/auction';
import { useAuth } from '../../../auth/useAuth';
import CountdownBadge from './CountdownBadge';
import BidForm from './BidForm';
import { conditionLabel } from './ConditionsBuilder';

interface AuctionDetailModalProps {
  auction: Auction;
  myStickers: Sticker[];
  onClose: () => void;
  onBid: (auctionId: string, stickerIds: string[]) => void;
  isSubmitting?: boolean;
}

export default function AuctionDetailModal({
  auction, myStickers, onClose, onBid, isSubmitting = false,
}: AuctionDetailModalProps) {
  const { user } = useAuth();
  const isOwner = user?.username === auction.ownerUsername;
  const topBid = auction.bids.at(-1);
  const isActive = auction.status === 'active';
  const alreadyBid = auction.bids.some((b) => b.bidderUsername === user?.username);
  const canBid = isActive && !isOwner && !alreadyBid;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.15s_ease]"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border rounded-xl w-full max-w-lg mx-4 flex flex-col max-h-[90vh] animate-[slideUp_0.2s_ease] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div>
            <p className="text-[0.7rem] text-muted uppercase tracking-widest mb-0.5">
              #{auction.sticker.number} · {auction.sticker.country}
            </p>
            <h2 className="text-lg font-semibold text-text">{auction.sticker.playerName}</h2>
          </div>
          <button
            onClick={onClose} aria-label="Cerrar"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-surface2 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-4 flex flex-col gap-5">

          {/* Dueño + tiempo */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted mb-0.5">Publicada por</p>
              <p className="text-sm font-medium text-text">@{auction.ownerUsername}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[0.65rem] text-muted uppercase tracking-wider">Tiempo restante</p>
              <CountdownBadge endTime={auction.endTime} />
            </div>
          </div>

          {/* Condiciones mínimas */}
          {auction.conditions.length > 0 && (
            <div className="bg-surface2 border border-border rounded-lg px-4 py-3">
              <p className="text-[0.65rem] text-muted uppercase tracking-wider mb-2">Condiciones mínimas</p>
              <ul className="flex flex-col gap-1.5">
                {auction.conditions.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-text">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {conditionLabel(c)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mejor oferta */}
          <div className="bg-surface2 border border-border rounded-lg px-4 py-3">
            <p className="text-[0.65rem] text-muted uppercase tracking-wider mb-1.5">Mejor oferta actual</p>
            {topBid ? (
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-text">@{topBid.bidderUsername}</p>
                <p className="text-xs text-primary font-semibold">
                  {topBid.stickers.map((s) => `#${s.number} ${s.playerName}`).join(', ')}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted italic">Sin ofertas todavía</p>
            )}
          </div>

          {/* Historial */}
          {auction.bids.length > 0 && (
            <div>
              <p className="text-[0.65rem] text-muted uppercase tracking-wider mb-2">
                Historial ({auction.bids.length})
              </p>
              <ol className="flex flex-col gap-2">
                {[...auction.bids].reverse().map((bid, i) => (
                  <li key={bid.id} className={
                    'flex items-start gap-3 px-3 py-2 rounded-lg border ' +
                    (i === 0 ? 'border-primary/40 bg-primary/5' : 'border-border bg-surface2')
                  }>
                    <div className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[0.6rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i === 0 ? '★' : auction.bids.length - i}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text">@{bid.bidderUsername}</p>
                      <p className="text-[0.65rem] text-muted truncate">
                        {bid.stickers.map((s) => `#${s.number}`).join(', ')}
                      </p>
                    </div>
                    <time className="text-[0.6rem] text-muted whitespace-nowrap shrink-0 mt-0.5">
                      {new Date(bid.placedAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                    </time>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* BidForm */}
          {canBid && (
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-text mb-3">Hacer una oferta</p>
              <BidForm
                myStickers={myStickers}
                conditions={auction.conditions}
                onBid={(ids) => onBid(auction.id, ids)}
                isSubmitting={isSubmitting}
              />
            </div>
          )}

          {isOwner && isActive && (
            <p className="text-xs text-muted text-center py-2">Esta es tu subasta — no podés ofertar.</p>
          )}
          {!isOwner && isActive && alreadyBid && (
            <p className="text-xs text-muted text-center py-2">Ya ofertaste en esta subasta — solo se permite una oferta por participante.</p>
          )}
          {!isActive && (
            <p className="text-xs text-muted text-center py-2">Esta subasta ya finalizó.</p>
          )}
        </div>
      </div>
    </div>
  );
}
