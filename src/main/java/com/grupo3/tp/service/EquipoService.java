package com.grupo3.tp.service;

import com.grupo3.tp.models.Equipo;
import com.grupo3.tp.repository.EquipoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipoService {

    private final EquipoRepository repository;

    public EquipoService(EquipoRepository repository) {
        this.repository = repository;
    }

    public Equipo crear(Equipo equipo) {
        return repository.save(equipo);
    }

    public Optional<Equipo> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<Equipo> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Equipo> actualizar(String id, Equipo equipo) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        equipo.setId(id);
        return Optional.of(repository.save(equipo));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
