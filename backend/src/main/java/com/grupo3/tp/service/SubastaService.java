package com.grupo3.tp.service;

import com.grupo3.tp.models.Subasta;
import com.grupo3.tp.repository.SubastaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<Subasta> obtenerPorUsuario(String usuarioId) {
        return repository.findAll().stream()
                .filter(s -> s.getUsuario() != null && usuarioId.equals(s.getUsuario().getId()))
                .collect(Collectors.toList());
    }

    public List<Subasta> obtenerParticipando(String usuarioId) {
        return repository.findAll().stream()
                .filter(s -> s.getOfertas() != null && s.getOfertas().stream()
                        .anyMatch(o -> o.getUsuario() != null && usuarioId.equals(o.getUsuario().getId())))
                .collect(Collectors.toList());
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
