package com.grupo3.tp.repository;

import com.grupo3.tp.models.Subasta;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SubastaRepository {

    private final Map<String, Subasta> store = new ConcurrentHashMap<>();

    public Subasta save(Subasta subasta) {
        if (subasta.getId() == null) {
            subasta.setId(UUID.randomUUID().toString());
        }
        store.put(subasta.getId(), subasta);
        return subasta;
    }

    public Optional<Subasta> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Subasta> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
