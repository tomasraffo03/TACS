package com.grupo3.tp.service;

import com.grupo3.tp.models.CategoriaFigurita;
import com.grupo3.tp.repository.CategoriaFiguritaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaFiguritaService {

    private final CategoriaFiguritaRepository repository;

    public CategoriaFiguritaService(CategoriaFiguritaRepository repository) {
        this.repository = repository;
    }

    public CategoriaFigurita crear(CategoriaFigurita categoriaFigurita) {
        return repository.save(categoriaFigurita);
    }

    public Optional<CategoriaFigurita> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<CategoriaFigurita> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<CategoriaFigurita> actualizar(String id, CategoriaFigurita categoriaFigurita) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        categoriaFigurita.setId(id);
        return Optional.of(repository.save(categoriaFigurita));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
