package com.grupo3.tp.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PlatformStatsDTO {

    private int totalUsers;
    private int totalAuctions;
    private int activeAuctions;
    private int finishedAuctions;
    private int totalBids;
    private int auctionsWithBids;
    private List<BidderStatDTO> topBidders;
    private List<OwnerStatDTO> topOwners;
    private List<RecentActivityDTO> recentActivity;

    @Data
    @Builder
    public static class BidderStatDTO {
        private String username;
        private int bids;
    }

    @Data
    @Builder
    public static class OwnerStatDTO {
        private String username;
        private int auctions;
    }

    @Data
    @Builder
    public static class RecentActivityDTO {
        private String id;
        private String type;
        private String description;
        private String timestamp;
    }
}
