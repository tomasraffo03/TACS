package com.grupo3.tp.service;

import com.grupo3.tp.models.Intercambio;
import com.grupo3.tp.models.Usuario;
import com.grupo3.tp.models.Figurita;
import com.grupo3.tp.models.FiguritaBase;
import com.grupo3.tp.models.Seleccion;
import com.grupo3.tp.models.Equipo;
import com.grupo3.tp.models.CategoriaFigurita;
import com.grupo3.tp.models.Jugador;
import com.grupo3.tp.repository.IntercambioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class IntercambioServiceTest {

    @Mock
    private IntercambioRepository repo;

    @InjectMocks
    private IntercambioService service;

    private Usuario usuario1;
    private Usuario usuario2;
    private Figurita figurita1;
    private Figurita figurita2;
    private Intercambio intercambio1;
    private Intercambio intercambio2;
    private Intercambio intercambio3;
    private List<Figurita> figuritas1;
    private List<Figurita> figuritas2;

    @BeforeEach
    public void setUp() {

        figuritas1 = new ArrayList<>();
        figuritas2 = new ArrayList<>();


        usuario1 = Usuario.builder()
                .id("user-1")
                .username("juan")
                .email("juan@example.com")
                .build();

        usuario2 = Usuario.builder()
                .id("user-2")
                .username("maria")
                .email("maria@example.com")
                .build();

        FiguritaBase figuritaBase1 = FiguritaBase.builder()
                .id("fig-base-1")
                .numero(1)
                .seleccion(new Seleccion("sel-1", "Argentina", "A"))
                .equipo(new Equipo("eq-1", "River"))
                .categoria(new CategoriaFigurita("cat-1", "Oro"))
                .jugador(new Jugador("jug-1", "Messi"))
                .build();

        FiguritaBase figuritaBase2 = FiguritaBase.builder()
                .id("fig-base-2")
                .numero(2)
                .seleccion(new Seleccion("sel-1", "Argentina", "A"))
                .equipo(new Equipo("eq-1", "River"))
                .categoria(new CategoriaFigurita("cat-1", "Oro"))
                .jugador(new Jugador("jug-2", "Di Maria"))
                .build();

        figurita1 = Figurita.builder()
                .id("fig-1")
                .figuritaBase(figuritaBase1)
                .owner(usuario1)
                .build();

        figurita2 = Figurita.builder()
                .id("fig-2")
                .figuritaBase(figuritaBase2)
                .owner(usuario2)
                .build();


        intercambio1 = Intercambio.builder()
                .id("int-1")
                .usuarioGenerador(usuario1)
                .figurita(figurita1)
                .figuritaIntercambiada(figuritas2)
                .usuarioIntercambiador(usuario2)
                .fecha(LocalDateTime.now())
                .build();

        intercambio2 = Intercambio.builder()
                .id("int-2")
                .usuarioGenerador(usuario2)
                .figurita(figurita2)
                .figuritaIntercambiada(figuritas1)
                .usuarioIntercambiador(usuario1)
                .fecha(LocalDateTime.now())
                .build();

        intercambio3 = Intercambio.builder()
                .id("int-3")
                .usuarioGenerador(usuario1)
                .figurita(figurita1)
                .figuritaIntercambiada(figuritas2)
                .usuarioIntercambiador(usuario2)
                .fecha(LocalDateTime.now())
                .build();

        figuritas1.add(figurita1);
        figuritas2.add(figurita2);
    }

    // ============= CREAR TESTS =============
    @Test
    public void testCrearIntercambio() {
        when(repo.save(any(Intercambio.class))).thenReturn(intercambio1);

        Intercambio result = service.crear(intercambio1);

        assertNotNull(result);
        assertEquals("int-1", result.getId());
        assertEquals("juan", result.getUsuarioGenerador().getUsername());
        assertEquals("maria", result.getUsuarioIntercambiador().getUsername());

        ArgumentCaptor<Intercambio> captor = ArgumentCaptor.forClass(Intercambio.class);
        verify(repo).save(captor.capture());
        assertEquals("int-1", captor.getValue().getId());
    }

    @Test
    public void testCrearIntercambioThrowsException() {
        when(repo.save(any(Intercambio.class)))
                .thenThrow(new RuntimeException("Database error"));

        assertThrows(RuntimeException.class, () -> service.crear(intercambio1));
        verify(repo, times(1)).save(any(Intercambio.class));
    }

    // ============= OBTENER POR ID TESTS =============
    @Test
    public void testObtenerPorIdExistente() {
        when(repo.findById("int-1")).thenReturn(Optional.of(intercambio1));

        Optional<Intercambio> result = service.obtenerPorId("int-1");

        assertTrue(result.isPresent());
        assertEquals("int-1", result.get().getId());
        assertEquals("juan", result.get().getUsuarioGenerador().getUsername());
        verify(repo, times(1)).findById("int-1");
    }

    @Test
    public void testObtenerPorIdNoExistente() {
        when(repo.findById("int-999")).thenReturn(Optional.empty());

        Optional<Intercambio> result = service.obtenerPorId("int-999");

        assertFalse(result.isPresent());
        verify(repo, times(1)).findById("int-999");
    }

    // ============= OBTENER TODOS TESTS =============
    @Test
    public void testObtenerTodos() {
        List<Intercambio> testList = new ArrayList<>();
        testList.add(intercambio1);
        testList.add(intercambio2);
        testList.add(intercambio3);

        when(repo.findAll()).thenReturn(testList);

        List<Intercambio> result = service.obtenerTodos();

        assertTrue(result.containsAll(testList));
        assertEquals(3, result.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    public void testObtenerTodosListaVacia() {
        List<Intercambio> testList = new ArrayList<>();

        when(repo.findAll()).thenReturn(testList);

        List<Intercambio> result = service.obtenerTodos();

        assertTrue(result.isEmpty());
        verify(repo, times(1)).findAll();
    }

    // ============= ACTUALIZAR TESTS =============
    @Test
    public void testActualizarIntercambioExistente() {
        Intercambio intercambioActualizado = Intercambio.builder()
                .id("int-1")
                .usuarioGenerador(usuario1)
                .figurita(figurita2)  // Changed figurita
                .figuritaIntercambiada(figuritas1)
                .usuarioIntercambiador(usuario2)
                .fecha(LocalDateTime.now())
                .build();

        when(repo.existsById("int-1")).thenReturn(true);
        when(repo.save(any(Intercambio.class))).thenAnswer(i -> i.getArgument(0));

        Optional<Intercambio> result = service.actualizar("int-1", intercambioActualizado);

        assertTrue(result.isPresent());
        assertEquals("int-1", result.get().getId());

        ArgumentCaptor<Intercambio> captor = ArgumentCaptor.forClass(Intercambio.class);
        verify(repo).save(captor.capture());
        assertEquals("int-1", captor.getValue().getId());
        assertEquals("fig-2", captor.getValue().getFigurita().getId());
    }

    @Test
    public void testActualizarIntercambioNoExistente() {
        when(repo.existsById("int-999")).thenReturn(false);

        Optional<Intercambio> result = service.actualizar("int-999", intercambio1);

        assertFalse(result.isPresent());
        verify(repo, never()).save(any());
    }

    // ============= ELIMINAR TESTS =============
    @Test
    public void testEliminarIntercambioExistente() {
        when(repo.existsById("int-1")).thenReturn(true);

        boolean result = service.eliminar("int-1");

        assertTrue(result);
        verify(repo).deleteById("int-1");
    }

    @Test
    public void testEliminarIntercambioNoExistente() {
        when(repo.existsById("int-999")).thenReturn(false);

        boolean result = service.eliminar("int-999");

        assertFalse(result);
        verify(repo, never()).deleteById(any());
    }
}