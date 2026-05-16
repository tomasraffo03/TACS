package com.grupo3.tp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudDeIntercambio {

    public enum EstadoSolicitud {
        PENDIENTE,
        ACEPTADO,
        RECHAZADO
    }

    private String id;
    private Usuario usuario;
    private Figurita figurita;
    private Integer cantidadDisponible;
    private List<Figurita> figuritasOfrecidas; //added this for intercambio directo work. MYH
    private EstadoSolicitud estado;
    //private List<Oferta> ofertas;
}
