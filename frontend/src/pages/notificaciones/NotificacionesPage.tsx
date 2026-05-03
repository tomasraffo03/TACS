import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificacionesPage() {
  const navigate = useNavigate();

  // Mock data - Different types of notifications
  const [notificaciones, setNotificaciones] = useState([
    {
      id: "notif-1",
      tipo: "propuesta",
      titulo: "Nueva propuesta recibida",
      mensaje: "Juan Pérez envió una propuesta por tu figurita de Mbappé",
      fecha: "2025-04-27 14:30",
      leida: false,
      accion: () => navigate('/propuestas/recibidas'),
    },
    {
      id: "notif-2",
      tipo: "figurita-faltante",
      titulo: "Figurita faltante encontrada",
      mensaje: "¡Encontramos la figurita #532 Messi que te faltaba!",
      fecha: "2025-04-27 12:15",
      leida: false,
      accion: () => navigate('/buscar'),
    },
    {
      id: "notif-3",
      tipo: "subasta",
      titulo: "Subasta por finalizar",
      mensaje: "La subasta de Neymar finaliza en 2 horas",
      fecha: "2025-04-27 10:45",
      leida: true,
      accion: () => navigate('/subastas/activas'),
    },
    {
      id: "notif-4",
      tipo: "propuesta",
      titulo: "Propuesta aceptada",
      mensaje: "María Gómez aceptó tu propuesta por el Neymar",
      fecha: "2025-04-26 16:20",
      leida: true,
      accion: () => navigate('/propuestas/enviadas'),
    },
    {
      id: "notif-5",
      tipo: "figurita-faltante",
      titulo: "Figurita faltante encontrada",
      mensaje: "¡Encontramos la figurita #10 Di María que te faltaba!",
      fecha: "2025-04-26 09:30",
      leida: true,
      accion: () => navigate('/buscar'),
    },
  ]);

  // Mark notification as read
  const handleLeerNotificacion = (id: string) => {
    setNotificaciones(prev =>
      prev.map(notif => 
        notif.id === id ? { ...notif, leida: true } : notif
      )
    );
  };

  // Delete notification
  const handleEliminarNotificacion = (id: string) => {
    setNotificaciones(prev => prev.filter(notif => notif.id !== id));
  };

  // Clear all notifications
  const handleLimpiarTodas = () => {
    setNotificaciones([]);
  };

  // Get icon based on type
  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case "propuesta":
        return "💬";
      case "figurita-faltante":
        return "🎯";
      case "subasta":
        return "🏷️";
      default:
        return "📢";
    }
  };

  // Get color based on type
  const getColorTipo = (tipo: string) => {
    switch (tipo) {
      case "propuesta":
        return "border-l-4 border-l-blue-500";
      case "figurita-faltante":
        return "border-l-4 border-l-green-500";
      case "subasta":
        return "border-l-4 border-l-yellow-500";
      default:
        return "border-l-4 border-l-gray-500";
    }
  };

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text">Notificaciones</h1>
          {notificacionesNoLeidas > 0 && (
            <p className="text-sm text-muted mt-1">
              {notificacionesNoLeidas} sin leer
            </p>
          )}
        </div>
        {notificaciones.length > 0 && (
          <button
            onClick={handleLimpiarTodas}
            className="p-2 text-sm bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600/20 transition-colors"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {notificaciones.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-2xl mb-2">📭</p>
          <p className="text-muted">No hay notificaciones</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notificaciones.map(notif => (
            <div
              key={notif.id}
              className={`bg-surface p-4 rounded-lg border border-border ${getColorTipo(notif.tipo)} ${
                !notif.leida ? 'bg-surface/80' : 'opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 cursor-pointer" onClick={() => {
                  handleLeerNotificacion(notif.id);
                  notif.accion();
                }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{getIconoTipo(notif.tipo)}</span>
                    <p className={`font-semibold ${!notif.leida ? 'text-primary' : 'text-text'}`}>
                      {notif.titulo}
                    </p>
                    {!notif.leida && (
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-muted ml-7">{notif.mensaje}</p>
                  <p className="text-xs text-muted mt-2 ml-7">{notif.fecha}</p>
                </div>

                <button
                  onClick={() => handleEliminarNotificacion(notif.id)}
                  className="p-1 text-muted hover:text-red-500 transition-colors"
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}