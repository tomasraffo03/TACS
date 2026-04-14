package com.grupo3.tp.controller;

import com.grupo3.tp.models.Intercambio;
import com.grupo3.tp.service.IntercambioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/intercambios")
public class IntercambioController {

    private final IntercambioService service;

    public IntercambioController(IntercambioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Intercambio>> getAll() {
        return ResponseEntity.ok(service.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Intercambio> getById(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Intercambio> create(@RequestBody Intercambio intercambio) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(intercambio));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Intercambio> update(@PathVariable String id, @RequestBody Intercambio intercambio) {
        return service.actualizar(id, intercambio)
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
