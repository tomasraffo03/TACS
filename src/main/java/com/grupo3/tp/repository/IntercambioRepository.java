package com.grupo3.tp.repository;

import com.grupo3.tp.models.Intercambio;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class IntercambioRepository {

    private final Map<String, Intercambio> store = new ConcurrentHashMap<>();

    public Intercambio save(Intercambio intercambio) {
        if (intercambio.getId() == null) {
            intercambio.setId(UUID.randomUUID().toString());
        }
        store.put(intercambio.getId(), intercambio);
        return intercambio;
    }

    public Optional<Intercambio> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Intercambio> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
