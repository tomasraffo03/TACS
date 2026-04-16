package com.grupo3.tp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FiguritaBase {
    private String id;
    private Seleccion seleccion;
    private Equipo equipo;
    private CategoriaFigurita categoria;
    private Jugador jugador;
}
