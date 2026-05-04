package com.grupo3.tp.repository;

import com.grupo3.tp.models.Usuario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class UsuarioRepository {

    private final Map<String, Usuario> store = new ConcurrentHashMap<>();

    public Usuario save(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setId(UUID.randomUUID().toString());
        }
        store.put(usuario.getId(), usuario);
        return usuario;
    }

    public Optional<Usuario> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Usuario> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }

    public Optional<Usuario> findByUsername(String username) {
        return store.values().stream()
                .filter(u -> username.equals(u.getUsername()))
                .findFirst();
    }
}
