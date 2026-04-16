package com.grupo3.tp.controller;

import com.grupo3.tp.models.Subasta;
import com.grupo3.tp.service.SubastaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subastas")
public class SubastaController {

    private final SubastaService service;

    public SubastaController(SubastaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Subasta>> getAll() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subasta> getById(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Subasta> create(@RequestBody Subasta subasta) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(subasta));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subasta> update(@PathVariable String id, @RequestBody Subasta subasta) {
        return service.actualizar(id, subasta)
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
