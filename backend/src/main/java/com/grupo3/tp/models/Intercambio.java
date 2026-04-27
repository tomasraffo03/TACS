package com.grupo3.tp.models;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime fecha;
    private SolicitudDeIntercambio solicitud;
}
