import type { Auction, Sticker } from '../types/auction';

// ── Mock stickers del usuario "demo" ─────────────────────────────────────────
export const MOCK_MY_STICKERS: Sticker[] = [
  { id: 's1', number: 42, playerName: 'L. Martínez', country: 'ARG' },
  { id: 's2', number: 78, playerName: 'R. Díaz', country: 'ARG' },
  { id: 's3', number: 115, playerName: 'K. Mbappé', country: 'FRA' },
  { id: 's4', number: 201, playerName: 'J. Bellingham', country: 'ENG' },
  { id: 's5', number: 333, playerName: 'V. Osimhen', country: 'NGA' },
];

// ── Helpers de tiempo ─────────────────────────────────────────────────────────
const now = Date.now();
const h = (hours: number) => new Date(now + hours * 3600_000).toISOString();
const p = (hours: number) => new Date(now - hours * 3600_000).toISOString();

// ── Subastas ──────────────────────────────────────────────────────────────────
export const MOCK_AUCTIONS: Auction[] = [
  {
    id: 'a1',
    ownerId: 'u2', ownerUsername: 'pedro99',
    sticker: { id: 'x1', number: 7, playerName: 'C. Ronaldo', country: 'POR' },
    bids: [
      {
        id: 'b1', bidderId: 'u3', bidderUsername: 'maria_g',
        stickers: [{ id: 's2', number: 78, playerName: 'R. Díaz', country: 'ARG' }],
        placedAt: new Date(now - 30 * 60_000).toISOString(),
      },
    ],
    endTime: h(4), status: 'active', createdAt: p(2),
    conditions: [], // sin condiciones
  },
  {
    id: 'a2',
    ownerId: 'u4', ownerUsername: 'lucas_f',
    sticker: { id: 'x2', number: 10, playerName: 'L. Messi', country: 'ARG' },
    bids: [],
    endTime: h(0.06), status: 'active', createdAt: p(1),
    // Condición: mínimo 2 figuritas
    conditions: [{ type: 'min_stickers', value: 2 }],
  },
  {
    id: 'a3',
    ownerId: 'u5', ownerUsername: 'sofia_m',
    sticker: { id: 'x3', number: 99, playerName: 'E. Haaland', country: 'NOR' },
    bids: [
      {
        id: 'b2', bidderId: 'u1', bidderUsername: 'demo',
        stickers: [
          { id: 's3', number: 115, playerName: 'K. Mbappé', country: 'FRA' },
          { id: 's4', number: 201, playerName: 'J. Bellingham', country: 'ENG' },
        ],
        placedAt: new Date(now - 10 * 60_000).toISOString(),
      },
    ],
    endTime: h(24), status: 'active', createdAt: p(3),
    // Condición: solo figuritas de ARG
    conditions: [{ type: 'country', value: 'ARG' }],
  },
  {
    id: 'a4',
    ownerId: 'u1', ownerUsername: 'demo',
    sticker: { id: 'x4', number: 55, playerName: 'T. Arnold', country: 'ENG' },
    bids: [
      {
        id: 'b3', bidderId: 'u6', bidderUsername: 'carlos_r',
        stickers: [{ id: 's5', number: 333, playerName: 'V. Osimhen', country: 'NGA' }],
        placedAt: new Date(now - 5 * 60_000).toISOString(),
      },
    ],
    endTime: h(6), status: 'active', createdAt: p(1),
    // Condición: debe incluir figurita específica #42
    conditions: [{ type: 'specific_sticker', value: 42 }],
  },
  {
    id: 'a5',
    ownerId: 'u7', ownerUsername: 'ana_v',
    sticker: { id: 'x5', number: 14, playerName: 'T. Müller', country: 'GER' },
    bids: [
      {
        id: 'b4', bidderId: 'u1', bidderUsername: 'demo',
        stickers: [{ id: 's1', number: 42, playerName: 'L. Martínez', country: 'ARG' }],
        placedAt: p(2),
      },
    ],
    endTime: p(1), status: 'won', createdAt: p(5),
    conditions: [],
  },
  {
    id: 'a6',
    ownerId: 'u8', ownerUsername: 'juan_p',
    sticker: { id: 'x6', number: 88, playerName: 'P. Dybala', country: 'ARG' },
    bids: [
      {
        id: 'b5', bidderId: 'u9', bidderUsername: 'roberto_k',
        stickers: [{ id: 'sx', number: 11, playerName: 'M. Salah', country: 'EGY' }],
        placedAt: p(3),
      },
    ],
    endTime: p(2), status: 'lost', createdAt: p(6),
    conditions: [],
  },
  {
    // Demo participó pero fue superada (para la vista "Participando")
    id: 'a7',
    ownerId: 'u10', ownerUsername: 'emma_t',
    sticker: { id: 'x7', number: 22, playerName: 'B. Fernandes', country: 'POR' },
    bids: [
      {
        id: 'b6', bidderId: 'u1', bidderUsername: 'demo',
        stickers: [{ id: 's3', number: 115, playerName: 'K. Mbappé', country: 'FRA' }],
        placedAt: p(3),
      },
      {
        id: 'b7', bidderId: 'u11', bidderUsername: 'super_bidder',
        stickers: [
          { id: 'sy', number: 55, playerName: 'T. Arnold', country: 'ENG' },
          { id: 'sz', number: 77, playerName: 'G. Jesus', country: 'BRA' },
        ],
        placedAt: p(1),
      },
    ],
    endTime: h(3), status: 'active', createdAt: p(4),
    // Condición: mínimo 1 figurita + de ARG
    conditions: [{ type: 'min_stickers', value: 1 }, { type: 'country', value: 'POR' }],
  },
];

// ── Vistas derivadas ──────────────────────────────────────────────────────────
export const MY_MOCK_AUCTIONS = MOCK_AUCTIONS.filter((a) => a.ownerUsername === 'demo');
