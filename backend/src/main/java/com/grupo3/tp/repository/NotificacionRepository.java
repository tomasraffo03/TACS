package com.grupo3.tp.repository;

import com.grupo3.tp.models.Notificacion;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class NotificacionRepository {

    private final Map<String, Notificacion> store = new ConcurrentHashMap<>();

    public Notificacion save(Notificacion notificacion) {
        if (notificacion.getId() == null) {
            notificacion.setId(UUID.randomUUID().toString());
        }
        store.put(notificacion.getId(), notificacion);
        return notificacion;
    }

    public Optional<Notificacion> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Notificacion> findAll() {
        return new ArrayList<>(store.values());
    }

    public List<Notificacion> findByUsuarioId(String usuarioId) {
        return store.values().stream()
                .filter(notif -> notif.getUsuario().getId().equals(usuarioId))
                .collect(Collectors.toList());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}