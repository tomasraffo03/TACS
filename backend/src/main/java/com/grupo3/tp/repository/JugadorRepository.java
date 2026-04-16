package com.grupo3.tp.repository;

import com.grupo3.tp.models.Jugador;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class JugadorRepository {

    private final Map<String, Jugador> store = new ConcurrentHashMap<>();

    public Jugador save(Jugador jugador) {
        if (jugador.getId() == null) {
            jugador.setId(UUID.randomUUID().toString());
        }
        store.put(jugador.getId(), jugador);
        return jugador;
    }

    public Optional<Jugador> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Jugador> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
