package com.grupo3.tp.service;

import com.grupo3.tp.models.Figurita;
import com.grupo3.tp.repository.FiguritaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FiguritaService {

    private final FiguritaRepository repository;

    public FiguritaService(FiguritaRepository repository) {
        this.repository = repository;
    }

    public Figurita crear(Figurita figurita) {
        return repository.save(figurita);
    }

    public Optional<Figurita> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<Figurita> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<Figurita> actualizar(String id, Figurita figurita) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        figurita.setId(id);
        return Optional.of(repository.save(figurita));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
