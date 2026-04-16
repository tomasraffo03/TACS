package com.grupo3.tp.repository;

import com.grupo3.tp.models.Seleccion;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SeleccionRepository {

    private final Map<String, Seleccion> store = new ConcurrentHashMap<>();

    public Seleccion save(Seleccion seleccion) {
        if (seleccion.getId() == null) {
            seleccion.setId(UUID.randomUUID().toString());
        }
        store.put(seleccion.getId(), seleccion);
        return seleccion;
    }

    public Optional<Seleccion> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Seleccion> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
