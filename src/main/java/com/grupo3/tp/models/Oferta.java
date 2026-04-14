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
public class Oferta {
    private String id;
    private List<Figurita> figuritas;
    private Usuario usuario;
    private Estado estado;
}
