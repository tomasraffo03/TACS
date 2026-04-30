// ── Sticker ───────────────────────────────────────────────────────────────────
export interface Sticker {
  id: string;
  number: number;
  playerName: string;
  country: string;
  imageUrl?: string;
}

// ── Bid ───────────────────────────────────────────────────────────────────────
export interface Bid {
  id: string;
  bidderId: string;
  bidderUsername: string;
  stickers: Sticker[];
  placedAt: string; // ISO 8601
}

// ── Auction Status ────────────────────────────────────────────────────────────
export type AuctionStatus = 'active' | 'finished' | 'won' | 'lost';

// ── Conditions (extensible discriminated union) ───────────────────────────────
// Para agregar una nueva condición:
//   1. Crear interfaz con un `type` string literal único
//   2. Agregarla a la union `AuctionCondition`
//   3. Manejarla en ConditionsBuilder.tsx y BidForm.tsx

export interface MinStickersCondition {
  type: 'min_stickers';
  /** Mínimo de figuritas que debe contener la oferta */
  value: number;
}

export interface CountryCondition {
  type: 'country';
  /** Todas las figuritas deben ser de esta selección (ej. 'ARG') */
  value: string;
}

export interface SpecificStickerCondition {
  type: 'specific_sticker';
  /** La oferta debe incluir la figurita con este número */
  value: number;
}

export type AuctionCondition =
  | MinStickersCondition
  | CountryCondition
  | SpecificStickerCondition;

// ── Auction ───────────────────────────────────────────────────────────────────
export interface Auction {
  id: string;
  ownerId: string;
  ownerUsername: string;
  sticker: Sticker;
  bids: Bid[];
  endTime: string; // ISO 8601
  status: AuctionStatus;
  createdAt: string; // ISO 8601
  /** Condiciones que debe cumplir la oferta. Array vacío = acepta cualquier oferta. */
  conditions: AuctionCondition[];
}
