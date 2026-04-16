package com.grupo3.tp.service;

import com.grupo3.tp.models.Calificacion;
import com.grupo3.tp.repository.CalificacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalificacionService {

    private final CalificacionRepository repository;

    public CalificacionService(CalificacionRepository repository) {
        this.repository = repository;
    }

    public Calificacion crear(Calificacion calificacion) {
        return repository.save(calificacion);
    }

    public Optional<Calificacion> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<Calificacion> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<Calificacion> actualizar(String id, Calificacion calificacion) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        calificacion.setId(id);
        return Optional.of(repository.save(calificacion));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
