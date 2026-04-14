package com.grupo3.tp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Intercambio {
    private String id;
    private Usuario usuarioGenerador;
    private Figurita figurita;
    private Figurita figuritaIntercambiada;
    private Usuario usuarioIntercambiador;
    private LocalDateTime fecha;
    private SolicitudDeIntercambio solicitud;
}
