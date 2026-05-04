package com.grupo3.tp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Figurita {
    private String id;
    private FiguritaBase figuritaBase;
    private Usuario owner;
}
