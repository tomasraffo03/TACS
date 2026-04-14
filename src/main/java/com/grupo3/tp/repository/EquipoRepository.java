package com.grupo3.tp.repository;

import com.grupo3.tp.models.Equipo;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class EquipoRepository {

    private final Map<String, Equipo> store = new ConcurrentHashMap<>();

    public Equipo save(Equipo equipo) {
        if (equipo.getId() == null) {
            equipo.setId(UUID.randomUUID().toString());
        }
        store.put(equipo.getId(), equipo);
        return equipo;
    }

    public Optional<Equipo> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Equipo> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
