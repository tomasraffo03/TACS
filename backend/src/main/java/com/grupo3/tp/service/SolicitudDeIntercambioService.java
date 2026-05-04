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

    public List<SolicitudDeIntercambio> obtenerRecibidas(String usuarioId) {
        return repository.findByFiguritaOwnerId(usuarioId);
    }

    public List<SolicitudDeIntercambio> obtenerEnviadas(String usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public Optional<SolicitudDeIntercambio> aceptar(String id) {
        Optional<SolicitudDeIntercambio> solicitud = repository.findById(id);
        if (solicitud.isPresent()) {
            solicitud.get().setEstado("aceptado");
            repository.save(solicitud.get());
            // TODO: Create Intercambio here later
            // TODO: Create notification here later
        }
        return solicitud;
    }

    public Optional<SolicitudDeIntercambio> rechazar(String id) {
        Optional<SolicitudDeIntercambio> solicitud = repository.findById(id);
        if (solicitud.isPresent()) {
            solicitud.get().setEstado("rechazado");
            repository.save(solicitud.get());
            // TODO: Create notification here later
        }
        return solicitud;
    }
}
