package com.grupo3.tp.controller;

import com.grupo3.tp.models.CategoriaFigurita;
import com.grupo3.tp.service.CategoriaFiguritaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias-figurita")
public class CategoriaFiguritaController {

    private final CategoriaFiguritaService service;

    public CategoriaFiguritaController(CategoriaFiguritaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaFigurita>> getAll() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaFigurita> getById(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CategoriaFigurita> create(@RequestBody CategoriaFigurita categoriaFigurita) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(categoriaFigurita));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaFigurita> update(@PathVariable String id, @RequestBody CategoriaFigurita categoriaFigurita) {
        return service.actualizar(id, categoriaFigurita)
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
