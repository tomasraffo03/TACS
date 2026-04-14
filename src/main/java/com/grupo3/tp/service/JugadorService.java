package com.grupo3.tp.service;

import com.grupo3.tp.models.Jugador;
import com.grupo3.tp.repository.JugadorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JugadorService {

    private final JugadorRepository repository;

    public JugadorService(JugadorRepository repository) {
        this.repository = repository;
    }

    public Jugador crear(Jugador jugador) {
        return repository.save(jugador);
    }

    public Optional<Jugador> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public List<Jugador> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Jugador> actualizar(String id, Jugador jugador) {
        if (!repository.existsById(id)) {
            return Optional.empty();
        }
        jugador.setId(id);
        return Optional.of(repository.save(jugador));
    }

    public boolean eliminar(String id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
