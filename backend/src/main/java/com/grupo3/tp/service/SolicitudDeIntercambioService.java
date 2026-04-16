package com.grupo3.tp.service;

import com.grupo3.tp.models.SolicitudDeIntercambio;
import com.grupo3.tp.repository.SolicitudDeIntercambioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitudDeIntercambioService {

    private final SolicitudDeIntercambioRepository repository;

    public SolicitudDeIntercambioService(SolicitudDeIntercambioRepository repository) {
        this.repository = repository;
    }

    public SolicitudDeIntercambio crear(SolicitudDeIntercambio solicitud) {
        return repository.save(solicitud);
    }

    public Optional<SolicitudDeIntercambio> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<SolicitudDeIntercambio> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<SolicitudDeIntercambio> actualizar(String id, SolicitudDeIntercambio solicitud) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        solicitud.setId(id);
        return Optional.of(repository.save(solicitud));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
