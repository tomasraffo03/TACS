package com.grupo3.tp.repository;

import com.grupo3.tp.models.CondicionImpl;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class CondicionRepository {

    private final Map<String, CondicionImpl> store = new ConcurrentHashMap<>();

    public CondicionImpl save(CondicionImpl condicion) {
        if (condicion.getId() == null) {
            condicion.setId(UUID.randomUUID().toString());
        }
        store.put(condicion.getId(), condicion);
        return condicion;
    }

    public Optional<CondicionImpl> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<CondicionImpl> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
