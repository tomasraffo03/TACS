package com.grupo3.tp.repository;

import com.grupo3.tp.models.Calificacion;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class CalificacionRepository {

    private final Map<String, Calificacion> store = new ConcurrentHashMap<>();

    public Calificacion save(Calificacion calificacion) {
        if (calificacion.getId() == null) {
            calificacion.setId(UUID.randomUUID().toString());
        }
        store.put(calificacion.getId(), calificacion);
        return calificacion;
    }

    public Optional<Calificacion> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Calificacion> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
