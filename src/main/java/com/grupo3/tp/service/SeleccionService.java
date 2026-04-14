package com.grupo3.tp.service;

import com.grupo3.tp.models.Seleccion;
import com.grupo3.tp.repository.SeleccionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeleccionService {

    private final SeleccionRepository repository;

    public SeleccionService(SeleccionRepository repository) {
        this.repository = repository;
    }

    public Seleccion crear(Seleccion seleccion) {
        return repository.save(seleccion);
    }

    public Optional<Seleccion> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<Seleccion> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<Seleccion> actualizar(String id, Seleccion seleccion) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        seleccion.setId(id);
        return Optional.of(repository.save(seleccion));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
