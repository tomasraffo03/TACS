package com.grupo3.tp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calificacion {
    private String id;
    private Usuario usuarioCalificador;
    private Usuario usuarioCalificado;
    private Intercambio intercambio;
    private Integer calificacion;
}
