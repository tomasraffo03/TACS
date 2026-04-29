const BLUE  = '#03BAE9';
const RED   = '#D82D31';
const GREEN = '#05B15A';

export type TxType = 'intercambio' | 'subasta' | 'subasta-mia' | 'oferta';

export interface TxDetailIntercambio {
  type: 'intercambio';
  given: string[];      // figuritas que yo di
  received: string[];   // figuritas que recibí
}

export interface TxDetailSubasta {
  type: 'subasta';
  myOffer: string[];    // lo que yo ofrecí
  received: string;     // figurita que recibí (la subastada)
}

export interface TxDetailSubastaMia {
  type: 'subasta-mia';
  mySticker: string;    // figurita que yo puse en subasta
  winnerOffer: string[]; // lo que ofreció el ganador
}

export interface TxDetailOferta {
  type: 'oferta';
  given: string[];
  received: string[];
}

export type TxDetail = TxDetailIntercambio | TxDetailSubasta | TxDetailSubastaMia | TxDetailOferta;

export interface Transaction {
  id: number;
  type: TxType;
  user: string;
  date: string;
  isoDate: string;
  stickers: string[]; // resumen para la card
  detail: TxDetail;
}

const MAX_STICKERS_VISIBLE = 2;

export function stickersLabel(stickers: string[]): string {
  if (stickers.length <= MAX_STICKERS_VISIBLE) return stickers.join(', ');
  return stickers.slice(0, MAX_STICKERS_VISIBLE).join(', ') + ` y ${stickers.length - MAX_STICKERS_VISIBLE} más...`;
}

export const TX_CONFIG: Record<TxType, { label: string; color: string; icon: React.ReactNode }> = {
  intercambio: {
    label: 'Intercambio',
    color: BLUE,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
      </svg>
    ),
  },
  subasta: {
    label: 'Subasta (participé)',
    color: RED,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" />
      </svg>
    ),
  },
  'subasta-mia': {
    label: 'Mi subasta',
    color: '#F59E0B',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  oferta: {
    label: 'Oferta aceptada',
    color: GREEN,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1, type: 'subasta', user: 'carlitos99', date: '23 abr 2026', isoDate: '2026-04-23',
    stickers: ['Messi #10'],
    detail: { type: 'subasta', myOffer: ['Mbappé #7', 'Pedri #8'], received: 'Messi #10' },
  },
  {
    id: 2, type: 'intercambio', user: 'lauti_fútbol', date: '21 abr 2026', isoDate: '2026-04-21',
    stickers: ['Mbappé #7', 'Neymar #11', 'Griezmann #6'],
    detail: { type: 'intercambio', given: ['Mbappé #7', 'Griezmann #6'], received: ['Neymar #11', 'Bellingham #5'] },
  },
  {
    id: 3, type: 'oferta', user: 'manu_col', date: '19 abr 2026', isoDate: '2026-04-19',
    stickers: ['Ronaldo #7'],
    detail: { type: 'oferta', given: ['Haaland #9'], received: ['Ronaldo #7'] },
  },
  {
    id: 4, type: 'intercambio', user: 'sofi_fig', date: '17 abr 2026', isoDate: '2026-04-17',
    stickers: ['Haaland #9', 'Kane #9'],
    detail: { type: 'intercambio', given: ['Kane #9'], received: ['Haaland #9'] },
  },
  {
    id: 5, type: 'subasta-mia', user: 'pepe_crack', date: '14 abr 2026', isoDate: '2026-04-14',
    stickers: ['Vinicius #20'],
    detail: { type: 'subasta-mia', mySticker: 'Vinicius #20', winnerOffer: ['De Bruyne #17', 'Salah #11'] },
  },
  {
    id: 6, type: 'oferta', user: 'nico_world', date: '10 abr 2026', isoDate: '2026-04-10',
    stickers: ['De Bruyne #17', 'Salah #11', 'Benzema #9', 'Modric #10'],
    detail: { type: 'oferta', given: ['Benzema #9', 'Modric #10'], received: ['De Bruyne #17', 'Salah #11'] },
  },
  {
    id: 7, type: 'intercambio', user: 'vale_sticker', date: '07 abr 2026', isoDate: '2026-04-07',
    stickers: ['Pedri #8', 'Bellingham #5'],
    detail: { type: 'intercambio', given: ['Pedri #8'], received: ['Bellingham #5'] },
  },
  {
    id: 8, type: 'subasta-mia', user: 'juanma_f', date: '03 abr 2026', isoDate: '2026-04-03',
    stickers: ['Lewandowski #9'],
    detail: { type: 'subasta-mia', mySticker: 'Lewandowski #9', winnerOffer: ['Messi #10', 'Neymar #11', 'Mbappé #7'] },
  },
];
