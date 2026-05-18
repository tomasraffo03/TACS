package com.grupo3.tp.service;

import com.grupo3.tp.models.FiguritaBase;
import com.grupo3.tp.models.Seleccion;
import com.grupo3.tp.models.Equipo;
import com.grupo3.tp.models.CategoriaFigurita;
import com.grupo3.tp.models.Jugador;
import com.grupo3.tp.repository.FiguritaBaseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FiguritaBaseServiceTest {

    @Mock
    private FiguritaBaseRepository repo;

    @InjectMocks
    private FiguritaBaseService service;

    private FiguritaBase figuritaBase1;
    private FiguritaBase figuritaBase2;
    private FiguritaBase figuritaBase3;

    @BeforeEach
    public void setUp() {
        figuritaBase1 = FiguritaBase.builder()
                .id("fig-base-1")
                .numero(1)
                .seleccion(new Seleccion("sel-1", "Argentina", "A"))
                .equipo(new Equipo("eq-1", "River"))
                .categoria(new CategoriaFigurita("cat-1", "Oro"))
                .jugador(new Jugador("jug-1", "Messi"))
                .build();

        figuritaBase2 = FiguritaBase.builder()
                .id("fig-base-2")
                .numero(2)
                .seleccion(new Seleccion("sel-1", "Argentina", "A"))
                .equipo(new Equipo("eq-1", "River"))
                .categoria(new CategoriaFigurita("cat-1", "Oro"))
                .jugador(new Jugador("jug-2", "Di Maria"))
                .build();

        figuritaBase3 = FiguritaBase.builder()
                .id("fig-base-3")
                .numero(3)
                .seleccion(new Seleccion("sel-2", "Brazil", "B"))
                .equipo(new Equipo("eq-2", "Santos"))
                .categoria(new CategoriaFigurita("cat-2", "Plata"))
                .jugador(new Jugador("jug-3", "Pele"))
                .build();
    }

    // ============= CREAR TESTS =============
    @Test
    public void testCrearFiguritaBase() {
        when(repo.save(any(FiguritaBase.class))).thenReturn(figuritaBase1);

        FiguritaBase result = service.crear(figuritaBase1);

        assertNotNull(result);
        assertEquals("fig-base-1", result.getId());
        assertEquals("Messi", result.getJugador().getNombre());
        assertEquals(1, result.getNumero());

        ArgumentCaptor<FiguritaBase> captor = ArgumentCaptor.forClass(FiguritaBase.class);
        verify(repo).save(captor.capture());
        assertEquals("fig-base-1", captor.getValue().getId());
    }

    @Test
    public void testCrearFiguritaBaseThrowsException() {
        when(repo.save(any(FiguritaBase.class)))
                .thenThrow(new RuntimeException("Database error"));

        assertThrows(RuntimeException.class, () -> service.crear(figuritaBase1));
        verify(repo, times(1)).save(any(FiguritaBase.class));
    }

    // ============= OBTENER POR ID TESTS =============
    @Test
    public void testObtenerPorIdExistente() {
        when(repo.findById("fig-base-1")).thenReturn(Optional.of(figuritaBase1));

        Optional<FiguritaBase> result = service.obtenerPorId("fig-base-1");

        assertTrue(result.isPresent());
        assertEquals("fig-base-1", result.get().getId());
        assertEquals("Messi", result.get().getJugador().getNombre());
        verify(repo, times(1)).findById("fig-base-1");
    }

    @Test
    public void testObtenerPorIdNoExistente() {
        when(repo.findById("fig-base-999")).thenReturn(Optional.empty());

        Optional<FiguritaBase> result = service.obtenerPorId("fig-base-999");

        assertFalse(result.isPresent());
        verify(repo, times(1)).findById("fig-base-999");
    }

    // ============= OBTENER TODAS TESTS =============
    @Test
    public void testObtenerTodas() {
        List<FiguritaBase> testList = new ArrayList<>();
        testList.add(figuritaBase1);
        testList.add(figuritaBase2);
        testList.add(figuritaBase3);

        when(repo.findAll()).thenReturn(testList);

        List<FiguritaBase> result = service.obtenerTodas();

        assertTrue(result.containsAll(testList));
        assertEquals(3, result.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    public void testObtenerTodasListaVacia() {
        List<FiguritaBase> testList = new ArrayList<>();

        when(repo.findAll()).thenReturn(testList);

        List<FiguritaBase> result = service.obtenerTodas();

        assertTrue(result.isEmpty());
        verify(repo, times(1)).findAll();
    }

    // ============= ACTUALIZAR TESTS =============
    @Test
    public void testActualizarFiguritaBaseExistente() {
        FiguritaBase figuritaActualizada = FiguritaBase.builder()
                .id("fig-base-1")
                .numero(10)  // Changed numero
                .seleccion(new Seleccion("sel-1", "Argentina", "A"))
                .equipo(new Equipo("eq-1", "River"))
                .categoria(new CategoriaFigurita("cat-2", "Plata"))  // Changed categoria
                .jugador(new Jugador("jug-1", "Messi"))
                .build();

        when(repo.existsById("fig-base-1")).thenReturn(true);
        when(repo.save(any(FiguritaBase.class))).thenAnswer(i -> i.getArgument(0));

        Optional<FiguritaBase> result = service.actualizar("fig-base-1", figuritaActualizada);

        assertTrue(result.isPresent());
        assertEquals("fig-base-1", result.get().getId());

        ArgumentCaptor<FiguritaBase> captor = ArgumentCaptor.forClass(FiguritaBase.class);
        verify(repo).save(captor.capture());
        assertEquals("fig-base-1", captor.getValue().getId());
        assertEquals(10, captor.getValue().getNumero());
        assertEquals("Plata", captor.getValue().getCategoria().getNombre());
    }

    @Test
    public void testActualizarFiguritaBaseNoExistente() {
        when(repo.existsById("fig-base-999")).thenReturn(false);

        Optional<FiguritaBase> result = service.actualizar("fig-base-999", figuritaBase1);

        assertFalse(result.isPresent());
        verify(repo, never()).save(any());
    }

    // ============= ELIMINAR TESTS =============
    @Test
    public void testEliminarFiguritaBaseExistente() {
        when(repo.existsById("fig-base-1")).thenReturn(true);

        boolean result = service.eliminar("fig-base-1");

        assertTrue(result);
        verify(repo).deleteById("fig-base-1");
    }

    @Test
    public void testEliminarFiguritaBaseNoExistente() {
        when(repo.existsById("fig-base-999")).thenReturn(false);

        boolean result = service.eliminar("fig-base-999");

        assertFalse(result);
        verify(repo, never()).deleteById(any());
    }
}