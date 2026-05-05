import { apiFetch } from './api';

export interface PlatformStats {
  totalUsers: number;
  totalAuctions: number;
  activeAuctions: number;
  finishedAuctions: number;
  totalBids: number;
  auctionsWithBids: number;
  topBidders: { username: string; bids: number }[];
  topOwners: { username: string; auctions: number }[];
  recentActivity: RecentActivityItem[];
}

export interface RecentActivityItem {
  id: string;
  type: 'auction_created' | 'bid_placed' | 'auction_finished';
  description: string;
  timestamp: string;
}

// ── Service ───────────────────────────────────────────────────────────────────

export const adminService = {
  async getStats(): Promise<PlatformStats> {
    return apiFetch<PlatformStats>('/admin/stats');
  },
};
