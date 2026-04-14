package com.grupo3.tp.controller;

import com.grupo3.tp.models.Figurita;
import com.grupo3.tp.service.FiguritaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/figuritas")
public class FiguritaController {

    private final FiguritaService service;

    public FiguritaController(FiguritaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Figurita>> getAll() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Figurita> getById(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Figurita> create(@RequestBody Figurita figurita) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(figurita));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Figurita> update(@PathVariable String id, @RequestBody Figurita figurita) {
        return service.actualizar(id, figurita)
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
