package com.grupo3.tp.service;

import com.grupo3.tp.models.Notificacion;
import com.grupo3.tp.models.Usuario;
import com.grupo3.tp.repository.NotificacionRepository;
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
public class NotificacionServiceTest {

    @Mock
    private NotificacionRepository repo;

    @InjectMocks
    private NotificacionService service;

    private Usuario usuario1;
    private Usuario usuario2;
    private Notificacion notif1;
    private Notificacion notif2;
    private Notificacion notif3;

    @BeforeEach
    public void setUp() {
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

        notif1 = Notificacion.builder()
                .id("notif-1")
                .usuario(usuario1)
                .tipo("propuesta")
                .titulo("Nueva propuesta")
                .mensaje("Te enviaron una propuesta")
                .enlace("/propuestas/recibidas")
                .leida(false)
                .fecha(LocalDateTime.now())
                .build();

        notif2 = Notificacion.builder()
                .id("notif-2")
                .usuario(usuario1)
                .tipo("propuesta")
                .titulo("Propuesta aceptada")
                .mensaje("Tu propuesta fue aceptada")
                .enlace("/propuestas/enviadas")
                .leida(false)
                .fecha(LocalDateTime.now())
                .build();

        notif3 = Notificacion.builder()
                .id("notif-3")
                .usuario(usuario2)
                .tipo("propuesta")
                .titulo("Nueva propuesta")
                .mensaje("Te enviaron una propuesta")
                .enlace("/propuestas/recibidas")
                .leida(false)
                .fecha(LocalDateTime.now())
                .build();
    }

    // ============= CREAR TESTS =============
    @Test
    public void testCrearNotificacion() {
        when(repo.save(any(Notificacion.class))).thenReturn(notif1);

        Notificacion result = service.crear(notif1);

        assertNotNull(result);
        assertEquals("notif-1", result.getId());
        assertEquals("juan", result.getUsuario().getUsername());

        ArgumentCaptor<Notificacion> captor = ArgumentCaptor.forClass(Notificacion.class);
        verify(repo).save(captor.capture());
        assertEquals("propuesta", captor.getValue().getTipo());
        assertFalse(captor.getValue().getLeida());
    }

    @Test
    public void testCrearNotificacionThrowsException() {
        when(repo.save(any(Notificacion.class)))
                .thenThrow(new RuntimeException("Database error"));

        assertThrows(RuntimeException.class, () -> service.crear(notif1));
        verify(repo, times(1)).save(any(Notificacion.class));
    }

    // ============= OBTENER POR ID TESTS =============
    @Test
    public void testObtenerPorIdExistente() {
        when(repo.findById("notif-1")).thenReturn(Optional.of(notif1));

        Optional<Notificacion> result = service.obtenerPorId("notif-1");

        assertTrue(result.isPresent());
        assertEquals("notif-1", result.get().getId());
        assertEquals("juan", result.get().getUsuario().getUsername());
        verify(repo, times(1)).findById("notif-1");
    }

    @Test
    public void testObtenerPorIdNoExistente() {
        when(repo.findById("notif-999")).thenReturn(Optional.empty());

        Optional<Notificacion> result = service.obtenerPorId("notif-999");

        assertFalse(result.isPresent());
        verify(repo, times(1)).findById("notif-999");
    }

    // ============= OBTENER TODAS TESTS =============
    @Test
    public void testObtenerTodas() {
        List<Notificacion> testList = new ArrayList<>();
        testList.add(notif1);
        testList.add(notif2);
        testList.add(notif3);

        when(repo.findAll()).thenReturn(testList);

        List<Notificacion> result = service.obtenerTodas();

        assertTrue(result.containsAll(testList));
        assertEquals(3, result.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    public void testObtenerTodasListaVacia() {
        List<Notificacion> testList = new ArrayList<>();

        when(repo.findAll()).thenReturn(testList);

        List<Notificacion> result = service.obtenerTodas();

        assertTrue(result.isEmpty());
        verify(repo, times(1)).findAll();
    }

    // ============= OBTENER POR USUARIO TESTS =============
    @Test
    public void testObtenerPorUsuarioExistente() {
        List<Notificacion> testList = new ArrayList<>();
        testList.add(notif1);
        testList.add(notif2);

        when(repo.findByUsuarioId("user-1")).thenReturn(testList);

        List<Notificacion> result = service.obtenerPorUsuario("user-1");

        assertTrue(result.containsAll(testList));
        assertEquals(2, result.size());
        verify(repo, times(1)).findByUsuarioId("user-1");
    }

    @Test
    public void testObtenerPorUsuarioVacia() {
        List<Notificacion> testList = new ArrayList<>();

        when(repo.findByUsuarioId("user-999")).thenReturn(testList);

        List<Notificacion> result = service.obtenerPorUsuario("user-999");

        assertTrue(result.isEmpty());
        verify(repo, times(1)).findByUsuarioId("user-999");
    }

    // ============= MARCAR COMO LEIDA TESTS =============
    @Test
    public void testMarcarComoLeidaExistente() {


        when(repo.findById("notif-1")).thenReturn(Optional.of(notif1));
        when(repo.save(any(Notificacion.class))).thenAnswer(i -> i.getArgument(0));

        Optional<Notificacion> result = service.marcarComoLeida("notif-1");

        assertTrue(result.isPresent());

        ArgumentCaptor<Notificacion> captor = ArgumentCaptor.forClass(Notificacion.class);
        verify(repo).save(captor.capture());
        assertTrue(captor.getValue().getLeida());
        assertEquals("notif-1", captor.getValue().getId());
    }

    @Test
    public void testMarcarComoLeidaNoExistente() {
        when(repo.findById("notif-999")).thenReturn(Optional.empty());

        Optional<Notificacion> result = service.marcarComoLeida("notif-999");

        assertFalse(result.isPresent());
        verify(repo, never()).save(any());
    }

    // ============= ELIMINAR TESTS =============
    @Test
    public void testEliminarExistente() {
        when(repo.existsById("notif-1")).thenReturn(true);

        boolean result = service.eliminar("notif-1");

        assertTrue(result);
        verify(repo).deleteById("notif-1");
    }

    @Test
    public void testEliminarNoExistente() {
        when(repo.existsById("notif-999")).thenReturn(false);

        boolean result = service.eliminar("notif-999");

        assertFalse(result);
        verify(repo, never()).deleteById(any());
    }
}