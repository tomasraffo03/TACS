package com.grupo3.tp.service;

import com.grupo3.tp.models.Intercambio;
import com.grupo3.tp.repository.IntercambioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IntercambioService {

    private final IntercambioRepository repository;

    public IntercambioService(IntercambioRepository repository) {
        this.repository = repository;
    }

    public Intercambio crear(Intercambio intercambio) {
        return repository.save(intercambio);
    }

    public Optional<Intercambio> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<Intercambio> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Intercambio> actualizar(String id, Intercambio intercambio) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        intercambio.setId(id);
        return Optional.of(repository.save(intercambio));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
