package com.grupo3.tp.repository;

import com.grupo3.tp.models.SolicitudDeIntercambio;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SolicitudDeIntercambioRepository {

    private final Map<String, SolicitudDeIntercambio> store = new ConcurrentHashMap<>();

    public SolicitudDeIntercambio save(SolicitudDeIntercambio solicitud) {
        if (solicitud.getId() == null) {
            solicitud.setId(UUID.randomUUID().toString());
        }
        store.put(solicitud.getId(), solicitud);
        return solicitud;
    }

    public Optional<SolicitudDeIntercambio> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<SolicitudDeIntercambio> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
