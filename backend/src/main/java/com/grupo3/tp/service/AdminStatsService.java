package com.grupo3.tp.service;

import com.grupo3.tp.dtos.PlatformStatsDTO;
import com.grupo3.tp.dtos.PlatformStatsDTO.BidderStatDTO;
import com.grupo3.tp.dtos.PlatformStatsDTO.OwnerStatDTO;
import com.grupo3.tp.dtos.PlatformStatsDTO.RecentActivityDTO;
import com.grupo3.tp.models.EstadoSubasta;
import com.grupo3.tp.models.Oferta;
import com.grupo3.tp.models.Subasta;
import com.grupo3.tp.repository.SubastaRepository;
import com.grupo3.tp.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminStatsService {

    private final SubastaRepository subastaRepository;
    private final UsuarioRepository usuarioRepository;

    public AdminStatsService(SubastaRepository subastaRepository, UsuarioRepository usuarioRepository) {
        this.subastaRepository = subastaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public PlatformStatsDTO getStats() {
        List<Subasta> subastas = subastaRepository.findAll();
        int totalUsers     = usuarioRepository.findAll().size();
        int totalAuctions  = subastas.size();

        int activeAuctions = (int) subastas.stream()
                .filter(s -> s.getEstado() == EstadoSubasta.EN_CURSO
                          || s.getEstado() == EstadoSubasta.PENDIENTE)
                .count();

        int finishedAuctions = (int) subastas.stream()
                .filter(s -> s.getEstado() == EstadoSubasta.FINALIZADA)
                .count();

        List<Oferta> allBids = subastas.stream()
                .flatMap(s -> s.getOfertas() == null ? java.util.stream.Stream.empty() : s.getOfertas().stream())
                .toList();

        int totalBids       = allBids.size();
        int auctionsWithBids = (int) subastas.stream()
                .filter(s -> s.getOfertas() != null && !s.getOfertas().isEmpty())
                .count();

        // Top bidders
        Map<String, Integer> bidCountByUser = new HashMap<>();
        for (Oferta o : allBids) {
            String name = o.getUsuario() != null ? o.getUsuario().getUsername() : "Desconocido";
            if (name == null) name = "Desconocido";
            bidCountByUser.merge(name, 1, Integer::sum);
        }
        List<BidderStatDTO> topBidders = bidCountByUser.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(5)
                .map(e -> BidderStatDTO.builder().username(e.getKey()).bids(e.getValue()).build())
                .toList();

        // Top owners
        Map<String, Integer> auctionCountByUser = new HashMap<>();
        for (Subasta s : subastas) {
            String name = s.getUsuario() != null ? s.getUsuario().getUsername() : "Desconocido";
            if (name == null) name = "Desconocido";
            auctionCountByUser.merge(name, 1, Integer::sum);
        }
        List<OwnerStatDTO> topOwners = auctionCountByUser.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(5)
                .map(e -> OwnerStatDTO.builder().username(e.getKey()).auctions(e.getValue()).build())
                .toList();

        // Recent activity
        List<RecentActivityDTO> recentActivity = new ArrayList<>();
        for (Subasta s : subastas) {
            String sticker = stickerLabel(s);
            String owner   = s.getUsuario() != null && s.getUsuario().getUsername() != null
                           ? s.getUsuario().getUsername() : "Alguien";
            String horaInicio = formatTime(s.getHoraInicio());

            recentActivity.add(RecentActivityDTO.builder()
                    .id("auction-" + s.getId())
                    .type("auction_created")
                    .description(owner + " creó una subasta de " + sticker)
                    .timestamp(horaInicio)
                    .build());

            if (s.getEstado() == EstadoSubasta.FINALIZADA) {
                String horaFin = s.getHoraFin() != null ? formatTime(s.getHoraFin()) : horaInicio;
                recentActivity.add(RecentActivityDTO.builder()
                        .id("finished-" + s.getId())
                        .type("auction_finished")
                        .description("Subasta de " + sticker + " finalizada")
                        .timestamp(horaFin)
                        .build());
            }

            if (s.getOfertas() != null) {
                for (Oferta o : s.getOfertas()) {
                    String bidder = o.getUsuario() != null && o.getUsuario().getUsername() != null
                                  ? o.getUsuario().getUsername() : "Alguien";
                    String ts = o.getFechaOferta() != null ? formatTime(o.getFechaOferta()) : horaInicio;
                    recentActivity.add(RecentActivityDTO.builder()
                            .id("bid-" + o.getId())
                            .type("bid_placed")
                            .description(bidder + " ofertó en la subasta de " + sticker)
                            .timestamp(ts)
                            .build());
                }
            }
        }

        recentActivity.sort(Comparator.<RecentActivityDTO, String>comparing(RecentActivityDTO::getTimestamp).reversed());

        return PlatformStatsDTO.builder()
                .totalUsers(totalUsers)
                .totalAuctions(totalAuctions)
                .activeAuctions(activeAuctions)
                .finishedAuctions(finishedAuctions)
                .totalBids(totalBids)
                .auctionsWithBids(auctionsWithBids)
                .topBidders(topBidders)
                .topOwners(topOwners)
                .recentActivity(recentActivity.stream().limit(10).toList())
                .build();
    }

    private String stickerLabel(Subasta s) {
        if (s.getFigurita() == null || s.getFigurita().getFiguritaBase() == null) return "?";
        var base = s.getFigurita().getFiguritaBase();
        if (base.getJugador() != null && base.getJugador().getNombre() != null) {
            return base.getJugador().getNombre();
        }
        return "#" + (base.getNumero() != null ? base.getNumero() : "?");
    }

    private String formatTime(LocalDateTime dt) {
        return dt != null ? dt.toString() : LocalDateTime.now().toString();
    }
}
