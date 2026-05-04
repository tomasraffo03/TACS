package com.grupo3.tp.repository;

import com.grupo3.tp.models.Figurita;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class FiguritaRepository {

    private final Map<String, Figurita> store = new ConcurrentHashMap<>();

    public Figurita save(Figurita figurita) {
        if (figurita.getId() == null) {
            figurita.setId(UUID.randomUUID().toString());
        }
        store.put(figurita.getId(), figurita);
        return figurita;
    }

    public Optional<Figurita> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Figurita> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }

}
