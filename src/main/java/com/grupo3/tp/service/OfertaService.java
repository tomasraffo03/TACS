package com.grupo3.tp.service;

import com.grupo3.tp.models.Oferta;
import com.grupo3.tp.repository.OfertaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfertaService {

    private final OfertaRepository repository;

    public OfertaService(OfertaRepository repository) {
        this.repository = repository;
    }

    public Oferta crear(Oferta oferta) {
        return repository.save(oferta);
    }

    public Optional<Oferta> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<Oferta> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<Oferta> actualizar(String id, Oferta oferta) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        oferta.setId(id);
        return Optional.of(repository.save(oferta));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
