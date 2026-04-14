package com.grupo3.tp.controller;

import com.grupo3.tp.models.Seleccion;
import com.grupo3.tp.service.SeleccionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/selecciones")
public class SeleccionController {

    private final SeleccionService service;

    public SeleccionController(SeleccionService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Seleccion>> getAll() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seleccion> getById(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Seleccion> create(@RequestBody Seleccion seleccion) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(seleccion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seleccion> update(@PathVariable String id, @RequestBody Seleccion seleccion) {
        return service.actualizar(id, seleccion)
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
