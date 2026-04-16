package com.grupo3.tp.controller;

import com.grupo3.tp.models.SolicitudDeIntercambio;
import com.grupo3.tp.service.SolicitudDeIntercambioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes-intercambio")
public class SolicitudDeIntercambioController {

    private final SolicitudDeIntercambioService service;

    public SolicitudDeIntercambioController(SolicitudDeIntercambioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SolicitudDeIntercambio>> getAll() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitudDeIntercambio> getById(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SolicitudDeIntercambio> create(@RequestBody SolicitudDeIntercambio solicitud) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(solicitud));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SolicitudDeIntercambio> update(@PathVariable String id, @RequestBody SolicitudDeIntercambio solicitud) {
        return service.actualizar(id, solicitud)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (service.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
