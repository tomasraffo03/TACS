package com.grupo3.tp.controller;

import com.grupo3.tp.models.CondicionImpl;
import com.grupo3.tp.service.CondicionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/condiciones")
public class CondicionController {

    private final CondicionService service;

    public CondicionController(CondicionService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<CondicionImpl>> getAll() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CondicionImpl> getById(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CondicionImpl> create(@RequestBody CondicionImpl condicion) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(condicion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CondicionImpl> update(@PathVariable String id, @RequestBody CondicionImpl condicion) {
        return service.actualizar(id, condicion)
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
