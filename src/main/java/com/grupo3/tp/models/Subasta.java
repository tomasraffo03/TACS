package com.grupo3.tp.models;

import java.time.LocalDateTime;
import java.util.List;

public class Subasta {
    private Usuario usuario;
    private List<Oferta> ofertas;
    private Figurita figurita;
    private Integer duracion;
    private List<Condicion> condiciones;
    private EstadoSubasta estado;
    private LocalDateTime horaInicio;
    private LocalDateTime horaFin;
}
