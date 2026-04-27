import { useState } from 'react';

export default function PropuestasEnviadasPage() {
  // Mock data - Proposals YOU sent to others
  const [propuestasEnviadas] = useState([
    {
      id: "prop-1",
      figuritaDeseada: {
        id: "fig-1",
        figuritaBase: {
          seleccion: { id: "sel-1", nombre: "Argentina", grupo: "A" },
          equipo: { id: "eq-1", nombre: "River Plate" },
          categoria: { id: "cat-1", nombre: "Oro" },
          jugador: { id: "jug-1", nombre: "Messi" },
        },
      },
      figuritasOfrecidas: [
        {
          id: "mia-1",
          figuritaBase: {
            seleccion: { id: "sel-3", nombre: "France", grupo: "D" },
            equipo: { id: "eq-3", nombre: "PSG" },
            categoria: { id: "cat-2", nombre: "Plata" },
            jugador: { id: "jug-3", nombre: "Mbappé" },
          },
        },
      ],
      usuarioDestino: {
        id: "user-2",
        username: "JuanPerez",
      },
      estado: "pendiente",
      fechaEnvio: "2025-04-27",
    },
    {
      id: "prop-2",
      figuritaDeseada: {
        id: "fig-2",
        figuritaBase: {
          seleccion: { id: "sel-2", nombre: "Brazil", grupo: "G" },
          equipo: { id: "eq-2", nombre: "Flamengo" },
          categoria: { id: "cat-1", nombre: "Oro" },
          jugador: { id: "jug-2", nombre: "Neymar" },
        },
      },
      figuritasOfrecidas: [
        {
          id: "mia-2",
          figuritaBase: {
            seleccion: { id: "sel-4", nombre: "Germany", grupo: "E" },
            equipo: { id: "eq-4", nombre: "Bayern" },
            categoria: { id: "cat-2", nombre: "Plata" },
            jugador: { id: "jug-4", nombre: "Müller" },
          },
        },
        {
          id: "mia-3",
          figuritaBase: {
            seleccion: { id: "sel-5", nombre: "Spain", grupo: "E" },
            equipo: { id: "eq-5", nombre: "Barcelona" },
            categoria: { id: "cat-2", nombre: "Plata" },
            jugador: { id: "jug-5", nombre: "Pedri" },
          },
        },
      ],
      usuarioDestino: {
        id: "user-3",
        username: "MariaGomez",
      },
      estado: "aceptado",
      fechaEnvio: "2025-04-25",
    },
  ]);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "text-yellow-500";
      case "aceptado":
        return "text-green-500";
      case "rechazado":
        return "text-red-500";
      default:
        return "text-muted";
    }
  };

  const getStatusText = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "⏳ Pendiente";
      case "aceptado":
        return "✅ Aceptado";
      case "rechazado":
        return "❌ Rechazado";
      default:
        return estado;
    }
  };

  return (
    <div className="page-enter">
      <h2 className="text-xl font-semibold text-text mb-6">Propuestas · Enviadas</h2>

      {propuestasEnviadas.length === 0 ? (
        <p className="text-muted">No hay propuestas enviadas</p>
      ) : (
        <div className="space-y-4">
          {propuestasEnviadas.map(propuesta => (
            <div key={propuesta.id} className="bg-surface p-4 rounded-lg border border-border">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted">Enviado a:</p>
                  <p className="text-text font-semibold">{propuesta.usuarioDestino.username}</p>
                </div>
                <p className={`font-semibold ${getStatusColor(propuesta.estado)}`}>
                  {getStatusText(propuesta.estado)}
                </p>
              </div>

              {/* What You Wanted */}
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-sm text-muted mb-2">Figurita que querías:</p>
                <p className="text-text font-semibold">
                  {propuesta.figuritaDeseada.figuritaBase.jugador.nombre} - {propuesta.figuritaDeseada.figuritaBase.seleccion.nombre}
                </p>
              </div>

              {/* What You Offered */}
              <div className="mb-4">
                <p className="text-sm text-muted mb-2">Figuritas que ofreciste:</p>
                <div className="space-y-1">
                  {propuesta.figuritasOfrecidas.map(fig => (
                    <p key={fig.id} className="text-text text-sm">
                      • {fig.figuritaBase.jugador.nombre} - {fig.figuritaBase.seleccion.nombre}
                    </p>
                  ))}
                </div>
              </div>

              {/* Date */}
              <p className="text-xs text-muted">{propuesta.fechaEnvio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}