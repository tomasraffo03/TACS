package com.grupo3.tp.repository;

import com.grupo3.tp.models.FiguritaBase;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class FiguritaBaseRepository {

    private final Map<String, FiguritaBase> store = new ConcurrentHashMap<>();

    public FiguritaBase save(FiguritaBase figuritaBase) {
        if (figuritaBase.getId() == null) {
            figuritaBase.setId(UUID.randomUUID().toString());
        }
        store.put(figuritaBase.getId(), figuritaBase);
        return figuritaBase;
    }

    public Optional<FiguritaBase> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<FiguritaBase> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
