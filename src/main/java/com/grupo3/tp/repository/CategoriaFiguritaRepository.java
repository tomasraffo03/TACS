package com.grupo3.tp.repository;

import com.grupo3.tp.models.CategoriaFigurita;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class CategoriaFiguritaRepository {

    private final Map<String, CategoriaFigurita> store = new ConcurrentHashMap<>();

    public CategoriaFigurita save(CategoriaFigurita categoriaFigurita) {
        if (categoriaFigurita.getId() == null) {
            categoriaFigurita.setId(UUID.randomUUID().toString());
        }
        store.put(categoriaFigurita.getId(), categoriaFigurita);
        return categoriaFigurita;
    }

    public Optional<CategoriaFigurita> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<CategoriaFigurita> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
