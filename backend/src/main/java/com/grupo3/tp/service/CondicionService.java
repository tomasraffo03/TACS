package com.grupo3.tp.service;

import com.grupo3.tp.models.CondicionImpl;
import com.grupo3.tp.repository.CondicionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CondicionService {

    private final CondicionRepository repository;

    public CondicionService(CondicionRepository repository) {
        this.repository = repository;
    }

    public CondicionImpl crear(CondicionImpl condicion) {
        return repository.save(condicion);
    }

    public Optional<CondicionImpl> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<CondicionImpl> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<CondicionImpl> actualizar(String id, CondicionImpl condicion) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        condicion.setId(id);
        return Optional.of(repository.save(condicion));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
