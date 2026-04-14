package com.grupo3.tp.repository;

import com.grupo3.tp.models.Oferta;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class OfertaRepository {

    private final Map<String, Oferta> store = new ConcurrentHashMap<>();

    public Oferta save(Oferta oferta) {
        if (oferta.getId() == null) {
            oferta.setId(UUID.randomUUID().toString());
        }
        store.put(oferta.getId(), oferta);
        return oferta;
    }

    public Optional<Oferta> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Oferta> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
