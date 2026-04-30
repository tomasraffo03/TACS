import type { Auction, AuctionCondition, Sticker } from '../types/auction';
import { apiFetch, mapSubasta, type BackendSubasta, type BackendOferta } from './api';

export const auctionService = {

  async getAll(currentUserId?: string): Promise<Auction[]> {
    const data = await apiFetch<BackendSubasta[]>('/subastas');
    return data.map(s => mapSubasta(s, currentUserId));
  },

  async getByUsuario(usuarioId: string): Promise<Auction[]> {
    const data = await apiFetch<BackendSubasta[]>(`/subastas/usuario/${usuarioId}`);
    return data.map(s => mapSubasta(s, usuarioId));
  },

  async getParticipando(usuarioId: string): Promise<Auction[]> {
    const data = await apiFetch<BackendSubasta[]>(`/subastas/participando/${usuarioId}`);
    return data.map(s => mapSubasta(s, usuarioId));
  },

  /** Crea una subasta. El sticker se construye a partir del objeto Sticker del frontend. */
  async create(payload: {
    sticker: Sticker;
    durationHours: number;
    conditions: AuctionCondition[];
    userId: string;
    username: string;
  }): Promise<Auction> {
    const now = new Date();
    const end = new Date(now.getTime() + payload.durationHours * 3_600_000);

    const body = {
      usuario: { id: payload.userId, username: payload.username },
      figurita: {
        figuritaBase: {
          numero: payload.sticker.number,
          jugador: { nombre: payload.sticker.playerName },
          seleccion: { nombre: payload.sticker.country },
        },
      },
      duracion: payload.durationHours,
      condiciones: payload.conditions.map(c => ({ tipo: c.type, valor: String(c.value) })),
      estado: 'EN_CURSO',
      horaInicio: now.toISOString().slice(0, 19),
      horaFin: end.toISOString().slice(0, 19),
      ofertas: [],
    };

    const data = await apiFetch<BackendSubasta>('/subastas', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return mapSubasta(data, payload.userId);
  },

  /**
   * Agrega una oferta a una subasta.
   * Estrategia: POST /api/ofertas → GET /api/subastas/{id} → PUT /api/subastas/{id}
   * (el backend no tiene endpoint dedicado para agregar ofertas a una subasta)
   */
  async placeBid(auctionId: string, payload: {
    stickers: Sticker[];
    userId: string;
    username: string;
  }): Promise<void> {
    const ofertaBody = {
      figuritas: payload.stickers.map(s => ({
        figuritaBase: {
          numero: s.number,
          jugador: { nombre: s.playerName },
          seleccion: { nombre: s.country },
        },
      })),
      usuario: { id: payload.userId, username: payload.username },
      estado: 'PENDIENTE',
      fechaOferta: new Date().toISOString().slice(0, 19),
    };

    const createdOferta = await apiFetch<BackendOferta>('/ofertas', {
      method: 'POST',
      body: JSON.stringify(ofertaBody),
    });

    const current = await apiFetch<BackendSubasta>(`/subastas/${auctionId}`);

    await apiFetch(`/subastas/${auctionId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...current,
        ofertas: [...(current.ofertas ?? []), createdOferta],
      }),
    });
  },
};
