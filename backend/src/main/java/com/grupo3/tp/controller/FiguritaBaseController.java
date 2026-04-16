package com.grupo3.tp.controller;

import com.grupo3.tp.models.FiguritaBase;
import com.grupo3.tp.service.FiguritaBaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/figuritas-base")
public class FiguritaBaseController {

    private final FiguritaBaseService service;

    public FiguritaBaseController(FiguritaBaseService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<FiguritaBase>> getAll() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FiguritaBase> getById(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FiguritaBase> create(@RequestBody FiguritaBase figuritaBase) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(figuritaBase));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FiguritaBase> update(@PathVariable String id, @RequestBody FiguritaBase figuritaBase) {
        return service.actualizar(id, figuritaBase)
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
