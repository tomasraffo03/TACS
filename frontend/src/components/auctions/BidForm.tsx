import { useState } from 'react';
import type { Sticker, AuctionCondition } from '../../types/auction';
import { conditionLabel } from './ConditionsBuilder';

interface BidFormProps {
  myStickers: Sticker[];
  conditions: AuctionCondition[];
  onBid: (selectedIds: string[]) => void;
  isSubmitting?: boolean;
}

// ── Valida si la selección cumple todas las condiciones ───────────────────────
function validateBid(selected: string[], stickers: Sticker[], conditions: AuctionCondition[]): string | null {
  const selectedStickers = stickers.filter((s) => selected.includes(s.id));

  for (const c of conditions) {
    if (c.type === 'min_stickers' && selectedStickers.length < c.value) {
      return `Debés seleccionar al menos ${c.value} figurita${c.value !== 1 ? 's' : ''}`;
    }
    if (c.type === 'country') {
      const invalid = selectedStickers.filter((s) => s.country !== c.value);
      if (invalid.length > 0) {
        return `Todas las figuritas deben ser de ${c.value}`;
      }
    }
    if (c.type === 'specific_sticker') {
      const hasIt = selectedStickers.some((s) => s.number === c.value);
      if (!hasIt) {
        return `La oferta debe incluir la figurita #${c.value}`;
      }
    }
  }
  return null; // válida
}

export default function BidForm({ myStickers, conditions, onBid, isSubmitting = false }: BidFormProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const validationError = selected.length > 0 ? validateBid(selected, myStickers, conditions) : null;
  const canSubmit = selected.length > 0 && validationError === null && !isSubmitting;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onBid(selected);
  };

  if (myStickers.length === 0) {
    return <p className="text-xs text-muted text-center py-3">No tenés figuritas disponibles para ofertar.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Condiciones activas — aviso */}
      {conditions.length > 0 && (
        <div className="bg-surface2 border border-border rounded-lg px-3 py-2 flex flex-col gap-1">
          <p className="text-[0.65rem] text-muted uppercase tracking-wider">Condiciones del dueño</p>
          <ul className="flex flex-col gap-0.5">
            {conditions.map((c, i) => (
              <li key={i} className="text-xs text-text flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                {conditionLabel(c)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-muted">Seleccioná una o más figuritas para ofertar:</p>

      {/* Multi-selector */}
      <div className="max-h-44 overflow-y-auto flex flex-col gap-1.5 pr-1">
        {myStickers.map((sticker) => {
          const checked = selected.includes(sticker.id);
          // Highlight figurita requerida específica
          const isRequired = conditions.some(
            (c) => c.type === 'specific_sticker' && c.value === sticker.number
          );
          return (
            <label
              key={sticker.id}
              className={
                'flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-150 ' +
                (checked
                  ? 'border-primary/60 bg-primary/10 text-text'
                  : isRequired
                  ? 'border-primary/30 bg-primary/5 text-muted hover:text-text'
                  : 'border-border bg-surface2 text-muted hover:text-text')
              }
            >
              <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(sticker.id)} />
              <span className={
                'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ' +
                (checked ? 'bg-primary border-primary' : 'border-border bg-surface')
              }>
                {checked && (
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              <span className="text-xs font-mono font-bold text-primary shrink-0">#{sticker.number}</span>
              <span className="text-xs truncate">{sticker.playerName}</span>
              <span className="text-[0.65rem] text-muted ml-auto shrink-0">{sticker.country}</span>
              {isRequired && (
                <span className="text-[0.6rem] font-bold text-primary shrink-0">requerida</span>
              )}
            </label>
          );
        })}
      </div>

      {/* Error de validación */}
      {validationError && (
        <p className="text-xs text-secondary flex items-center gap-1.5">
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5v3M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {validationError}
        </p>
      )}

      {selected.length > 0 && !validationError && (
        <p className="text-[0.7rem] text-primary">
          {selected.length} figurita{selected.length !== 1 ? 's' : ''} seleccionada{selected.length !== 1 ? 's' : ''} ✓
        </p>
      )}

      <button
        type="submit" disabled={!canSubmit}
        className="bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Ofertando…' : 'Confirmar oferta'}
      </button>
    </form>
  );
}
