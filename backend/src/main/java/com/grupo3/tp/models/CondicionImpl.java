package com.grupo3.tp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CondicionImpl implements Condicion {
    private String id;
    private String nombre;
    private String descripcion;
    private String tipo;
    private String valor;

    @Override
    public Boolean cumpleCondicion(Oferta oferta) {
        return true;
    }
}
