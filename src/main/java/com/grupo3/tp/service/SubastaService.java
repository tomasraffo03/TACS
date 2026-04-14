package com.grupo3.tp.service;

import com.grupo3.tp.models.Subasta;
import com.grupo3.tp.repository.SubastaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubastaService {

    private final SubastaRepository repository;

    public SubastaService(SubastaRepository repository) {
        this.repository = repository;
    }

    public Subasta crear(Subasta subasta) {
        return repository.save(subasta);
    }

    public Optional<Subasta> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<Subasta> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<Subasta> actualizar(String id, Subasta subasta) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        subasta.setId(id);
        return Optional.of(repository.save(subasta));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
