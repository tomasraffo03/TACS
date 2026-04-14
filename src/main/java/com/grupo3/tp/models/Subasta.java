package com.grupo3.tp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subasta {
    private String id;
    private Usuario usuario;
    private List<Oferta> ofertas;
    private Figurita figurita;
    private Integer duracion;
    private List<CondicionImpl> condiciones;
    private EstadoSubasta estado;
    private LocalDateTime horaInicio;
    private LocalDateTime horaFin;
}
