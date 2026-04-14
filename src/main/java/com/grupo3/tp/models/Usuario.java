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
public class Usuario {
    private String id;
    private String username;
    private String password;
    private String email;
    private List<Figurita> figuritas;
    private List<Subasta> subastasFavoritas;
}
