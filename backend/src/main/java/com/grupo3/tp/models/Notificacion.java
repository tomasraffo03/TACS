package com.grupo3.tp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notificacion {
    private String id;
    private Usuario usuario;           // Who receives it
    private String tipo;               // "propuesta", "figurita-faltante", "subasta"
    private String titulo;
    private String mensaje;
    private Boolean leida;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime fecha;
    private String enlace;             // "/propuestas/recibidas", etc
}



////// REMEMBER TO PUT THIS IN WHICHEVER BACKEND THAT MUST TRIGGER A NOTIFICATION
/*
Notificacion notif = Notificacion.builder()
        .usuario(figuritaOwner)  // Who receives it
        .tipo(SSSSS)
        .titulo(SSSS)
        .mensaje(SSSSS)
        .enlace(FRONT END LINK)
        .leida(false)
        .fecha(LocalDateTime.now())
        .build();

    notificacionService.crear(notif);  // Save notificati*/
