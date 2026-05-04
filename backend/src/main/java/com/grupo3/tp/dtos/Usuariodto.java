package com.grupo3.tp.dtos;

import com.grupo3.tp.models.Role;
import lombok.Data;

@Data
public class Usuariodto {
    private String username;
    private String password;
    private String email;
}
